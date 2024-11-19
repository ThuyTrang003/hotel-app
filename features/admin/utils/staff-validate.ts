import { SpaceEvenlyHorizontallyIcon } from "@radix-ui/react-icons";
import { z } from "zod";

// Định nghĩa schema cho User, nhiều thông tin khác
const staffSchema = z.object({
    salary: z
        .union([z.string(), z.number()])
        .transform((val) => String(val).trim()) // Chuyển đổi chuỗi thành số
        .refine((val) => /^[0-9]+(\.[0-9]+)?$/.test(String(val)), {
            message: "Value must be a valid number",
        })
        .transform((val) => parseFloat(val))
        .refine((val) => !isNaN(val), { message: "Value must be a number" }) // Kiểm tra nếu giá trị là một số hợp lệ
        .refine((val) => val > 0, { message: "Value must be greater than 0" }),
});

export class StaffDTO {
    public static updateStaffSchema = staffSchema.pick({
        salary: true,
    });
}

export type updateStaff = z.infer<typeof StaffDTO.updateStaffSchema>;
