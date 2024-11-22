"use client";

import { useEffect } from "react";

import { useSidebar } from "@/stores/admin/store-sidebar";

import { Payment } from "@/features/admin/payment";

export default function Page() {
    const { setFocusState } = useSidebar();
    useEffect(() => {
        setFocusState("Dashboard");
    }, []);

    return (
        <div className="bg-white p-8">
            <Payment />
        </div>
    );
}
