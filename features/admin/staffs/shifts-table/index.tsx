"use client";

import { ShiftDialog } from "./shift-dialog";
import { shiftsColumns } from "./shifts-columns";
import { Plus, RefreshCcw, Search } from "lucide-react";
import { useState } from "react";

import { useGetAllShifts } from "@/hooks/staffs-hook/useShifts";

import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import TableSkeleton from "@/components/table-skeleton";
import { Button } from "@/components/ui/button";

export function ShiftsTable() {
    const {
        data: allShiftsData,
        isError,
        error,
        isPending,
    } = useGetAllShifts();
    if (isError) {
        console.log(error);
    }
    if (isPending) {
        return <TableSkeleton />;
    }
    console.log(allShiftsData);
    return (
        <>
            <div className="flex justify-end space-x-4">
                <ShiftDialog>
                    <Button variant="secondary">
                        <Plus size={20} strokeWidth={1.75} /> Add
                    </Button>
                </ShiftDialog>
            </div>
            {allShiftsData && (
                <DataTable columns={shiftsColumns} data={allShiftsData} />
            )}
        </>
    );
}
