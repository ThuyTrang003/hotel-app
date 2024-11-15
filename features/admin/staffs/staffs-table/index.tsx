"use client";

import { staffsColumns } from "./staffs-columns";
import { Plus } from "lucide-react";
import { useState } from "react";

import { useGetAllStaffs } from "@/hooks/staffs-hook/useStaffs";

import { SignupTabs } from "@/features/auth/components/signup-tabs";

import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import TableSkeleton from "@/components/table-skeleton";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function StaffsTable() {
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);

    const {
        data: allStaffsData,
        isError,
        error,
        isPending,
    } = useGetAllStaffs({ page: pageNumber, size: pageSize });
    if (isError) {
        console.log(error);
    }
    if (isPending) {
        return <TableSkeleton />;
    }
    return (
        <>
            <div className="flex justify-end space-x-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="secondary">
                            <Plus size={20} strokeWidth={1.75} /> Add
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[450px]">
                        <DialogHeader>
                            <DialogTitle>Add staff</DialogTitle>
                        </DialogHeader>
                        <div className="mr-4">
                            <SignupTabs />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            {allStaffsData && (
                <DataTablePagination
                    columns={staffsColumns}
                    data={allStaffsData.data}
                    totalPages={allStaffsData.totalCount}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                />
            )}
        </>
    );
}
