"use client";

import { useEffect } from "react";

import { useSidebar } from "@/stores/admin/store-sidebar";

import { PromotionTabs } from "@/features/admin/promotions/promotion-tabs";

export default function PromotionsPage() {
    const { setFocusState } = useSidebar();
    useEffect(() => {
        setFocusState("Promotions");
    }, [setFocusState]);
    return (
        <div className="bg-white p-4">
            <PromotionTabs />
        </div>
    );
}
