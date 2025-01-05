"use client";

import { ArrowRight, Calendar } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export function SearchForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const guestsValue = searchParams.get("guests");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const [guests, setGuests] = useState<string | undefined>();
    const [date, setDate] = useState<DateRange | undefined>();

    useEffect(() => {
        if (startDate && endDate) {
            setDate({
                from: new Date(startDate),
                to: new Date(endDate),
            });
        } else setDate(undefined);
        if (guestsValue) setGuests(guestsValue);
        else setGuests(undefined);
    }, [startDate, endDate]);

    const handleFilterRoom = () => {
        if (date?.from && date?.to) {
            console.log("Filter");
            if (guests) {
                console.log(guests);
                router.push(
                    `/rooms?startDate=${date.from.toISOString()}&endDate=${date.to.toISOString()}&guests=${guests}`,
                );
            } else {
                router.push(
                    `/rooms?startDate=${date.from.toISOString()}&endDate=${date.to.toISOString()}`,
                );
            }
        }
    };
    return (
        <div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-lg md:flex-row md:gap-6">
            <div className="flex-1 flex-col space-y-2">
                <label>Check-in and Check-out Date</label>
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
                                        {date.from.toDateString()} -{" "}
                                        {date.to.toDateString()}
                                    </>
                                ) : (
                                    date.from.toDateString()
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
