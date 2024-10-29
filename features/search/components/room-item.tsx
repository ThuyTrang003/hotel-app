import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Martini,
  Wifi,
  Utensils,
  Coffee,
  Baby,
  Smartphone,
  Bath,
  Tv
} from "lucide-react";

export default function RoomItem({ checkIn, checkOut }) {
  const focusBookingDates = () => {
    if (!checkIn) {
      const checkInInput = document.querySelector('input[name="checkIn"]');
      if (checkInInput) checkInInput.focus();
    } else if (!checkOut) {
      const checkOutInput = document.querySelector('input[name="checkOut"]');
      if (checkOutInput) checkOutInput.focus();
    }
  };

  const isBookingAvailable = checkIn && checkOut;

  return (
    <div className="mb-5 py-5">
      <div className="flex flex-col md:flex-row justify-between items-start border rounded-lg shadow-sm overflow-hidden">
        <div className="w-full md:w-1/3">
          <Link href="/room/1">
            <Image
              src="/image2.jpg"
              width={450}
              height={280}
              alt="Deluxe Room"
              className="w-full h-auto object-cover cursor-pointer"
            />
          </Link>
        </div>

        <div className="md:w-2/3 flex flex-col md:flex-row justify-between">
          <div className="md:w-2/3 p-6">
            <Link href="/room/1">
              <h2 className="text-2xl font-bold mb-2 cursor-pointer">
                Deluxe Room
              </h2>
            </Link>
            <p className="text-gray-600 text-base mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
              nonummy nibh euismod.
            </p>
            <div className="flex flex-wrap space-x-4">
              <span className="p-2 border rounded">
                <Martini className="h-6 w-6 text-gray-600" />
              </span>
              <span className="p-2 border rounded">
                <Bath className="h-6 w-6 text-gray-600" />
              </span>
              <span className="p-2 border rounded">
                <Wifi className="h-6 w-6 text-gray-600" />
              </span>
              <span className="p-2 border rounded">
                <Utensils className="h-6 w-6 text-gray-600" />
              </span>
              <span className="p-2 border rounded">
                <Coffee className="h-6 w-6 text-gray-600" />
              </span>
              <span className="p-2 border rounded">
                <Baby className="h-6 w-6 text-gray-600" />
              </span>
            </div>
          </div>

          <div className="md:w-1/3 mt-4 flex flex-col items-center justify-center h-full">
            <div className="mb-10 text-center">
              <span className="text-4xl font-semibold text-gray-400">€199</span>
              <span className="block text-gray-500 text-xs">PER NIGHT</span>
            </div>

            {isBookingAvailable ? (
              <Link
                href="/booking"
                className="text-white bg-[#DEB666] font-bold flex items-center text-center py-3 px-5"
              >
                BOOK ROOM
              </Link>
            ) : (
              <button
                onClick={focusBookingDates}
                className="text-gray-500 bg-gray-100 cursor-pointer font-semibold flex items-center justify-center text-center py-3 px-3 rounded"
              >
                Select Booking Dates
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
