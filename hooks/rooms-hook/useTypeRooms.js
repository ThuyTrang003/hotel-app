import {
    createTypeRoom,
    getAllTypeRooms,
    updateTypeRoom,
} from "../../apis/rooms-api/type-rooms";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllTypeRooms = () => {
    return useQuery({
        queryKey: ["getAllTypeRooms"],
        queryFn: () => getAllTypeRooms(),
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
