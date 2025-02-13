import { z } from "zod";

const typeRoomSchema = z.object({
    typename: z.string().min(1, "Value is required"),
    description: z.string().min(1, "Value is required"),
    limit: z
        .union([z.string(), z.number()])
        .refine((val) => /^[1-9]\d*$/.test(String(val).trim()), {
            message: "Value must be a positive integer",
        }) // Kiểm tra xem có phải là số nguyên dương
        .transform((val) => parseInt(String(val), 10)) // Chuyển chuỗi thành số nguyên
        .refine((val) => Number.isInteger(val), {
            message: "Value must be a valid integer",
        }) // Đảm bảo sau chuyển đổi là số nguyên
        .refine((val) => val > 0, { message: "Value must be greater than 0" }),
    pricePerNight: z
        .union([z.string(), z.number()])
        .transform((val) => String(val).trim()) // Chuyển đổi chuỗi thành số
        .refine((val) => /^[0-9]+(\.[0-9]+)?$/.test(String(val)), {
            message: "Value must be a valid number",
        })
        .transform((val) => parseFloat(val))
        .refine((val) => !isNaN(val), { message: "Value must be a number" }) // Kiểm tra nếu giá trị là một số hợp lệ
        .refine((val) => val > 0, { message: "Value must be greater than 0" }),
    images: z.array(z.any()),
    typeId: z.string().min(1, "Value is required"),
    roomNumber: z.string().min(1, "Value is required"),
});

export class TypeRoomDTO {
    public static createSchema = typeRoomSchema.pick({
        typename: true,
        description: true,
        limit: true,
        pricePerNight: true,
    });
}

export type createTypeRoom = z.infer<typeof TypeRoomDTO.createSchema>;
