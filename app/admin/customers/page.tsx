"use client";

import { useEffect } from "react";

import { useSidebar } from "@/stores/admin/store-sidebar";

import { CustomersTable } from "@/features/admin/customers/customers-table";

export default function CustomersPage() {
    const { setFocusState } = useSidebar();
    useEffect(() => {
        setFocusState("Customers");
    }, [setFocusState]);
    return (
        <div className="bg-white p-4">
            <CustomersTable />
        </div>
    );
}
