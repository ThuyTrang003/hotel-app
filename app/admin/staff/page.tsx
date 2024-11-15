"use client";

import { useEffect } from "react";

import { useSidebar } from "@/stores/admin/store-sidebar";

import { StaffsTable } from "@/features/admin/staffs/staffs-table";

export default function StaffPage() {
    const { setFocusState } = useSidebar();
    useEffect(() => {
        setFocusState("Staff");
    }, [setFocusState]);
    return (
        <div className="bg-white p-4">
            <StaffsTable />
        </div>
    );
}
