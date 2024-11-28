"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

import { useSidebar } from "@/stores/admin/store-sidebar";
import { useUserAccount } from "@/stores/user-account/store-user-account";

import { StaffTabs } from "@/features/admin/staffs/staff-tabs";

export default function StaffPage() {
    const { setFocusState } = useSidebar();
    const { userAccount } = useUserAccount();
    useEffect(() => {
        setFocusState("Staff");
    }, [setFocusState]);

    useEffect(() => {
        if (userAccount && userAccount?.role !== "Admin") {
            redirect("/admin/dashboard");
        }
    }, [userAccount]);
    return (
        <div className="bg-white p-4">
            <StaffTabs />
        </div>
    );
}
