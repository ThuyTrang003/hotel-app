"use client";

import { Clock, MoreVertical, Users } from "lucide-react";
import { useEffect, useState } from "react";

import { useGetAllBookings } from "@/hooks/bookings-hook/useBookings";

import {
    dateFormatter,
    getStartOfDayISO,
    isDateInRange,
    parseDate,
    toEndOfDayISO,
} from "@/utils/date-formatter";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WeekCalendar } from "@/components/week-calendar";

const dummyData = [
    {
        userId: "60e8b2f4c90e5c1f6c4d8f23",
        roomIds: ["60e8b2f4c90e5c1f6c4d8f24", "60e8b2f4c90e5c1f6c4d8f25"],
        checkInTime: "2024-11-20T14:00:00.000Z",
        checkOutTime: "2024-11-22T12:00:00.000Z",
        numberOfGuests: 2,
        paidAmount: {
            amount: 200,
            latestPaidTime: "2023-01-15T11:00:00.000Z",
        },
        totalAmount: 250,
        paymentMethod: "Credit Card",
        currentStatus: true,
    },
    {
        userId: "60e8b2f4c90e5c1f6c4d823",
        roomIds: ["60e8b2f4c90e5c1f6c4d8f24", "60e8b2f4c90e5c1f6c4d8f25"],
        checkInTime: "2024-11-21T14:00:00.000Z",
        checkOutTime: "2024-11-22T12:00:00.000Z",
        numberOfGuests: 2,
        paidAmount: {
            amount: 200,
            latestPaidTime: "2023-01-15T11:00:00.000Z",
        },
        totalAmount: 250,
        paymentMethod: "Credit Card",
        currentStatus: true,
    },
    {
        userId: "60e8b2f4c90e5c1f6c4d8f23",
        roomIds: ["60e8b2f4c90e5c1f6c4d8f24", "60e8b2f4c90e5c1f6c4d8f25"],
        checkInTime: "2024-11-22T14:00:00.000Z",
        checkOutTime: "2024-11-24T12:00:00.000Z",
        numberOfGuests: 2,
        paidAmount: {
            amount: 200,
            latestPaidTime: "2023-01-15T11:00:00.000Z",
        },
        totalAmount: 250,
        paymentMethod: "Credit Card",
        currentStatus: true,
    },
    {
        userId: "60e8b2f4c90e5c1f6c4d8f23",
        roomIds: ["60e8b2f4c90e5c1f6c4d8f24", "60e8b2f4c90e5c1f6c4d8f25"],

        checkInTime: "2024-11-19T14:00:00.000Z",
        checkOutTime: "2024-11-22T12:00:00.000Z",
        numberOfGuests: 2,
        paidAmount: {
            amount: 200,
            latestPaidTime: "2023-01-15T11:00:00.000Z",
        },
        totalAmount: 250,
        paymentMethod: "Credit Card",
        currentStatus: true,
    },
];
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
    console.log(
        isDateInRange(
            "21/01/2023",
            "2023-01-20T14:00:00.000Z",
            "2023-01-22T12:00:00.000Z",
        ),
    );
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
                <ScrollArea className="flex-1">
                    <div className="flex h-[calc(100vh-14rem)] min-w-max gap-4 p-4">
                        {days.map((day, index) => (
                            <div key={index} className="w-56 space-y-4">
                                <h2 className="px-2 text-sm font-medium">
                                    {day.day} - {day.date}
                                </h2>
                                {dummyData.map((data, index) => (
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
                                                className="space-y-3 bg-background/60 p-3"
                                            >
                                                <CardHeader className="p-0">
                                                    <div className="flex items-center justify-between">
                                                        <CardTitle className="text-sm font-medium">
                                                            tên user
                                                        </CardTitle>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                        >
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="p-0 pt-2">
                                                    <div className="flex flex-col gap-2 text-sm">
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
                                                            <Users className="h-4 w-4 text-muted-foreground" />
                                                            <span>
                                                                Guests:{" "}
                                                                {
                                                                    data.numberOfGuests
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            Status:{" "}
                                                            {data.currentStatus}
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
            </div>
        </>
    );
}
