import { getAllCustomers } from "../../apis/customers-api/customers";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCustomers = () => {
    return useQuery({
        queryKey: ["getAllCustomers"],
        queryFn: getAllCustomers,
    });
};
