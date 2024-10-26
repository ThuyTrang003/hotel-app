import { FavoriteRoomItem } from "./favorite-room-item";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const FAVORITEROOMS = [
    {
        id: "1",
        title: "Single Room",
        price: "2400",
        URL: "/image1.jpg",
        description: "Đẹp lắm",
    },
    {
        id: "2",
        title: "Single Room",
        price: "2400",
        URL: "/image1.jpg",
        description: "Đẹp lắm",
    },
];

export const FavoriteRooms = () => {
    return (
        <section className="bg-slate-10 xl:py-18 bg-gray-1 py-10">
            <div className="mx-4 text-center">
                <h1 className="text-2xl font-medium text-gray-700">
                    OUR FAVORITE ROOMS
                </h1>
                <p className="mt-2 text-lg text-gray-400">
                    Check out now our best rooms
                </p>
            </div>
            <div className="mx-25 grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {FAVORITEROOMS.map((item) => (
                    <FavoriteRoomItem
                        key={item.id}
                        id={item.id}
                        URL={item.URL}
                        title={item.title}
                        price={item.price}
                        description={item.description}
                    />
                ))}
            </div>
            <div className="flex justify-center py-4 text-left">
                <Link
                    href="/room"
                    className="inline-block rounded-md bg-amber-1 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-amber-1/80"
                >
                    View All Rooms
                    <ChevronRight className="ml-2 inline-block h-4 w-4" />
                </Link>
            </div>
        </section>
    );
};
