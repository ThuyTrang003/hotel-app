import { getAllStaffs, updateStaff } from "../../apis/staffs-api/staffs";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllStaffs = (params) => {
    return useQuery({
        queryKey: ["getAllStaffs", params],
        queryFn: () => getAllStaffs(params),
    });
};

export const useUpdateStaff = () => {
    return useMutation({
        mutationFn: updateStaff,
    });
};
