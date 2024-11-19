"use client";

import { useEffect } from "react";

import { useSidebar } from "@/stores/admin/store-sidebar";

import { PromotionsTable } from "@/features/admin/promotions/promotions-table";

export default function PromotionsPage() {
    const { setFocusState } = useSidebar();
    useEffect(() => {
        setFocusState("Promotions");
    }, [setFocusState]);
    return (
        <div className="bg-white p-4">
            <PromotionsTable />
        </div>
    );
}
