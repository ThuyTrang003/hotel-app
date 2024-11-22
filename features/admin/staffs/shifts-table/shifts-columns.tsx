"use client";

import { DeleteShiftDialog } from "./delete-shift-dialog";
import { ShiftDialog } from "./shift-dialog";
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
    shiftName: string;
    startTime: string;
    endTime: string;
}

export const shiftsColumns: ColumnDef<Shift>[] = [
    {
        accessorKey: "shiftName",
        header: ({ column }) => {
            const isSorted = column.getIsSorted();
            return (
                <Button
                    variant={isSorted ? "outline" : "ghost"}
                    onClick={() => {
                        // Nếu cột đang được sort, thì tắt sort
                        if (isSorted) {
                            column.clearSorting();
                        } else {
                            // Nếu không, thì bật sort theo chiều tăng dần
                            column.toggleSorting();
                        }
                    }}
                    className="px-2"
                >
                    Shift name
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="text-left">{row.getValue("shiftName")}</div>
        ),
    },
    {
        accessorKey: "startTime",
        header: "Start Time",
        cell: ({ row }) => (
            <div className="text-left">{row.getValue("startTime")}</div>
        ),
    },
    {
        accessorKey: "endTime",
        header: "End Time",
        cell: ({ row }) => (
            <div className="text-left">{row.getValue("endTime")}</div>
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
                        <ShiftDialog defaultValue={shift}>
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
                        </DeleteShiftDialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
