"use client"

import * as React from "react"
import { format, set, startOfToday, parse } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { vi } from "date-fns/locale"
import { useRef, useEffect } from "react";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DateTimeRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  onChange?: (checkIn: Date | null, checkOut: Date | null) => void
  value?: [Date | null, Date | null]
}

export default function DateTimeRangePicker({
  className,
  onChange,
  value,
}: DateTimeRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(
    value ? { from: value[0] ?? undefined, to: value[1] ?? undefined } : undefined
  )
  const [startTime, setStartTime] = React.useState(value && value[0] ? format(value[0], "hh:mm") : "12:00")
  const [endTime, setEndTime] = React.useState(value && value[1] ? format(value[1], "hh:mm") : "12:00")
  const [startPeriod, setStartPeriod] = React.useState<"AM" | "PM">(
    value && value[0] ? (format(value[0], "a") === "PM" ? "PM" : "AM") : "AM"
  )
  const [endPeriod, setEndPeriod] = React.useState<"AM" | "PM">(
    value && value[1] ? (format(value[1], "a") === "PM" ? "PM" : "AM") : "AM"
  )
  const [isStartOpen, setIsStartOpen] = React.useState(false)
  const [isEndOpen, setIsEndOpen] = React.useState(false)
  const startCalendarRef = useRef<HTMLDivElement>(null);
  const endCalendarRef = useRef<HTMLDivElement>(null);

  const handleSelect = (range: DateRange | undefined) => {
    setDate(range)
    updateParent(range, startTime, startPeriod, endTime, endPeriod)
  }

  const formatTime = (time: string, period: "AM" | "PM") => {
    const [hours, minutes] = time.split(":").map(Number)
    let adjustedHours = hours
    if (period === "PM" && hours !== 12) adjustedHours += 12
    if (period === "AM" && hours === 12) adjustedHours = 0
    return `${adjustedHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
  }

  const updateParent = (
    range: DateRange | undefined,
    startTime: string,
    startPeriod: "AM" | "PM",
    endTime: string,
    endPeriod: "AM" | "PM"
  ) => {
    if (range?.from) {
      const checkIn = set(range.from, {
        hours: parseInt(formatTime(startTime, startPeriod).split(":")[0]),
        minutes: parseInt(formatTime(startTime, startPeriod).split(":")[1]),
        seconds: 0,
      })
      const checkOut = range.to
        ? set(range.to, {
            hours: parseInt(formatTime(endTime, endPeriod).split(":")[0]),
            minutes: parseInt(formatTime(endTime, endPeriod).split(":")[1]),
            seconds: 0,
          })
        : null
      if (typeof onChange === 'function') {
        onChange(checkIn, checkOut)
      }
    } else if (typeof onChange === 'function') {
      onChange(null, null)
    }
  }

  useEffect(() => {
    updateParent(date, startTime, startPeriod, endTime, endPeriod)
  }, [startTime, startPeriod, endTime, endPeriod])

  const disabledDays = { before: startOfToday() }

  useEffect(() => {
    if (startCalendarRef.current && isStartOpen) {
      startCalendarRef.current.focus();
    }
    if (endCalendarRef.current && isEndOpen) {
      endCalendarRef.current.focus();
    }
  }, [isStartOpen, isEndOpen]);

  return (
    <div className={cn("grid gap-2", className)}>
      <div className="flex items-center gap-2">
        <div className="grid gap-1">
          <Popover open={isStartOpen} onOpenChange={setIsStartOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] h-14 justify-start text-left font-normal",
                  !date?.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  format(date.from, "dd/MM/yyyy") + " " + startTime + " " + startPeriod
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="p-4">
                <Calendar
                  ref={startCalendarRef}
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={handleSelect}
                  numberOfMonths={2}
                  locale={vi}
                  disabled={disabledDays}
                  className="border-0"
                />
                <div className="flex items-center space-x-2 mt-4">
                  <input
                    type="text"
                    value={startTime.split(':')[0]}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 2)
                      if (parseInt(val) > 12) return
                      setStartTime(`${val.padStart(2, '0')}:${startTime.split(':')[1]}`)
                    }}
                    className="w-16 border rounded-md px-2 py-1 text-center"
                    placeholder="12"
                  />
                  <span className="text-muted-foreground">:</span>
                  <input
                    type="text"
                    value={startTime.split(':')[1]}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 2)
                      if (parseInt(val) > 59) return
                      setStartTime(`${startTime.split(':')[0]}:${val.padStart(2, '0')}`)
                    }}
                    className="w-16 border rounded-md px-2 py-1 text-center"
                    placeholder="00"
                  />
                  <Select value={startPeriod} onValueChange={(value: "AM" | "PM") => setStartPeriod(value)}>
                    <SelectTrigger className="w-[70px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  className="w-full mt-4" 
                  onClick={() => setIsStartOpen(false)}
                >
                  OK
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <span className="text-muted-foreground mt-2">-</span>

        <div className="grid gap-1">
          <Popover open={isEndOpen} onOpenChange={setIsEndOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] h-14 justify-start text-left font-normal",
                  !date?.to && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.to ? (
                  format(date.to, "dd/MM/yyyy") + " " + endTime + " " + endPeriod
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="p-4">
                <Calendar
                  ref={endCalendarRef}
                  mode="range"
                  defaultMonth={date?.to}
                  selected={date}
                  onSelect={handleSelect}
                  numberOfMonths={2}
                  locale={vi}
                  disabled={disabledDays}
                  className="border-0"
                />
                <div className="flex items-center space-x-2 mt-4">
                  <input
                    type="text"
                    value={endTime.split(':')[0]}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 2)
                      if (parseInt(val) > 12) return
                      setEndTime(`${val.padStart(2, '0')}:${endTime.split(':')[1]}`)
                    }}
                    className="w-16 border rounded-md px-2 py-1 text-center"
                    placeholder="12"
                  />
                  <span className="text-muted-foreground">:</span>
                  <input
                    type="text"
                    value={endTime.split(':')[1]}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 2)
                      if (parseInt(val) > 59) return
                      setEndTime(`${endTime.split(':')[0]}:${val.padStart(2, '0')}`)
                    }}
                    className="w-16 border rounded-md px-2 py-1 text-center"
                    placeholder="00"
                  />
                  <Select value={endPeriod} onValueChange={(value: "AM" | "PM") => setEndPeriod(value)}>
                    <SelectTrigger className="w-[70px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  className="w-full mt-4" 
                  onClick={() => setIsEndOpen(false)}
                >
                  OK
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}