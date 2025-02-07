"use client";

import DetailBookingDialog from "./detail-booking-dialog";
import { UpdateBookingDialog } from "./update-booking-dialog";
import { Clock, MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { useGetAllBookings } from "@/hooks/bookings-hook/useBookings";

import {
    dateFormatter,
    getStartOfDayISO,
    isDateInRange,
    parseDate,
    toEndOfDayISO,
} from "@/utils/date-formatter";
import { moneyFormatter } from "@/utils/money-formatter";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WeekCalendar } from "@/components/week-calendar";

export interface Ibooking {
    _id: string;
    userId: {
        email: string;
        fullName: string;
        role: string;
        phoneNumber: string;
        id: string;
    };
    roomIds: Array<{
        _id: string;
        roomNumber: string;
        typeId: {
            _id: string;
            typename: string;
        };
    }>;
    checkInTime: string;
    checkOutTime: string;
    numberOfGuests: number;
    paidAmount: {
        amount: number;
        latestPaidTime: string;
    };
    totalAmount: number;
    paymentMethod: string;
    currentStatus: string;
    createdAt: string;
}
export function BookingsTable() {
    const [weekStart, setWeekStart] = useState("");
    const [weekEnd, setWeekEnd] = useState("");
    console.log(weekStart, weekEnd);
    const [days, setDays] = useState<{ date: string; day: string }[]>([]);
    useEffect(() => {
        const weekDays = [
            "Chủ nhật",
            "Thứ 2",
            "Thứ 3",
            "Thứ 4",
            "Thứ 5",
            "Thứ 6",
            "Thứ 7",
        ];
        const daysArray = [];

        for (
            let d = new Date(parseDate(weekStart));
            d <= parseDate(weekEnd);
            d.setDate(d.getDate() + 1)
        ) {
            daysArray.push({
                date: d.toLocaleDateString("vi-VN"),
                day: weekDays[d.getDay()],
            });
        }
        setDays(daysArray);
    }, [weekStart, weekEnd]);
    const [pageSize, setPageSize] = useState(100);
    const [pageNumber, setPageNumber] = useState(1);

    const { data: allBookings } = useGetAllBookings({
        size: pageSize,
        page: pageNumber,
        checkInTime: getStartOfDayISO(weekStart),
        checkOutTime: toEndOfDayISO(weekEnd),
    });
    return (
        <>
            <div className="flex flex-col">
                <div className="flex items-center space-x-4">
                    <WeekCalendar
                        setWeekStart={setWeekStart}
                        setWeekEnd={setWeekEnd}
                    />
                </div>
                <header className="flex items-center gap-2 border-b p-4">
                    <h1 className="text-lg font-medium">Booking schedule</h1>
                    {weekStart !== "" && (
                        <span className="text-sm text-muted-foreground">
                            {dateFormatter(weekStart)} &gt;
                            {dateFormatter(weekEnd)}
                        </span>
                    )}
                </header>
                {allBookings && (
                    <ScrollArea className="flex-1">
                        <div className="flex h-[calc(100vh-14rem)] min-w-max gap-4 p-4">
                            {days.map((day, index) => (
                                <div key={index} className="w-56 space-y-4">
                                    <h2 className="px-2 text-sm font-medium">
                                        {day.day} - {day.date}
                                    </h2>
                                    {allBookings.data.map((data: Ibooking) => (
                                        <>
                                            <p>
                                                {isDateInRange(
                                                    day.date,
                                                    data.checkInTime,
                                                    data.checkOutTime,
                                                )}
                                            </p>
                                            {isDateInRange(
                                                day.date,
                                                data.checkInTime,
                                                data.checkOutTime,
                                            ) && (
                                                <Card
                                                    key={index}
                                                    className={cn(
                                                        "space-y-3 p-3",
                                                        data.currentStatus ===
                                                            "Cancelled"
                                                            ? "bg-red-100"
                                                            : "",
                                                        data.currentStatus ===
                                                            "Reserved"
                                                            ? "bg-yellow-100"
                                                            : "",
                                                        data.currentStatus ===
                                                            "Left"
                                                            ? "bg-green-100"
                                                            : "",
                                                    )}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-1">
                                                            Status:{" "}
                                                            {data.currentStatus}
                                                        </div>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8"
                                                                >
                                                                    <MoreVertical className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent
                                                                align="end"
                                                                className="border-black/30"
                                                            >
                                                                <DetailBookingDialog
                                                                    booking={
                                                                        data
                                                                    }
                                                                >
                                                                    <DropdownMenuItem
                                                                        onSelect={(
                                                                            e,
                                                                        ) =>
                                                                            e.preventDefault()
                                                                        }
                                                                    >
                                                                        View
                                                                        details
                                                                    </DropdownMenuItem>
                                                                </DetailBookingDialog>
                                                                <UpdateBookingDialog
                                                                    booking={
                                                                        data
                                                                    }
                                                                >
                                                                    <DropdownMenuItem
                                                                        onSelect={(
                                                                            e,
                                                                        ) =>
                                                                            e.preventDefault()
                                                                        }
                                                                    >
                                                                        Edit
                                                                    </DropdownMenuItem>
                                                                </UpdateBookingDialog>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                    <CardContent className="p-0 pt-2">
                                                        <div className="flex flex-col gap-2 text-sm">
                                                            <div className="flex items-center gap-1">
                                                                <span>
                                                                    Customer:{" "}
                                                                    {
                                                                        data
                                                                            .userId
                                                                            .fullName
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <span>
                                                                    Rooms:{" "}
                                                                    {data.roomIds.map(
                                                                        (room: {
                                                                            _id: string;
                                                                            roomNumber: string;
                                                                            typeId: {
                                                                                _id: string;
                                                                                typename: string;
                                                                            };
                                                                        }) => (
                                                                            <span
                                                                                key={
                                                                                    room._id
                                                                                }
                                                                            >
                                                                                {
                                                                                    room.roomNumber
                                                                                }
                                                                            </span>
                                                                        ),
                                                                    )}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <span>
                                                                    Type rooms:{" "}
                                                                    {data.roomIds.map(
                                                                        (room: {
                                                                            _id: string;
                                                                            roomNumber: string;
                                                                            typeId: {
                                                                                _id: string;
                                                                                typename: string;
                                                                            };
                                                                        }) => (
                                                                            <span
                                                                                key={
                                                                                    room._id
                                                                                }
                                                                            >
                                                                                {
                                                                                    room
                                                                                        .typeId
                                                                                        .typename
                                                                                }
                                                                            </span>
                                                                        ),
                                                                    )}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                                <span>
                                                                    Check-in:{" "}
                                                                    {dateFormatter(
                                                                        data.checkInTime,
                                                                    )}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                                <span>
                                                                    Check-out:{" "}
                                                                    {dateFormatter(
                                                                        data.checkOutTime,
                                                                    )}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                Total Amount:{" "}
                                                                {moneyFormatter(
                                                                    data.totalAmount,
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                Paid Amount:{" "}
                                                                {moneyFormatter(
                                                                    data
                                                                        .paidAmount
                                                                        .amount,
                                                                )}
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            )}
                                        </>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                )}
            </div>
        </>
    );
}
