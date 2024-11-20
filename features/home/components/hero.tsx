"use client";

import TextField from "@mui/material/TextField";
import { LicenseInfo } from "@mui/x-license";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Import Vietnamese locale or your preferred locale
import DateTimeRangePicker from "@/components/ui/date-time-range-picker";
import { Input } from "@/components/ui/input";

// Set the Day.js locale globally to 'vi' for DD/MM/YYYY format
dayjs.locale("vi");

LicenseInfo.setLicenseKey(
    "e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y",
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
                    "YYYY-MM-DDTHH:mm:ss",
                )}&checkOut=${dayjs(checkOut).format(
                    "YYYY-MM-DDTHH:mm:ss",
                )}&guests=${guestCount}`,
            );
        }
    };

    return (
        <section
            className="flexCenter relative h-auto min-h-screen w-full"
            id="home"
        >
            <div className="absolute bottom-0 top-0 z-10 h-full w-full bg-[#2f6a7f2f]"></div>

            <video
                src="/videos/video.mp4"
                muted
                autoPlay
                loop
                className="absolute bottom-0 top-0 z-0 h-full w-full object-cover"
            ></video>
            <div className="absolute z-30 m-auto flex h-max w-full flex-col justify-center gap-y-3 pb-12 pt-28 lg:pb-24 lg:pt-64">
                <div className="px-0 py-8 text-center text-white">
                    <h1 className="mb-4 text-5xl font-bold">
                        Welcome to Our Website
                    </h1>
                    <p className="text-2xl">
                        Discover amazing content with us!
                    </p>
                </div>
                <div className="mx-auto mt-10">
                    <div className="flex flex-row items-start space-x-10 rounded-xl bg-white px-32 py-10">
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
                                    e.target.value = e.target.value.replace(
                                        /[^0-9]/g,
                                        "",
                                    );
                                }}
                                customSize="default"
                                className="mt-2 h-14 w-52"
                            />
                        </div>

                        <div className="mt-9 flex items-center">
                            <button
                                onClick={handleCheckAvailability}
                                className="rounded-lg bg-[#d9af63] px-9 py-4 text-white transition-colors duration-300 hover:bg-[#c89d55]"
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
