import { z } from "zod";

// Định nghĩa schema cho User, nhiều thông tin khác
const bookingSchema = z.object({
    phoneNumber: z.string().regex(/^(03|05|07|08|09)\d{8}$/, {
        message: "Invalid phone number format",
    }),
    checkInTime: z.string().refine(
        (value) => {
            const date = new Date(value);
            return !isNaN(date.getTime()); // Kiểm tra giá trị hợp lệ
        },
        { message: "Invalid check in time" },
    ),
    checkOutTime: z.string().refine(
        (value) => {
            const date = new Date(value);
            return !isNaN(date.getTime()); // Kiểm tra giá trị hợp lệ
        },
        { message: "Invalid check out time" },
    ),
    numberOfGuests: z
        .union([z.string(), z.number()])
        .refine((val) => /^[1-9]\d*$/.test(String(val).trim()), {
            message: "Value must be a positive integer",
        }) // Kiểm tra xem có phải là số nguyên dương
        .transform((val) => parseInt(String(val), 10)) // Chuyển chuỗi thành số nguyên
        .refine((val) => Number.isInteger(val), {
            message: "Value must be a valid integer",
        }) // Đảm bảo sau chuyển đổi là số nguyên
        .refine((val) => val > 0, { message: "Value must be greater than 0" }),
    paidAmount: z
        .union([z.string(), z.number()])
        .transform((val) => String(val).trim()) // Chuyển đổi chuỗi thành số
        .refine((val) => /^[0-9]+(\.[0-9]+)?$/.test(String(val)), {
            message: "Value must be a valid number",
        })
        .transform((val) => parseFloat(val))
        .refine((val) => !isNaN(val), { message: "Value must be a number" }) // Kiểm tra nếu giá trị là một số hợp lệ
        .refine((val) => val > 0, { message: "Value must be greater than 0" })
        .optional(),
    redeemedPoint: z
        .union([z.string(), z.number()])
        .refine((val) => /^[1-9]\d*$/.test(String(val).trim()), {
            message: "Value must be a positive integer",
        }) // Kiểm tra xem có phải là số nguyên dương
        .transform((val) => parseInt(String(val), 10)) // Chuyển chuỗi thành số nguyên
        .refine((val) => Number.isInteger(val), {
            message: "Value must be a valid integer",
        }) // Đảm bảo sau chuyển đổi là số nguyên
        .refine((val) => val > 0, { message: "Value must be greater than 0" })
        .optional(),
    voucherCode: z.string().optional(),
    paymentMethod: z.string().min(1, "Value is required"),
});

export class bookingDTO {
    public static createSchema = bookingSchema.pick({
        phoneNumber: true,
        checkInTime: true,
        checkOutTime: true,
        numberOfGuests: true,
        // paidAmount: true,
        redeemedPoint: true,
        voucherCode: true,
        paymentMethod: true,
    });
}

export type createBooking = z.infer<typeof bookingDTO.createSchema>;
