"use client";

import Autocomplete from "@mui/material/Autocomplete";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import { DateTimeRangePicker } from "@mui/x-date-pickers-pro/DateTimeRangePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LicenseInfo } from "@mui/x-license";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

LicenseInfo.setLicenseKey(
    "e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y",
);

const Hero = () => {
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [roomType, setRoomType] = useState("Single");
    const [guestCount, setGuestCount] = useState();
    const [sliderValue, setSliderValue] = useState(500);
    const router = useRouter();

    // const handleCheckAvailability = () => {
    //   router.push(
    //     `/search?checkIn=${checkIn}&checkOut=${checkOut}&roomType=${roomType}`
    //   );
    // };

    // const valuetext = (value: number) => {
    //   return ${value}€;
    // };

    // const marks = [
    //   { value: 0, label: "0€" },
    //   { value: 250, label: "250€" },
    //   { value: 500, label: "500€" },
    //   { value: 750, label: "750€" },
    //   { value: 1000, label: "1000€" },
    // ];

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
                <div className="mx-5 mt-10">
                    <div className="flex flex-row items-start gap-6 rounded-xl bg-white px-32 py-10">
                        <div className="flex flex-col">
                            <label className="text-lg font-bold">
                                Check-in and Check-out date
                            </label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                    components={["DateTimeRangePicker"]}
                                >
                                    <DateTimeRangePicker
                                        localeText={{
                                            start: "Check-in",
                                            end: "Check-out",
                                        }}
                                        className="h-full w-full"
                                        sx={{
                                            ".MuiFormControl-root": {},
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-lg font-bold">
                                Room Types
                            </label>
                            <Autocomplete
                                options={[
                                    {
                                        label: "The Shawshank Redemption",
                                        year: 1994,
                                    },
                                    { label: "The Godfather", year: 1972 },
                                ]}
                                sx={{ width: 210, height: 500 }}
                                className="mt-2 h-12"
                                renderInput={(params) => (
                                    <TextField {...params} label="Type rooms" />
                                )}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-lg font-bold">Guests</label>
                            <TextField
                                label="Guest"
                                value={guestCount}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    if (value === "" || Number(value) >= 0) {
                                        setGuestCount(value);
                                    }
                                }}
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(
                                        /[^0-9]/g,
                                        "",
                                    );
                                }}
                                type="number"
                                variant="outlined"
                                sx={{ width: "210px" }}
                                className="h-12"
                                InputProps={{
                                    sx: {
                                        height: "57px",
                                        padding: "20px",
                                        marginTop: "8px",
                                        display: "flex",
                                        alignItems: "center",
                                    },
                                }}
                                InputLabelProps={{
                                    sx: {
                                        display: "flex",
                                        justifyContent: "center",
                                        paddingTop: "9px",
                                    },
                                }}
                            />
                        </div>
                        <div className="mt-9 flex items-center">
                            <button className="rounded-lg bg-[#d9af63] px-8 py-4 text-white transition-colors duration-300 hover:bg-[#c89d55]">
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
