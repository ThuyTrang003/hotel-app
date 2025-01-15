"use client";

import { RoomCard } from "./room-card";
import { RoomCardSkeleton } from "./room-card-skeleton";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useGetAllTypeRooms } from "@/hooks/rooms-hook/useTypeRooms";

import { combineDateAndTime } from "@/utils/date-formatter";

import { TypeRoom } from "@/features/admin/rooms/types-table/type-rooms-columns";

import { Button } from "@/components/ui/button";

export function AllRoomsPreview() {
    const searchParams = useSearchParams();
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const startTime = searchParams.get("startTime");
    const endTime = searchParams.get("endTime");
    const guests = searchParams.get("guests");

    const [pageSize, setPageSize] = useState(12);
    const [pageNumber, setPageNumber] = useState(1);

    const [checkInTime, setCheckInTime] = useState<string>();
    const [checkOutTime, setCheckOutTime] = useState<string>();
    const [limit, setLimit] = useState<number>();

    //update search-form theo url path
    useEffect(() => {
        if (startDate && endDate && startTime && endTime) {
            setCheckInTime(combineDateAndTime(startDate, startTime));
            setCheckOutTime(combineDateAndTime(endDate, endTime));
        } else {
            setCheckInTime(undefined);
            setCheckOutTime(undefined);
        }
        if (guests) {
            setLimit(parseInt(guests));
        } else {
            setLimit(undefined);
        }
    }, [startDate, endDate, startTime, endTime, guests]);

    const {
        data: allTypeRoomsData,
        isPending,
        isSuccess,
    } = useGetAllTypeRooms({
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

            {isPending && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <RoomCardSkeleton key={index} />
                    ))}
                </div>
            )}
            {isSuccess && (
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
                    variant="link"
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
                    variant="link"
                >
                    Next <ArrowRight size={20} />
                </Button>
            </div>
        </section>
    );
}
