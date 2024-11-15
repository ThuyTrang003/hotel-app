import { z } from "zod";

// Định nghĩa schema cho User, nhiều thông tin khác
const typeRoomSchema = z.object({
    typename: z.string().min(1, "Value is required"),
    description: z.string().min(1, "Value is required"),
    limit: z
        .union([z.string(), z.number()])
        .refine((val) => /^[1-9]\d*$/.test(String(val)), {
            message: "Value must be a positive integer",
        }) // Kiểm tra xem có phải là số nguyên dương
        .transform((val) => parseInt(String(val), 10)) // Chuyển chuỗi thành số nguyên
        .refine((val) => Number.isInteger(val), {
            message: "Value must be a valid integer",
        }) // Đảm bảo sau chuyển đổi là số nguyên
        .refine((val) => val > 0, { message: "Value must be greater than 0" }),
    hourlyRate: z
        .union([z.string(), z.number()])
        .transform((val) => parseFloat(String(val))) // Chuyển đổi chuỗi thành số
        .refine((val) => /^[0-9]+(\.[0-9]+)?$/.test(String(val)), {
            message: "Value must be a valid number",
        })
        .refine((val) => !isNaN(val), { message: "Value must be a number" }) // Kiểm tra nếu giá trị là một số hợp lệ
        .refine((val) => val > 0, { message: "Value must be greater than 0" }),
    dailyRate: z
        .union([z.string(), z.number()])
        .transform((val) => parseFloat(String(val))) // Chuyển đổi chuỗi thành số
        .refine((val) => /^[0-9]+(\.[0-9]+)?$/.test(String(val)), {
            message: "Value must be a valid number",
        })
        .refine((val) => !isNaN(val), { message: "Value must be a number" }) // Kiểm tra nếu giá trị là một số hợp lệ
        .refine((val) => val > 0, { message: "Value must be greater than 0" }),
    images: z.array(z.any()),
    typeId: z.string().min(1, "Value is required"),
    roomNumber: z.string().min(1, "Value is required"),
});

// Định nghĩa AuthDTO với các schema cho đăng nhập và đăng ký
export class TypeRoomDTO {
    public static createSchema = typeRoomSchema.pick({
        typename: true,
        description: true,
        limit: true,
        hourlyRate: true,
        dailyRate: true,
    });
}

export type createTypeRoom = z.infer<typeof TypeRoomDTO.createSchema>;
