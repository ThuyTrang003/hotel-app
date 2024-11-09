import { getAllTypeRooms } from "../../apis/rooms-api/type-rooms";
import { useQuery } from "@tanstack/react-query";

export const useGetAllTypeRooms = () => {
    return useQuery({
        queryKey: ["getAllTypeRooms"],
        queryFn: () => getAllTypeRooms(),
    });
};
