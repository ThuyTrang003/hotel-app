import { roomsData } from "./dummy-data";
import { columns } from "./rooms-columns";

import { DataTable } from "@/components/data-table";

export function RoomsTable() {
    return (
        <>
            <DataTable columns={columns} data={roomsData} pageSizeValue={4} />
        </>
    );
}
