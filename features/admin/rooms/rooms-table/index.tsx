"use client";

import { roomsColumns } from "./rooms-columns";
import { RefreshCcw, Search } from "lucide-react";
import { useState } from "react";

import { useGetAllRooms } from "@/hooks/rooms-hook/useRooms";

import { DataTablePagination } from "@/components/data-table-pagination";
import { IconInput, RightIcon } from "@/components/icon-input";
import ImageUploader from "@/components/image-uploader";
import TableSkeleton from "@/components/table-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function RoomsTable() {
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const {
        data: allRoomsData,
        isSuccess,
        isError,
        error,
        isPending,
    } = useGetAllRooms({
        page: pageNumber,
        size: pageSize,
    });
    if (isError) {
        console.log(error);
    }
    if (isPending) {
        return <TableSkeleton />;
    }

    return (
        <>
            <div className="flex justify-end space-x-4">
                <Button variant="outline">
                    <RefreshCcw size={20} strokeWidth={1.75} /> Refresh
                </Button>
            </div>

            {allRoomsData && (
                <DataTablePagination
                    columns={roomsColumns}
                    data={allRoomsData.data}
                    totalPages={allRoomsData.totalCount}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                />
            )}
        </>
    );
}
