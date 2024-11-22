"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

import { useSidebar } from "@/stores/admin/store-sidebar";
import { useUserAccount } from "@/stores/user-account/store-user-account";

import { StaffTabs } from "@/features/admin/staffs/staff-tabs";
import { StaffsTable } from "@/features/admin/staffs/staffs-table";

export default function StaffPage() {
    const { setFocusState } = useSidebar();
    const { userAccount } = useUserAccount();
    useEffect(() => {
        setFocusState("Staff");
    }, [setFocusState]);

    useEffect(() => {
        if (userAccount?.role !== "Admin") {
            redirect("/admin/dashboard");
        }
    }, []);
    return (
        <div className="bg-white p-4">
            <StaffTabs />
        </div>
    );
}
