import {
    createRoom,
    getAllRooms,
    updateRoom,
} from "../../apis/rooms-api/rooms";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllRooms = (params) => {
    return useQuery({
        queryKey: ["getAllRooms", params],
        queryFn: () => getAllRooms(params),
    });
};

export const useCreateRoom = () => {
    return useMutation({ mutationFn: createRoom });
};

export const useUpdateRoom = () => {
    return useMutation({
        mutationFn: updateRoom,
    });
};
