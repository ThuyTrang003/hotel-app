"use client";

import { useEffect } from "react";

import { useSidebar } from "@/stores/admin/store-sidebar";

import { BookingTabs } from "@/features/admin/bookings/booking-tabs";

export default function BookingsPage() {
    const { setFocusState } = useSidebar();
    useEffect(() => {
        setFocusState("Bookings");
    }, [setFocusState]);
    return (
        <div className="bg-white p-4">
            <BookingTabs />
        </div>
    );
}
