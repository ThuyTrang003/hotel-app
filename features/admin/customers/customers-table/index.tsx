import { customersColumns } from "./customers-columns";

import { useGetAllCustomers } from "@/hooks/customers-hook/useCustomers";

import { DataTable } from "@/components/data-table";
import TableSkeleton from "@/components/table-skeleton";

export function CustomersTable() {
    const {
        data: allCustomersData,
        isSuccess,
        isError,
        error,
        isPending,
    } = useGetAllCustomers({});
    if (isSuccess) {
        console.log(allCustomersData);
    } else if (isError) {
        console.log(error);
    }
    if (isPending) {
        return <TableSkeleton />;
    }
    return (
        <>
            {allCustomersData && (
                <DataTable
                    columns={customersColumns}
                    data={allCustomersData}
                    pageSizeValue={7}
                />
            )}
        </>
    );
}
