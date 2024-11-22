"use client";

import { useEffect } from "react";

import { useSidebar } from "@/stores/admin/store-sidebar";

import { RoomsTable } from "@/features/admin/rooms/rooms-table";
import { RoomsTabs } from "@/features/admin/rooms/rooms-tabs";

export default function RoomsPage() {
    const { setFocusState } = useSidebar();
    useEffect(() => {
        setFocusState("Rooms");
    }, []);
    return (
        <div className="bg-white p-4">
            <RoomsTabs />
        </div>
    );
}
