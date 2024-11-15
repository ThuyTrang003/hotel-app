"use client";

import { CustomerDialog } from "../customer-dialog";
import { customersColumns } from "./customers-columns";
import { Plus } from "lucide-react";
import { useState } from "react";

import { useGetAllCustomers } from "@/hooks/customers-hook/useCustomers";

import { DataTablePagination } from "@/components/data-table-pagination";
import TableSkeleton from "@/components/table-skeleton";
import { Button } from "@/components/ui/button";

export function CustomersTable() {
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);

    const {
        data: allCustomersData,
        isSuccess,
        isError,
        error,
        isPending,
    } = useGetAllCustomers({ page: pageNumber, size: pageSize });

    if (isError) {
        console.log(error);
    }
    if (isPending) {
        return <TableSkeleton />;
    }

    return (
        <>
            <div className="flex justify-end space-x-4">
                <CustomerDialog>
                    <Button variant="secondary">
                        <Plus size={20} strokeWidth={1.75} /> Add
                    </Button>
                </CustomerDialog>
            </div>
            {allCustomersData && (
                <DataTablePagination
                    columns={customersColumns}
                    data={allCustomersData.data}
                    totalPages={allCustomersData.totalCount}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                />
            )}
        </>
    );
}
