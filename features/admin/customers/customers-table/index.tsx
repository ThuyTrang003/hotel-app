import { customersColumns } from "./customers-columns";

import { useGetAllCustomers } from "@/hooks/customers-hook/useCustomers";

import { DataTable } from "@/components/data-table";

export function CustomersTable() {
    const {
        data: allCustomersData,
        isSuccess,
        isError,
        error,
    } = useGetAllCustomers();
    if (isSuccess) {
        console.log(allCustomersData);
    } else if (isError) {
        console.log(error);
    }
    return (
        <>
            {/* <DataTable
                columns={customersColumns}
                data={allCustomersData}
                pageSizeValue={4}
            /> */}
        </>
    );
}
