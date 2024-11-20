"use client";

import { FavoriteRoomItem } from "./favorite-room-item";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import RestClient from "@/features/room/utils/api-function";

export const FavoriteRooms = () => {
    const [favoriteRooms, setFavoriteRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavoriteRooms = async () => {
            try {
                const client = new RestClient();
                const response = await client
                    .service("type-rooms/top-rated")
                    .find();
                if (response?.data) {
                    setFavoriteRooms(response.data);
                } else {
                    console.error("No data received for favorite rooms.");
                }
            } catch (error) {
                console.error("Error fetching favorite rooms:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavoriteRooms();
    }, []);

    if (loading) {
        return (
            <div className="py-10 text-center">
                <p className="text-lg text-gray-500">
                    Loading favorite rooms...
                </p>
            </div>
        );
    }

    return (
        <section className="xl:py-18 bg-slate-10 bg-[#F1F0ED] py-10">
            <div className="mx-4 text-center">
                <h1 className="text-2xl font-medium text-gray-700">
                    OUR FAVORITE ROOMS
                </h1>
                <p className="mt-2 text-lg text-gray-400">
                    Check out now our best rooms
                </p>
            </div>
            <div className="mx-25 grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {favoriteRooms.length > 0 &&
                    favoriteRooms.map((item) => (
                        <FavoriteRoomItem
                            key={item.typeRoomId}
                            id={item.typeRoomId}
                            URL={item.images?.[0] || "/default-image.jpg"}
                            title={item.typename}
                            price={item.price?.dailyRate || "N/A"}
                            description={
                                item.description || "No description available"
                            }
                            rating={item.averageScore}
                            totalRatings={item.totalRatings}
                        />
                    ))}
            </div>
            <div className="flex justify-center py-4 text-left">
                <Link
                    href="/room"
                    className="inline-block rounded-md bg-[#d7b263] px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-[#caa354]"
                >
                    View All Rooms
                    <ChevronRight className="ml-2 inline-block h-4 w-4" />
                </Link>
            </div>
        </section>
    );
};
