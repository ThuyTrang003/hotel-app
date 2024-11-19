import { z } from "zod";

const promotionSchema = z.object({
    code: z.string().min(1, "Value is required"),
    description: z.string().min(1, "Value is required"),
    //số thực, dương
    discountPercentage: z
        .union([z.string(), z.number()])
        .transform((val) => String(val).trim()) // Chuyển đổi chuỗi thành số
        .refine((val) => /^[0-9]+(\.[0-9]+)?$/.test(String(val)), {
            message: "Value must be a valid number",
        })
        .transform((val) => parseFloat(val))
        .refine((val) => !isNaN(val), { message: "Value must be a number" }) // Kiểm tra nếu giá trị là một số hợp lệ
        .refine((val) => val > 0, {
            message: "Value must be greater than 0",
        })
        .refine((val) => val <= 100, {
            message: "Value must be less than or equal to 100",
        }), // Kiểm tra giá trị nhỏ hơn 100

    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }), // Kiểm tra định dạng ngày hợp lệ
    endDate: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
            message: "Invalid date format",
        })
        .refine(
            (date) => {
                const today = new Date();
                const inputDate = new Date(date);
                // So sánh ngày input với hôm nay
                return inputDate >= today;
            },
            {
                message: "End date cannot be in the past",
            },
        ),
    minSpend: z
        .union([z.string(), z.number()])
        .transform((val) => String(val).trim()) // Chuyển đổi chuỗi thành số
        .refine((val) => /^[0-9]+(\.[0-9]+)?$/.test(String(val)), {
            message: "Value must be a valid number",
        })
        .transform((val) => parseFloat(val))
        .refine((val) => !isNaN(val), { message: "Value must be a number" }) // Kiểm tra nếu giá trị là một số hợp lệ
        .refine((val) => val > 0, {
            message: "Value must be greater than 0",
        }),
    maxDiscount: z
        .union([z.string(), z.number()])
        .transform((val) => String(val).trim()) // Chuyển đổi chuỗi thành số
        .refine((val) => /^[0-9]+(\.[0-9]+)?$/.test(String(val)), {
            message: "Value must be a valid number",
        })
        .transform((val) => parseFloat(val))
        .refine((val) => !isNaN(val), { message: "Value must be a number" }) // Kiểm tra nếu giá trị là một số hợp lệ
        .refine((val) => val > 0, {
            message: "Value must be greater than 0",
        }),
    limitUse: z
        .union([z.string(), z.number()])
        .refine((val) => /^[1-9]\d*$/.test(String(val).trim()), {
            message: "Value must be a positive integer",
        }) // Kiểm tra xem có phải là số nguyên dương
        .transform((val) => parseInt(String(val), 10)) // Chuyển chuỗi thành số nguyên
        .refine((val) => Number.isInteger(val), {
            message: "Value must be a valid integer",
        }) // Đảm bảo sau chuyển đổi là số nguyên
        .refine((val) => val > 0, {
            message: "Value must be greater than 0",
        }),
});
// Sử dụng `pick` trước khi thêm superRefine
const baseSchema = promotionSchema.pick({
    code: true,
    description: true,
    discountPercentage: true,
    startDate: true,
    endDate: true,
    minSpend: true,
    maxDiscount: true,
    limitUse: true,
});

// Thêm superRefine vào schema đã chọn
const createSchema = baseSchema.superRefine(({ startDate, endDate }, ctx) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end <= start) {
        ctx.addIssue({
            code: "custom", // Loại lỗi được chỉ định
            path: ["endDate"],
            message: "End date must be after the start date",
        });
    }
});

export class PromotionDTO {
    public static schema = createSchema;
}

export type promotion = z.infer<typeof PromotionDTO.schema>;
