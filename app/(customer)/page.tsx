"use client";

import { ChevronUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useUserAccount } from "@/stores/user-account/store-user-account";

import { PromotionPreview } from "@/features/customer/promotions/promotions-preview";
import { RoomsPreview } from "@/features/customer/rooms/preview/rooms-preview";
import { SearchForm } from "@/features/customer/search/search-form";
import { FavoriteRooms } from "@/features/home/components/favorite-rooms";
import Feature from "@/features/home/components/feature-home";
import Hero from "@/features/home/components/hero";

export default function Home() {
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
        <div>
            <div className="relative">
                <div className="absolute bottom-28 left-6 right-6 px-10">
                    <h1 className="mb-8 text-4xl font-medium text-white md:text-6xl">
                        Find Your Best Staycation
                    </h1>
                    <SearchForm />
                </div>
                <Image
                    src="/room2.jpg"
                    width={5000}
                    height={5000}
                    alt="homeImage"
                    className="h-screen w-full"
                    priority
                />
            </div>
            <RoomsPreview />
            <PromotionPreview />
            {/* <Hero />
            <Feature />
            <FavoriteRooms />
            {showScrollToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 rounded-full bg-yellow-500 p-3 text-white shadow-lg transition hover:bg-yellow-600"
                >
                    <ChevronUp className="h-6 w-6" />
                </button>
            )} */}
        </div>
    );
}
