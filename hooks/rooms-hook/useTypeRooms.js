import {
    createTypeRoom,
    getAllTypeRooms,
    getTypeRoomById,
    updateTypeRoom,
} from "../../apis/rooms-api/type-rooms";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllTypeRooms = (params) => {
    return useQuery({
        queryKey: ["getAllTypeRooms", params],
        queryFn: () => getAllTypeRooms(params),
    });
};

export const useGetTypeRoomById = (typeRoomId) => {
    return useQuery({
        queryKey: ["getTypeRoomById", typeRoomId],
        queryFn: () => getTypeRoomById(typeRoomId),
    });
};

export const useCreateTypeRoom = () => {
    return useMutation({ mutationFn: createTypeRoom });
};

export const useUpdateTypeRoom = () => {
    return useMutation({
        mutationFn: updateTypeRoom,
    });
};
