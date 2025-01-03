"use client";

import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import { useState } from "react";
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
    const [date, setDate] = useState<DateRange | undefined>();
    return (
        <div className="flex flex-col gap-6 rounded-lg bg-white p-4 shadow-lg md:flex-row">
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
                <Input type="number" defaultValue="1" />
            </div>

            <Button className="mt-8">
                Search
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
    );
}
