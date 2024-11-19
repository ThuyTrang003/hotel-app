"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    isHeader?: boolean;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    isHeader = true,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const [globalFilter, setGlobalFilter] = useState("");
    const [pageSize, setPageSize] = useState(10);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        //pagination
        getPaginationRowModel: getPaginationRowModel(),
        //sorting
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        //fitering
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: (row, columnId, filterValue) => {
            const value = row.getValue(columnId);
            if (typeof value === "string") {
                return value.toLowerCase().includes(filterValue.toLowerCase());
            } else if (typeof value === "number") {
                return value.toString().includes(filterValue);
            }
            return false;
        },
        state: {
            sorting,
            columnFilters,
            globalFilter,
            pagination: {
                pageSize: pageSize,
                pageIndex: 0,
            },
        },
    });

    return (
        <div>
            <div className="flex items-center justify-end py-4">
                <Input
                    placeholder="Search..."
                    value={globalFilter ?? ""}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    className="max-w-sm border-black/50 bg-transparent"
                />
            </div>

            <div className="overflow-hidden">
                <Table>
                    {isHeader && (
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow
                                    key={headerGroup.id}
                                    className="hover:bg-transparent"
                                >
                                    {headerGroup.headers.map(
                                        (header, index) => {
                                            return (
                                                <TableHead
                                                    key={index}
                                                    className="text-base"
                                                >
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                              header.column
                                                                  .columnDef
                                                                  .header,
                                                              header.getContext(),
                                                          )}
                                                </TableHead>
                                            );
                                        },
                                    )}
                                </TableRow>
                            ))}
                        </TableHeader>
                    )}

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row
                                        .getVisibleCells()
                                        .map((cell, index) => (
                                            <TableCell key={index}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </TableCell>
                                        ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
                <Select
                    value={pageSize.toString()}
                    onValueChange={(value) => {
                        setPageSize(Number(value));
                        table.setPageSize(Number(value));
                    }}
                >
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select page size" />
                    </SelectTrigger>
                    <SelectContent className="min-w-[120px]">
                        {[10, 20, 30, 40, 50].map((size) => (
                            <SelectItem key={size} value={size.toString()}>
                                {size} rows
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
