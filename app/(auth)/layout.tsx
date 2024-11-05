"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useUserAccount } from "@/stores/user-account/store-user-account";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userAccount } = useUserAccount();
    const router = useRouter();
    useEffect(() => {
        if (userAccount) {
            if (userAccount !== null) {
                router.replace("/"); // Chuyển hướng nếu đã login
            }
        }
    }, [userAccount]);

    return (
        <main className="flex h-screen w-screen justify-between bg-white">
            <section className="h-screen w-1/2">{children}</section>
            <div className="m-2 w-1/2 rounded-xl bg-black"></div>
        </main>
    );
}
