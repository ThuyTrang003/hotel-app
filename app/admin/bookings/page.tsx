"use client";

import { useEffect, useState } from "react";

import { useSidebar } from "@/stores/admin/store-sidebar";

import { WeekCalendar } from "@/components/week-calendar";

export default function BookingsPage() {
    const { setFocusState } = useSidebar();
    useEffect(() => {
        setFocusState("Bookings");
    }, [setFocusState]);
    const [weekStart, setWeekStart] = useState("");
    const [weekEnd, setWeekEnd] = useState("");
    console.log(weekStart, weekEnd);
    return (
        <div className="bg-white p-4">
            <div className="flex">
                <WeekCalendar
                    setWeekStart={setWeekStart}
                    setWeekEnd={setWeekEnd}
                />
            </div>
        </div>
    );
}
