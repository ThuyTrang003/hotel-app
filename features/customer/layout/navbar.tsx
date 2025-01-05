"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { useGetIsAuthorization } from "@/hooks/auth-hook/useAuth";

import { useUserAccount } from "@/stores/user-account/store-user-account";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";

export function Navbar() {
    const router = useRouter();
    const { mutate: isAuthorization } = useGetIsAuthorization();
    const { resetUserAccount, setUserAccount, userAccount } = useUserAccount();
    const hasRun = useRef(false);
    //kiểm tra cho t/h hết token
    useEffect(() => {
        if (hasRun.current) return; //run 1 lần useEffect này
        console.log("reload navbar");
        isAuthorization(undefined, {
            onSuccess: (res) => {
                setUserAccount(res.user_id, res.role);
            },
            onError: () => {
                resetUserAccount();
            },
        });

        hasRun.current = true;
    }, []);
    return (
        // <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between bg-white px-4">
            <div className="flex items-center space-x-8">
                <Link href="/" className="text-xl font-bold">
                    <Image
                        src="/logo.svg"
                        width={100}
                        height={100}
                        alt="logo"
                        className="h-6 w-auto"
                    />
                </Link>
                <nav className="hidden items-center space-x-6 md:flex">
                    <Link
                        href="/rooms"
                        className="text-lg text-muted-foreground hover:font-semibold hover:text-black"
                    >
                        Rooms
                    </Link>
                    <Link
                        href="/promotions"
                        className="text-lg text-muted-foreground hover:font-semibold hover:text-black"
                    >
                        Promotions
                    </Link>
                </nav>
            </div>
            {userAccount &&
                (userAccount.id !== "" ? (
                    <UserAvatar imageUrl={"/default-image.png"} />
                ) : (
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            onClick={() => router.push("/signin")}
                        >
                            Sign In
                        </Button>
                        <Button onClick={() => router.push("/signup")}>
                            Sign Up
                        </Button>
                    </div>
                ))}
        </div>
        // </header>
    );
}
