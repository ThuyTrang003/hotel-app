import {
    createShift,
    deleteShiftById,
    getAllShifts,
    getShiftById,
    updateShiftById,
} from "../../apis/staffs-api/shifts";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllShifts = () => {
    return useQuery({
        queryKey: ["getAllShifts"],
        queryFn: getAllShifts,
    });
};

export const useGetShiftById = (id) => {
    return useQuery({
        queryKey: ["getShiftById", id],
        queryFn: () => getShiftById(id),
        enabled: !!id, // Chỉ thực thi query khi id tồn tại
    });
};

export const useUpdateShiftById = () => {
    return useMutation({
        mutationFn: updateShiftById,
    });
};
export const useCreateShift = () => {
    return useMutation({
        mutationFn: createShift,
    });
};

export const useDeleteShiftById = () => {
    return useMutation({
        mutationFn: deleteShiftById,
    });
};
