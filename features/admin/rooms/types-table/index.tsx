import { TypeRoomDialog } from "./type-room-dialog";
import { TypeRoomscolumns } from "./type-rooms-columns";
import { Plus, RefreshCcw } from "lucide-react";
import { useState } from "react";

import { useGetAllTypeRooms } from "@/hooks/rooms-hook/useTypeRooms";

import { DataTable } from "@/components/data-table";
import ImageUploader from "@/components/image-uploader";
import TableSkeleton from "@/components/table-skeleton";
import { Button } from "@/components/ui/button";

export function TypeRoomsTable() {
    const {
        data: allTypeRoomsData,
        isSuccess,
        isError,
        error,
        isPending,
    } = useGetAllTypeRooms();
    if (isError) {
        console.log(error);
    }
    if (isPending) {
        return <TableSkeleton />;
    }
    return (
        <>
            <div className="flex justify-end space-x-4">
                <TypeRoomDialog>
                    <Button variant="secondary">
                        <Plus size={20} strokeWidth={1.75} /> Add
                    </Button>
                </TypeRoomDialog>
                <Button
                    variant="outline"
                    //onClick={}
                >
                    <RefreshCcw size={20} strokeWidth={1.75} /> Refresh
                </Button>
            </div>
            {allTypeRoomsData && (
                <DataTable
                    columns={TypeRoomscolumns}
                    data={allTypeRoomsData}
                    pageSizeValue={4}
                />
            )}
        </>
    );
}
