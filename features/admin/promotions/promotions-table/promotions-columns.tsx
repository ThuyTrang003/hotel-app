"use client";

import { DeletePromotionDialog } from "../delete-promotion-dialog";
import { PromotionDialog } from "../promotion-dialog";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

import { dateFormatter } from "@/utils/date-formatter";
import { moneyFormatter } from "@/utils/money-formatter";

import { isAdmin } from "@/features/admin/utils/isAdmin";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Customer {
    _id: string;
    code: string;
    description: string;
    discountPercentage: number;
    startDate: string;
    endDate: string;
    minSpend: number;
    maxDiscount: number;
    limitUse: number;
    userUsedVoucher: string[];
}

export const customersColumns: ColumnDef<Customer>[] = [
    {
        accessorKey: "code",
        header: "Code",
        cell: ({ row }) => <div>{row.getValue("code")}</div>,
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
            <div className="text-left">{row.getValue("description")}</div>
        ),
    },
    {
        accessorKey: "discountPercentage",
        header: ({ column }) => {
            const isSorted = column.getIsSorted();
            return (
                <Button
                    variant={isSorted ? "secondary" : "ghost"}
                    onClick={() => {
                        // Nếu cột đang được sort, thì tắt sort
                        if (isSorted) {
                            column.clearSorting();
                        } else {
                            // Nếu không, thì bật sort theo chiều tăng dần
                            column.toggleSorting(false);
                        }
                    }}
                    className="px-2"
                >
                    Discount (%)
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div>{row.getValue("discountPercentage")}%</div>,
    },
    {
        accessorKey: "startDate",
        header: "Start Date",
        cell: ({ row }) => (
            <div className="text-left">
                {dateFormatter(row.getValue("startDate"))}
            </div>
        ),
    },
    {
        accessorKey: "endDate",
        header: "End Date",
        cell: ({ row }) => (
            <div className="text-left">
                {dateFormatter(row.getValue("endDate"))}
            </div>
        ),
    },
    {
        accessorKey: "minSpend",
        header: "Min amount",
        cell: ({ row }) => (
            <div className="text-left">
                {moneyFormatter(row.getValue("minSpend"))}
            </div>
        ),
    },
    {
        accessorKey: "maxDiscount",
        header: "Max Discount",
        cell: ({ row }) => (
            <div className="text-left">
                {moneyFormatter(row.getValue("maxDiscount"))}
            </div>
        ),
    },
    {
        accessorKey: "limitUse",
        header: "Limit Use",
        cell: ({ row }) => (
            <div className="text-left">{row.getValue("limitUse")}</div>
        ),
    },
    {
        accessorKey: "userUsedVoucher",
        header: "Quantity Used",
        cell: ({ row }) => (
            <div className="text-left">
                {row.original.userUsedVoucher.length}
            </div>
        ),
    },

    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const promotion = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        className="border-black/30"
                    >
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        {isAdmin() && (
                            <>
                                <DropdownMenuSeparator className="bg-black/30" />
                                <PromotionDialog
                                    defaultValue={promotion}
                                    promotionId={promotion._id}
                                >
                                    <DropdownMenuItem
                                        onSelect={(e) => e.preventDefault()}
                                    >
                                        Edit
                                    </DropdownMenuItem>
                                </PromotionDialog>
                                <DeletePromotionDialog
                                    promotionId={promotion._id}
                                    code={promotion.code}
                                >
                                    <DropdownMenuItem
                                        onSelect={(e) => e.preventDefault()}
                                    >
                                        Delete
                                    </DropdownMenuItem>
                                </DeletePromotionDialog>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
