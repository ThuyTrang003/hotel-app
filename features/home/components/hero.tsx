"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimeRangePicker } from "@mui/x-date-pickers-pro/DateTimeRangePicker";
import { LicenseInfo } from "@mui/x-license";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Slider from "@mui/material/Slider";

LicenseInfo.setLicenseKey(
  "e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y"
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
      className=" w-full h-auto relative flexCenter min-h-screen"
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
        <div className="mt-10 mx-5">
          <div className="flex flex-row gap-6 items-start py-10 px-32 bg-white rounded-xl">
            <div className="flex flex-col">
              <label className="text-lg font-bold">
                Check-in and Check-out date
              </label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimeRangePicker"]}>
                  <DateTimeRangePicker
                    localeText={{ start: "Check-in", end: "Check-out" }}
                    className="w-full h-full"
                    sx={{
                      ".MuiFormControl-root": {},
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-bold">Room Types</label>
              <Autocomplete
                options={[
                  { label: "The Shawshank Redemption", year: 1994 },
                  { label: "The Godfather", year: 1972 },
                ]}
                sx={{ width: 210, height: 500 }}
                className="h-12 mt-2"
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
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
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
                    paddingTop:"9px"
                  },
                }}
              />
            </div>
            <div className="flex items-center mt-9">
              <button className="bg-[#d9af63] text-white px-8 py-4 rounded-lg hover:bg-[#c89d55] transition-colors duration-300">
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
