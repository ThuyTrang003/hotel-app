"use client";

import { RoomCard } from "./room-card";
import { RoomCardSkeleton } from "./room-card-skeleton";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useGetAllTypeRooms } from "@/hooks/rooms-hook/useTypeRooms";

import { TypeRoom } from "@/features/admin/rooms/types-table/type-rooms-columns";

import { Button } from "@/components/ui/button";

export function AllRoomsPreview() {
    const searchParams = useSearchParams();
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const guests = searchParams.get("guests");

    const [pageSize, setPageSize] = useState(12);
    const [pageNumber, setPageNumber] = useState(1);

    const [checkInTime, setCheckInTime] = useState<Date>();
    const [checkOutTime, setCheckOutTime] = useState<Date>();
    const [limit, setLimit] = useState<number>();

    useEffect(() => {
        if (startDate && endDate) {
            setCheckInTime(new Date(startDate));
            setCheckOutTime(new Date(endDate));
        } else {
            setCheckInTime(undefined);
            setCheckOutTime(undefined);
        }
        if (guests) {
            setLimit(parseInt(guests));
        } else {
            setLimit(undefined);
        }
    }, [startDate, endDate, guests]);

    const { data: allTypeRoomsData, isPending } = useGetAllTypeRooms({
        size: pageSize,
        page: pageNumber,
        checkInTime: checkInTime,
        checkOutTime: checkOutTime,
        limit: limit,
    });

    return (
        <section className="px-10 py-8">
            <div className="flex items-center justify-between pb-4">
                <h2 className="text-xl font-semibold tracking-tight">
                    All rooms
                </h2>
            </div>

            {isPending ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <RoomCardSkeleton key={index} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {allTypeRoomsData?.data.map((typeRoomsData: TypeRoom) => (
                        <RoomCard
                            typeRoom={typeRoomsData}
                            key={typeRoomsData._id}
                        />
                    ))}
                </div>
            )}
            <div className="flex items-center justify-between">
                <Button
                    onClick={() => setPageNumber(pageNumber - 1)}
                    disabled={pageNumber <= 1}
                    variant="outline"
                    className="border-0"
                >
                    <ArrowLeft size={20} /> Previous
                </Button>
                <span className="mx-2">
                    Page {pageNumber} of {allTypeRoomsData?.metadata.totalPages}
                </span>
                <Button
                    onClick={() => setPageNumber(pageNumber + 1)}
                    disabled={
                        pageNumber >= allTypeRoomsData?.metadata.totalPages
                    }
                    variant="outline"
                    className="border-0"
                >
                    Next <ArrowRight size={20} />
                </Button>
            </div>
        </section>
    );
}
