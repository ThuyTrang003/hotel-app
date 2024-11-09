import { getAllStaffs } from "../../apis/staffs-api/staffs";
import { useQuery } from "@tanstack/react-query";

export const useGetAllStaffs = (params) => {
    return useQuery({
        queryKey: ["getAllStaffs", params],
        queryFn: () => getAllStaffs(params),
    });
};
