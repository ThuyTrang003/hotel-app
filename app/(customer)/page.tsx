"use client";

import { useEffect } from "react";
import { toast } from "sonner";

import { useGetIsAuthorization } from "@/hooks/auth-hook/useAuth";

import { useUserAccount } from "@/stores/user-account/store-user-account";

import { FavoriteRooms } from "@/features/home/components/favorite-rooms";
import Feature from "@/features/home/components/feature-home";
import Hero from "@/features/home/components/hero";

export default function Home() {
    const { mutate: isAuthorization } = useGetIsAuthorization();
    const { resetUserAccount } = useUserAccount();

    //kiểm tra trong t/h hết access token
    useEffect(() => {
        isAuthorization(undefined, {
            onSuccess: () => {
                toast.success("Authorized");
                //UI cho user đã login
            },
            onError: () => {
                toast.error("Unauthorized");
                resetUserAccount();
                //UI cho user chưa login
            },
        });
    }, []);

    return (
        <main>
            <Hero />
            <Feature />
            <FavoriteRooms />
        </main>
    );
}
