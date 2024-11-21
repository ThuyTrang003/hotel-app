import {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBookingById,
} from "../../apis/bookings-api/bookings";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllBookings = (params) => {
    return useQuery({
        queryKey: ["getAllBookings", params],
        queryFn: () => getAllBookings(params),
    });
};

export const useGetBookingById = (id) => {
    return useQuery({
        queryKey: ["getBookingById", id],
        queryFn: () => getBookingById(id),
        enabled: !!id, // Chỉ thực thi query khi id tồn tại
    });
};

export const useUpdateBookingById = () => {
    return useMutation({
        mutationFn: updateBookingById,
    });
};
export const useCreatePBooking = () => {
    return useMutation({
        mutationFn: createBooking,
    });
};
