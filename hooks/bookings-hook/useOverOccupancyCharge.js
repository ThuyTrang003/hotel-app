import {
    createOverOccupancyCharge,
    deleteOverOccupancyChargeById,
    getAllOverOccupancyCharge,
    getOverOccupancyChargeById,
    updateOverOccupancyChargeById,
} from "../../apis/bookings-api/over-occupancy-charge";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllOverOccupancyCharge = () => {
    return useQuery({
        queryKey: ["getAllOverOccupancyCharge"],
        queryFn: getAllOverOccupancyCharge,
    });
};

export const useGetBookingById = (id) => {
    return useQuery({
        queryKey: ["getOverOccupancyChargeById", id],
        queryFn: () => getOverOccupancyChargeById(id),
        enabled: !!id, // Chỉ thực thi query khi id tồn tại
    });
};

export const useUpdateOverOccupancyChargeById = () => {
    return useMutation({
        mutationFn: updateOverOccupancyChargeById,
    });
};
export const useCreateOverOccupancyCharge = () => {
    return useMutation({
        mutationFn: createOverOccupancyCharge,
    });
};

export const useDeletePromotionById = () => {
    return useMutation({
        mutationFn: deleteOverOccupancyChargeById,
    });
};
