import {
    getAllCustomers,
    getCustomerById,
    updateCustomer,
} from "../../apis/customers-api/customers";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllCustomers = (params) => {
    return useQuery({
        queryKey: ["getAllCustomers", params],
        queryFn: () => getAllCustomers(params),
    });
};

export const useGetCustomerById = (id) => {
    return useQuery({
        queryKey: ["getCustomerById", id],
        queryFn: () => getCustomerById(id),
        enabled: !!id, // Chỉ thực thi query khi id tồn tại
    });
};

export const useUpdateCustomer = () => {
    return useMutation({
        mutationFn: updateCustomer,
    });
};
