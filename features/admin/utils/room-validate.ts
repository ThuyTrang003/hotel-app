import { z } from "zod";

// Định nghĩa schema cho User, nhiều thông tin khác
const roomSchema = z.object({
    description: z.string().min(1, "Value is required"),
    typeId: z.string().min(1, "Value is required"),
    roomNumber: z.string().min(1, "Value is required"),
});

export class RoomDTO {
    public static createSchema = roomSchema.pick({
        typeId: true,
        description: true,
        roomNumber: true,
    });
}

export type createRoom = z.infer<typeof RoomDTO.createSchema>;
