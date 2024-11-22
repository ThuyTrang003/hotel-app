"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useGetIsAuthorization } from "@/hooks/auth-hook/useAuth";

import { useUserAccount } from "@/stores/user-account/store-user-account";

import { FavoriteRooms } from "@/features/home/components/favorite-rooms";
import Feature from "@/features/home/components/feature-home";
import Hero from "@/features/home/components/hero";

export default function Home() {
    const { mutate: isAuthorization } = useGetIsAuthorization();
    const { resetUserAccount, setUserAccount } = useUserAccount();

    //kiểm tra trong t/h hết access token
    useEffect(() => {
        isAuthorization(undefined, {
            onSuccess: (res) => {
                setUserAccount(res.user_id, res.role);
                //UI cho user đã login
            },
            onError: () => {
                resetUserAccount();
                //UI cho user chưa login
            },
        });
    }, []);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollToTop(true);
            } else {
                setShowScrollToTop(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <main>
            <Hero />
            <Feature />
            <FavoriteRooms />
            {showScrollToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 rounded-full bg-yellow-500 p-3 text-white shadow-lg transition hover:bg-yellow-600"
                >
                    <ChevronUp className="h-6 w-6" />
                </button>
            )}
        </main>
    );
}
