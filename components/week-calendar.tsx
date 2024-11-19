"use client";

import { endOfWeek, format, startOfWeek } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface WeekCalendarProps {
    setWeekStart(weekStart: string): void;
    setWeekEnd(weekEnd: string): void;
}
export function WeekCalendar({ setWeekStart, setWeekEnd }: WeekCalendarProps) {
    const [date, setDate] = useState<Date>();

    const getWeekStartAndEnd = (selectedDate: Date) => {
        const startOfSelectedWeek = startOfWeek(selectedDate, {
            weekStartsOn: 1,
        }); // Bắt đầu từ thứ Hai
        const endOfSelectedWeek = endOfWeek(selectedDate, { weekStartsOn: 1 }); // Kết thúc vào Chủ Nhật
        return {
            weekStart: format(startOfSelectedWeek, "dd-MM-yyyy", {
                locale: vi,
            }),
            weekEnd: format(endOfSelectedWeek, "dd-MM-yyyy", { locale: vi }),
        };
    };
    useEffect(() => {
        if (date) {
            const { weekStart, weekEnd } = getWeekStartAndEnd(date);
            setWeekStart(weekStart);
            setWeekEnd(weekEnd);
        }
    }, [date]);
    return (
        <div className="flex flex-col items-center space-y-4">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground",
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? (
                            format(date, "dd-MM-yyyy", { locale: vi })
                        ) : (
                            <span>Select day</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        locale={vi}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
