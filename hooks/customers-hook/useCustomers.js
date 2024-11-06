import {
    getAllCustomers,
    getCustomerById,
} from "../../apis/customers-api/customers";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCustomers = () => {
    return useQuery({
        queryKey: ["getAllCustomers"],
        queryFn: getAllCustomers,
    });
};

export const useGetCustomerById = (id) => {
    return useQuery({
        queryKey: ["getCustomerById", id],
        queryFn: getCustomerById,
        enabled: !!id, // Chỉ thực thi query khi id tồn tại
    });
};
