import { TypeRoomscolumns } from "./type-rooms-columns";
import { Plus, RefreshCcw } from "lucide-react";

import { useGetAllTypeRooms } from "@/hooks/rooms-hook/useTypeRooms";

import { DataTable } from "@/components/data-table";
import TableSkeleton from "@/components/table-skeleton";
import { Button } from "@/components/ui/button";

export function TypeRoomsTable() {
    const {
        data: allTypeRoomsData,
        isSuccess,
        isError,
        error,
        isPending,
        refetch: refetchAllTypesRooms,
    } = useGetAllTypeRooms();
    if (isSuccess) {
        console.log(allTypeRoomsData);
    } else if (isError) {
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
                <Button variant="outline" onClick={() => refetchAllTypesRooms}>
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
