"use client";

import { DeleteStaffDialog } from "./delete-staff-dialog";
import { UpdateStaffDialog } from "./update-staff-dialog";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

import { dateFormatter } from "@/utils/date-formatter";
import { moneyFormatter } from "@/utils/money-formatter";

import { roleFormatter } from "@/features/admin/utils/role-formatter";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Staff {
    id: string;
    phoneNumber: string;
    email: string;
    fullName: string;
    gender: string;
    birthDate: string;
    isVerified: boolean;
    role: string;
    salary: number;
    status: boolean;
}

export const staffsColumns: ColumnDef<Staff>[] = [
    {
        accessorKey: "phoneNumber",
        header: "Phone Number",
        cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
    },
    {
        accessorKey: "fullName",
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
                    Full Name
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="text-left">{row.getValue("fullName")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
            <div className="text-left">{row.getValue("email")}</div>
        ),
    },
    {
        accessorKey: "gender",
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
                    Gender
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div>{row.getValue("gender")}</div>,
    },
    {
        accessorKey: "birthDate",
        header: "Birth date",
        cell: ({ row }) => (
            <div className="text-left">
                {dateFormatter(row.getValue("birthDate"))}
            </div>
        ),
    },
    {
        accessorKey: "role",
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
                    Role
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div>{roleFormatter(row.getValue("role"))}</div>,
    },
    {
        accessorKey: "salary",
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
                    Salary
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div>{moneyFormatter(row.getValue("salary"))}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const staff = row.original;

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
                        <DropdownMenuSeparator className="bg-black/30" />
                        <UpdateStaffDialog
                            defaultValue={{
                                salary: staff.salary,
                            }}
                            staffId={staff.id}
                        >
                            <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                            >
                                Edit
                            </DropdownMenuItem>
                        </UpdateStaffDialog>

                        <DeleteStaffDialog staff={staff}>
                            <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DeleteStaffDialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
