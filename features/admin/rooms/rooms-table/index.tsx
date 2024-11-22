"use client";

import { roomsColumns } from "./rooms-columns";
import { useState } from "react";

import { useGetAllRooms } from "@/hooks/rooms-hook/useRooms";

import { DataTablePagination } from "@/components/data-table-pagination";
import TableSkeleton from "@/components/table-skeleton";

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
        status: true,
    });
    if (isError) {
        console.log(error);
    }
    if (isPending) {
        return <TableSkeleton />;
    }

    return (
        <>
            {allRoomsData && (
                <DataTablePagination
                    columns={roomsColumns}
                    data={allRoomsData.data}
                    totalPages={allRoomsData.metadata.totalPages}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                />
            )}
        </>
    );
}
