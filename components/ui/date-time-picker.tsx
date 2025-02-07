"use client"

import * as React from "react"
import { CalendarIcon, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from "react-day-picker"
import { format, startOfDay } from "date-fns"
import { vi } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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

export interface DateTimePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  hourCycle?: 12 | 24
}

export function DateTimePicker({
  value,
  onChange,
  hourCycle = 12,
}: DateTimePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value)
  const [isOpen, setIsOpen] = React.useState(false)
  const [hours, setHours] = React.useState("12")
  const [minutes, setMinutes] = React.useState("00")
  // const [seconds, setSeconds] = React.useState("00")
  const [period, setPeriod] = React.useState<"AM" | "PM">("AM")

  React.useEffect(() => {
    if (date) {
      setHours(format(date, "hh"))
      setMinutes(format(date, "mm"))
      // setSeconds(format(date, "ss"))
      setPeriod(format(date, "a").toUpperCase() as "AM" | "PM")
    }
  }, [date])

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const newDate = new Date(selectedDate)
      let hrs = parseInt(hours)
      if (period === "PM" && hrs !== 12) hrs += 12
      if (period === "AM" && hrs === 12) hrs = 0
      newDate.setHours(hrs, parseInt(minutes))
      setDate(newDate)
      onChange?.(newDate)
    } else {
      setDate(undefined)
      onChange?.(undefined)
    }
  }

  const updateTime = (newHours: string, newMinutes: string, newPeriod: "AM" | "PM") => {
    if (date) {
      const newDate = new Date(date)
      let hrs = parseInt(newHours) || 0
      if (newPeriod === "PM" && hrs !== 12) hrs += 12
      if (newPeriod === "AM" && hrs === 12) hrs = 0
      newDate.setHours(hrs, parseInt(newMinutes) || 0)
      setDate(newDate)
      onChange?.(newDate)
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy HH:mm a", { locale: vi }) : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-2 space-y-4">
          <DayPicker
            mode="single"
            selected={date}
            onSelect={handleSelect}
            showOutsideDays
            className="items-center justify-center ml-6"
            disabled={{ before: startOfDay(new Date()) }}
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-between pt-1 relative items-center px-2",
              caption_label: "text-sm font-medium items-center text-center ml-14",
              nav: "space-x-1 flex items-center",
              nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] text-center",
              row: "flex w-full mt-2",
              cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: cn(
                "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-muted hover:rounded-md"
              ),
              day_selected:
                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
              day_outside: "text-muted-foreground opacity-50",
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle:
                "aria-selected:bg-accent aria-selected:text-accent-foreground",
              day_hidden: "invisible",
            }}
            components={{
              IconLeft: () => <ChevronLeft className="h-4 w-4" />,
              IconRight: () => <ChevronRight className="h-4 w-4" />,
            }}
            locale={vi}
          />
          <div className="flex items-center justify-center gap-2 border rounded-md p-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={hours}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 2)
                  const newHours = val === '' ? '12' : val
                  setHours(newHours)
                  updateTime(newHours, minutes, period)
                }}
                className="w-12 border rounded-md px-2 py-1 text-center"
                placeholder="12"
              />
              <span className="text-muted-foreground">:</span>
              <input
                type="text"
                value={minutes}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 2)
                  const newMinutes = val.padStart(2, '0')
                  setMinutes(newMinutes)
                  updateTime(hours, newMinutes, period)
                }}
                className="w-12 border rounded-md px-2 py-1 text-center"
                placeholder="00"
              />
              <Select value={period} onValueChange={(val: "AM" | "PM") => {
                setPeriod(val)
                updateTime(hours, minutes, val)
              }}>
                <SelectTrigger className="w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}