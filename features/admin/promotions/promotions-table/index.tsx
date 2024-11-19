"use client";

import { PromotionDialog } from "../promotion-dialog";
import { customersColumns } from "./promotions-columns";
import { Plus } from "lucide-react";
import { useState } from "react";

import { useGetAllPromotions } from "@/hooks/promotions-hook/usePromotions";

import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import TableSkeleton from "@/components/table-skeleton";
import { Button } from "@/components/ui/button";

export function PromotionsTable() {
    const {
        data: allPromotionsData,
        isError,
        error,
        isPending,
    } = useGetAllPromotions();

    if (isError) {
        console.log(error);
    }
    if (isPending) {
        return <TableSkeleton />;
    }
    console.log(allPromotionsData);

    return (
        <>
            <div className="flex justify-end space-x-4">
                <PromotionDialog>
                    <Button variant="secondary">
                        <Plus size={20} strokeWidth={1.75} /> Add
                    </Button>
                </PromotionDialog>
            </div>
            {allPromotionsData && (
                <DataTable
                    columns={customersColumns}
                    data={allPromotionsData}
                />
            )}
        </>
    );
}
