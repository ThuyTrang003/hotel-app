"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LicenseInfo } from "@mui/x-license";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Import Vietnamese locale or your preferred locale
import DateTimeRangePicker from "@/components/ui/date-time-range-picker";
import {Input} from "@/components/ui/input";

// Set the Day.js locale globally to 'vi' for DD/MM/YYYY format
dayjs.locale("vi");

LicenseInfo.setLicenseKey(
  "e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y"
);

const Hero = () => {
  const [checkInOut, setCheckInOut] = useState({
    checkIn: new Date(),
    checkOut: new Date(),
  });
  const [guestCount, setGuestCount] = useState(1);
  const router = useRouter();

  const handleDateTimeChange = (checkIn, checkOut) => {
    setCheckInOut({ checkIn, checkOut });
  };

  const handleCheckAvailability = () => {
    const { checkIn, checkOut } = checkInOut;
    if (checkIn && checkOut && guestCount) {
      router.push(
        `/search?checkIn=${dayjs(checkIn).format(
          "YYYY-MM-DDTHH:mm:ss"
        )}&checkOut=${dayjs(checkOut).format(
          "YYYY-MM-DDTHH:mm:ss"
        )}&guests=${guestCount}`
      );
    }
  };

  return (
    <section
      className="w-full h-auto relative flexCenter min-h-screen"
      id="home"
    >
      <div className="absolute h-full w-full bg-[#2f6a7f2f] top-0 bottom-0 z-10"></div>

      <video
        src="/videos/video.mp4"
        muted
        autoPlay
        loop
        className="absolute top-0 bottom-0 h-full w-full object-cover z-0"
      ></video>
      <div className="absolute w-full h-max pt-28 pb-12 flex gap-y-3 flex-col justify-center m-auto z-30 lg:pt-64 lg:pb-24">
        <div className="px-0 py-8 text-white text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Our Website</h1>
          <p className="text-2xl">Discover amazing content with us!</p>
        </div>
        <div className="mt-10 mx-auto">
          <div className="flex flex-row space-x-10 items-start py-10 px-32 bg-white rounded-xl">
            <div className="flex flex-col">
              <label className="text-lg font-bold">
                Check-in and Check-out date
              </label>
              <DateTimeRangePicker
                className="mt-2"
                checkIn={checkInOut.checkIn}
                checkOut={checkInOut.checkOut}
                onChange={handleDateTimeChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-bold">Guests</label>
              <Input
                type="number"
                placeholder="Guest"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
                customSize="default"
                className="w-52 mt-2 h-14"
              />
            </div>

            <div className="flex items-center mt-9">
              <button
                onClick={handleCheckAvailability}
                className="bg-[#d9af63] text-white px-9 py-4 rounded-lg hover:bg-[#c89d55] transition-colors duration-300"
              >
                CHECK AVAILABILITY
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
