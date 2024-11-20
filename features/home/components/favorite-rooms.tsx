"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FavoriteRoomItem } from "./favorite-room-item";
import RestClient from "@/features/room/utils/api-function";


export const FavoriteRooms = () => {
  const [favoriteRooms, setFavoriteRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteRooms = async () => {
      try {
        const client = new RestClient();
        const response = await client.service("type-rooms/top-rated").find();
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
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">Loading favorite rooms...</p>
      </div>
    );
  }


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
        {favoriteRooms.length > 0 &&  favoriteRooms.map((item) => (
          <FavoriteRoomItem
            key={item.typeRoomId}
            id={item.typeRoomId}
            URL={item.images?.[0] || "/default-image.jpg"}
            title={item.typename}
            price={item.price?.dailyRate || "N/A"}
            description={item.description || "No description available"}
            rating={item.averageScore}
            totalRatings={item.totalRatings}
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
