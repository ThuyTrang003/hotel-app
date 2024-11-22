"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { useGetIsAuthorization } from "@/hooks/auth-hook/useAuth";

import { useUserAccount } from "@/stores/user-account/store-user-account";

import { Navbar } from "@/features/admin/layout/navbar";
import { SidebarAdmin } from "@/features/admin/layout/sidebar";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { userAccount } = useUserAccount();
    const router = useRouter();

    const { resetUserAccount, setUserAccount } = useUserAccount();
    const { mutate: isAuthorization } = useGetIsAuthorization();
    //kiểm tra cho t/h hết token
    useEffect(() => {
        isAuthorization(undefined, {
            onSuccess: (res) => {
                setUserAccount(res.user_id, res.role);
            },
            onError: () => {
                resetUserAccount();
                router.replace("/signin");
            },
        });
    }, []);
    useEffect(() => {
        console.log("run useEffect layout admin");
        if (userAccount) {
            if (
                userAccount?.role !== "Admin" &&
                userAccount?.role !== "Staff"
            ) {
                router.replace("/"); // Chuyển hướng nếu không phải admin
            }
        }
    }, [userAccount, router]);
    console.log(userAccount);
    return (
        <SidebarProvider>
            <SidebarAdmin />
            <div className="flex max-h-screen flex-grow flex-col">
                <div className="flex min-h-16 items-center border-b">
                    <SidebarTrigger />
                    <Navbar />
                </div>
                <main
                    className={cn(
                        "flex-grow bg-gray-1 p-4 transition-[margin-left] duration-300 ease-in-out",
                    )}
                >
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}
