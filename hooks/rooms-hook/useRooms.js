import { createRoom, getAllRooms } from "../../apis/rooms-api/rooms";
import { useQuery } from "@tanstack/react-query";

export const useGetAllRooms = (params) => {
    return useQuery({
        queryKey: ["getAllRooms", params],
        queryFn: () => getAllRooms(params),
    });
};

export const useCreateRoom = () => {
    return useMutation({ mutationFn: createRoom });
};
