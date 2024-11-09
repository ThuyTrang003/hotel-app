import { staffsColumns } from "./staffs-columns";

import { useGetAllStaffs } from "@/hooks/staffs-hook/useStaffs";

import { DataTable } from "@/components/data-table";
import TableSkeleton from "@/components/table-skeleton";

export function StaffsTable() {
    const {
        data: allStaffsData,
        isSuccess,
        isError,
        error,
        isPending,
    } = useGetAllStaffs({});
    if (isSuccess) {
        console.log(allStaffsData);
    } else if (isError) {
        console.log(error);
    }
    if (isPending) {
        return <TableSkeleton />;
    }
    return (
        <>
            {allStaffsData && (
                <DataTable
                    columns={staffsColumns}
                    data={allStaffsData}
                    pageSizeValue={7}
                />
            )}
        </>
    );
}
