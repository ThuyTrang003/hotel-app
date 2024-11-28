"use client";

import { OverOccupancyChargeColumns } from "./over-occupancy-charge-columns";
import { Plus } from "lucide-react";

import { useGetAllOverOccupancyCharge } from "@/hooks/bookings-hook/useOverOccupancyCharge";
import { useGetAllShifts } from "@/hooks/staffs-hook/useShifts";

import { DataTable } from "@/components/data-table";
import TableSkeleton from "@/components/table-skeleton";
import { Button } from "@/components/ui/button";

export function OverOccupancyChargeTable() {
    const {
        data: allOverOccupancyCharge,
        isError,
        error,
        isPending,
    } = useGetAllOverOccupancyCharge();
    if (isError) {
        console.log(error);
    }
    if (isPending) {
        return <TableSkeleton />;
    }
    console.log(allOverOccupancyCharge);
    return (
        <>
            <div className="flex justify-end space-x-4">
                <Button variant="secondary">
                    <Plus size={20} strokeWidth={1.75} /> Add
                </Button>
            </div>
            {allOverOccupancyCharge && (
                <DataTable
                    columns={OverOccupancyChargeColumns}
                    data={allOverOccupancyCharge}
                />
            )}
        </>
    );
}
