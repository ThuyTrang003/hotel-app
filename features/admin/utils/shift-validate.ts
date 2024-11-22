import { z } from "zod";

// Định nghĩa schema cho User, nhiều thông tin khác
const shiftSchema = z.object({
    shiftName: z.string().min(1, "Value is required"),
    // Định dạng HH:mm (giờ:phút)
    startTime: z
        .string()
        .regex(
            /^([01]\d|2[0-3]):([0-5]\d)$/,
            "Invalid time format. Please use HH:mm (24-hour format).",
        ),
    endTime: z
        .string()
        .regex(
            /^([01]\d|2[0-3]):([0-5]\d)$/,
            "Invalid time format. Please use HH:mm (24-hour format).",
        ),
});

export class shiftDTO {
    public static createSchema = shiftSchema.pick({
        shiftName: true,
        startTime: true,
        endTime: true,
    });
}

export type createShift = z.infer<typeof shiftDTO.createSchema>;
