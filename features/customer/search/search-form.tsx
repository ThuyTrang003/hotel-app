"use client";

import { format } from "date-fns";
import { ArrowRight, Calendar } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { combineDateAndTime } from "@/utils/date-formatter";

import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface TimeRange {
    fromTime?: string;
    toTime?: string;
}
export function SearchForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const guestsValue = searchParams.get("guests");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const startTime = searchParams.get("startTime");
    const endTime = searchParams.get("endTime");

    const [guests, setGuests] = useState<string | undefined>();
    const [date, setDate] = useState<DateRange | undefined>();
    const [time, setTime] = useState<TimeRange>({
        fromTime: "14:00",
        toTime: "12:00",
    });

    //update search-form theo url path
    useEffect(() => {
        if (startDate && endDate && startTime && endTime) {
            setDate({
                from: new Date(startDate),
                to: new Date(endDate),
            });
            setTime({
                fromTime: startTime,
                toTime: endTime,
            });
        } else {
            setDate(undefined);
            setTime({ fromTime: "14:00", toTime: "12:00" });
        }
        if (guestsValue) setGuests(guestsValue);
        else setGuests(undefined);
    }, [startDate, endDate, startTime, endTime]);

    const handleFilterRoom = () => {
        if (date?.from && date?.to) {
            const currentDateTime = new Date();
            const inputDateTime = new Date(
                combineDateAndTime(
                    format(date.from, "yyyy-MM-dd"),
                    time.fromTime,
                ),
            );
            if (inputDateTime < currentDateTime) {
                toast.error("check-in time must be a date in future");
            } else {
                if (guests) {
                    if (parseInt(guests) <= 0)
                        toast.error(
                            "Number of guests must be a positive integer",
                        );
                    else {
                        router.push(
                            `/rooms?startDate=${format(date.from, "yyyy-MM-dd")}&startTime=${time.fromTime}&endDate=${format(date.to, "yyyy-MM-dd")}&endTime=${time.toTime}&guests=${guests}`,
                        );
                    }
                } else {
                    router.push(
                        `/rooms?startDate=${format(date.from, "yyyy-MM-dd")}&startTime=${time.fromTime}&endDate=${format(date.to, "yyyy-MM-dd")}&endTime=${time.toTime}`,
                    );
                }
            }
        } else {
            toast.error("Please select check-in and check-out dates");
        }
    };

    return (
        <div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-lg md:flex-row md:gap-6">
            <div className="flex-1 flex-col space-y-2">
                <label>Check-in and Check-out Dates</label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground",
                            )}
                        >
                            <Calendar className="mr-2 h-4 w-4" />
                            {date?.from ? (
                                date.to ? (
                                    <>
                                        {format(date.from, "dd-MM-yyyy")} -{" "}
                                        {format(date.to, "dd-MM-yyyy")}
                                    </>
                                ) : (
                                    format(date.from, "dd-MM-yyyy")
                                )
                            ) : (
                                <span>Add dates</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                        />
                        <div className="flex justify-between border-t p-3">
                            <div>
                                <p className="mb-1 text-sm font-medium">
                                    Check-in Time
                                </p>
                                <Select
                                    value={time?.fromTime}
                                    onValueChange={(value) =>
                                        setTime((prev) => ({
                                            ...prev,
                                            fromTime: value,
                                        }))
                                    }
                                >
                                    <SelectTrigger className="w-[120px]">
                                        <SelectValue placeholder="Select time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from(
                                            { length: 24 },
                                            (_, i) => i,
                                        ).map((hour) => (
                                            <SelectItem
                                                key={hour}
                                                value={`${hour.toString().padStart(2, "0")}:00`}
                                            >
                                                {`${hour.toString().padStart(2, "0")}:00`}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <p className="mb-1 text-sm font-medium">
                                    Check-out Time
                                </p>
                                <Select
                                    value={time?.toTime}
                                    onValueChange={(value) =>
                                        setTime((prev) => ({
                                            ...prev,
                                            toTime: value,
                                        }))
                                    }
                                >
                                    <SelectTrigger className="w-[120px]">
                                        <SelectValue placeholder="Select time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from(
                                            { length: 24 },
                                            (_, i) => i,
                                        ).map((hour) => (
                                            <SelectItem
                                                key={hour}
                                                value={`${hour.toString().padStart(2, "0")}:00`}
                                            >
                                                {`${hour.toString().padStart(2, "0")}:00`}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            <div className="flex-1 flex-col space-y-2">
                <label>Guests</label>
                <Input
                    type="number"
                    placeholder="Add guest number"
                    min={1}
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                />
            </div>

            <Button className="mt-2 md:mt-8" onClick={handleFilterRoom}>
                Search
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
    );
}
