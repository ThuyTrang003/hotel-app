import Link from "next/link";
import React from "react";
import { ChevronRight } from "lucide-react";
import { FavoriteRoomItem } from "./favorite-room-item";
import Link from "next/link";
import React from "react";
import { ChevronRight } from "lucide-react";
import { FavoriteRoomItem } from "./favorite-room-item";

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
    <section className="py-10 xl:py-18 bg-slate-10 bg-[#F1F0ED]">
      <div className="text-center mx-4">
        <h1 className="text-2xl font-medium text-gray-700">
          OUR FAVORITE ROOMS
        </h1>
        <p className="text-lg text-gray-400 mt-2">
          Check out now our best rooms
        </p>
      </div>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 py-12 mx-25">
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
      <div className="text-left flex justify-center py-4">
        <Link
          href="/room"
          className="inline-block px-6 py-3 text-white font-semibold bg-[#d7b263] rounded-md shadow-md hover:bg-[#caa354] transition-colors"
        >
          View All Rooms
          <ChevronRight className="w-4 h-4 ml-2 inline-block" />
        </Link>
      </div>
    </section>
  );
};
