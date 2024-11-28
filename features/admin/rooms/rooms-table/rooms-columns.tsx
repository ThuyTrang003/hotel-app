"use client";

import { DeleteRoomDialog } from "./delete-room-dialog";
import { RoomDialog } from "./room-dialog";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

import { isAdmin } from "@/features/admin/utils/isAdmin";

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

interface Room {
    _id: string;
    roomNumber: string;
    typeId: {
        _id: string;
        typename: string;
        images: string[];
    };
    description: string;
    status: string;
}

export const roomsColumns: ColumnDef<Room>[] = [
    {
        accessorKey: "roomNumber",
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
                    Room Number
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div>{row.getValue("roomNumber")}</div>,
    },
    {
        accessorKey: "typeId",
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
                    Type
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="text-left capitalize">
                {row.original.typeId.typename}
            </div>
        ),
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
        accessorKey: "typeId",
        header: "Image",
        cell: ({ row }) => {
            const images = row.original.typeId.images as string[];
            if (images.length === 0) return <div>No image</div>;
            return <ImageCarousel images={images} />;
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const room = row.original;

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
                        {isAdmin() && (
                            <>
                                <DropdownMenuSeparator className="bg-black/30" />
                                <RoomDialog
                                    defaultValue={{
                                        typeId: room.typeId._id,
                                        description: room.description,
                                        roomNumber: room.roomNumber,
                                    }}
                                    roomId={room._id}
                                >
                                    <DropdownMenuItem
                                        onSelect={(e) => e.preventDefault()}
                                    >
                                        Edit
                                    </DropdownMenuItem>
                                </RoomDialog>
                                <DeleteRoomDialog
                                    roomId={room._id}
                                    roomNumber={room.roomNumber}
                                >
                                    <DropdownMenuItem
                                        onSelect={(e) => e.preventDefault()}
                                    >
                                        Delete
                                    </DropdownMenuItem>
                                </DeleteRoomDialog>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
