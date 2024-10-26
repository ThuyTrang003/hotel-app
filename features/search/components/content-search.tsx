"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import RoomItem from "./room-item";

export default function ContentSearch() {
  const searchParams = useSearchParams();

  const queryCheckIn = searchParams.get("checkIn");
  const queryCheckOut = searchParams.get("checkOut");
  const queryRoomType = searchParams.get("roomType");

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomType, setRoomType] = useState("");

  useEffect(() => {
    if (queryCheckIn) setCheckIn(queryCheckIn);
    if (queryCheckOut) setCheckOut(queryCheckOut);
    if (queryRoomType) setRoomType(queryRoomType);
  }, [queryCheckIn, queryCheckOut, queryRoomType]);

  return (
    <div className="flex flex-col md:flex-row justify-between px-20 py-20">
      <div className="md:w-1/4 mb-6 md:mb-0 p-5 bg-white">
        <h3 className="text-2xl font-semibold mb-4">Booking Details</h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Check In
          </label>
          <div className="flex items-center mt-1">
            <input
              type="date"
              name="checkIn"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="border rounded-md px-3 py-2 w-full"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Check Out
          </label>
          <div className="flex items-center mt-1">
            <input
              type="date"
              name="checkOut"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="border rounded-md px-3 py-2 w-full"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Room Type
          </label>
          <input
            type="text"
            name="roomType"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="border rounded-md px-3 py-2 w-full"
          />
        </div>
      </div>

      <div className="md:w-3/4 py-3">
        <div className="mb-4 flex justify-end items-center">
          <label className="block text-sm font-medium text-gray-700 mr-4">
            Sort by
          </label>
          <select className="border rounded-md px-3 py-2">
            <option value="default">Default</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        <RoomItem checkIn={checkIn} checkOut={checkOut} />
      </div>
    </div>
  );
}
