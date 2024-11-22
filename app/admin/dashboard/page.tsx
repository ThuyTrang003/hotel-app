"use client";

import { useEffect } from "react";

import { useSidebar } from "@/stores/admin/store-sidebar";

export default function Page() {
    const { setFocusState } = useSidebar();
    useEffect(() => {
        setFocusState("Dashboard");
    }, []);

    return <div></div>;
}
