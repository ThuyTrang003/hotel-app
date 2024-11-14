"use client";

import { TypeRoomDialog } from "./type-room-dialog";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

import { moneyFormatter } from "@/utils/money-formatter";

import { ImageCarousel } from "@/components/image-carousel";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TypeRoom {
    _id: string;
    description: string;
    typename: string;
    limit: number;
    price: {
        hourlyRate: number;
        dailyRate: number;
    };
    images: string[];
    availableRoom: number;
    rating: {
        averageScore: number;
        totalRating: number;
    };
}
const onViewDetail = () => {};

export const TypeRoomscolumns: ColumnDef<TypeRoom>[] = [
    {
        accessorKey: "typename",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="px-0"
                >
                    Type name
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div>{row.getValue("typename")}</div>,
    },
    {
        accessorKey: "images",
        header: "Image",
        cell: ({ row }) => {
            const images = row.original.images as string[];

            if (!images || images.length === 0) return <div>No image</div>;
            return <ImageCarousel images={images} />;
        },
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
            <div className="text-left capitalize">
                {row.getValue("description")}
            </div>
        ),
    },
    {
        accessorKey: "limit",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="px-0"
                >
                    Limit person
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="text-left">{row.original.limit}</div>
        ),
    },
    {
        accessorKey: "availableRoom",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="px-0"
                >
                    Available rooms
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="text-left">{row.original.limit}</div>
        ),
    },

    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="px-0"
                >
                    Daily rate
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="text-left">
                {moneyFormatter(row.original.price?.dailyRate)}
            </div>
        ),
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="px-0"
                >
                    Hourly rate
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="text-left">
                {moneyFormatter(row.original.price?.hourlyRate)}
            </div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const typeRoom = row.original;

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
                        <DropdownMenuItem>Book room</DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-black/30" />
                        <TypeRoomDialog
                            defaultValue={{
                                description: typeRoom.description,
                                typename: typeRoom.typename,
                                limit: typeRoom.limit,
                                dailyRate: typeRoom.price?.dailyRate,
                                hourlyRate: typeRoom.price?.hourlyRate,
                                existingImages: typeRoom.images,
                            }}
                            typeRoomId={typeRoom._id}
                        >
                            <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                            >
                                Edit
                            </DropdownMenuItem>
                        </TypeRoomDialog>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
