"use client";

import { roomsColumns } from "./rooms-columns";
import { Plus, RefreshCcw } from "lucide-react";
import { useState } from "react";

import { useGetAllRooms } from "@/hooks/rooms-hook/useRooms";

import { DataTable } from "@/components/data-table";
import ImageUploader from "@/components/image-uploader";
import TableSkeleton from "@/components/table-skeleton";
import { Button } from "@/components/ui/button";

export function RoomsTable() {
    const {
        data: allRoomsData,
        isSuccess,
        isError,
        error,
        isPending,
    } = useGetAllRooms({});
    if (isError) {
        console.log(error);
    }
    if (isPending) {
        return <TableSkeleton />;
    }

    return (
        <>
            <div className="flex justify-end space-x-4">
                <Button variant="secondary">
                    <Plus size={20} strokeWidth={1.75} /> Add
                </Button>
                <Button variant="outline">
                    <RefreshCcw size={20} strokeWidth={1.75} /> Refresh
                </Button>
            </div>
            {allRoomsData && (
                <DataTable
                    columns={roomsColumns}
                    data={allRoomsData}
                    pageSizeValue={4}
                />
            )}
        </>
    );
}
