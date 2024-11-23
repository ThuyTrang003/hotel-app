"use client";

import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Shift {
    _id: string;
    excessGuests: number;
    extraCharge: number;
}

export const OverOccupancyChargeColumns: ColumnDef<Shift>[] = [
    {
        accessorKey: "excessGuests",
        header: "Excess Guests",
        cell: ({ row }) => (
            <div className="text-left">{row.getValue("excessGuests")}</div>
        ),
    },
    {
        accessorKey: "extraCharge",
        header: "Extra Charge",
        cell: ({ row }) => (
            <div className="text-left">{row.getValue("extraCharge")}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const shift = row.original;

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
                        {/* <ShiftDialog defaultValue={shift}>
                            <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                            >
                                Edit
                            </DropdownMenuItem>
                        </ShiftDialog>

                        <DeleteShiftDialog
                            shiftId={shift._id}
                            shiftName={shift.shiftName}
                        >
                            <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DeleteShiftDialog> */}
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
