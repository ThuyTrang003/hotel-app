"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import RoomItem from "./room-item";

export default function ContentSearch() {
  const searchParams = useSearchParams();

  const queryCheckIn = searchParams.get("checkIn");
  const queryCheckOut = searchParams.get("checkOut");
  const queryRoomType = searchParams.get("roomType");

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomType, setRoomType] = useState("");
  const [guestCount, setGuestCount] = useState();
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    if (queryCheckIn) setCheckIn(queryCheckIn);
    if (queryCheckOut) setCheckOut(queryCheckOut);
    if (queryRoomType) setRoomType(queryRoomType);
  }, [queryCheckIn, queryCheckOut, queryRoomType]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const marks = Array.from({ length: 6 }, (_, i) => ({
    value: i * 200,
    label: i * 200 === 0 ? "0" : `${i * 200}`,
  }));

  return (
    <div className="flex flex-col md:flex-row justify-between px-20 py-20">
      <div className="md:w-1/4 mb-6 md:mb-0 p-5 bg-white">
        <h3 className="text-2xl font-semibold mb-4">Booking Details</h3>

        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700">
            Check In
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker label="Check in" />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700">
            Check Out
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker label="Check out" />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700">
            Room Type
          </label>
          <Autocomplete
            options={[
              { label: "The Shawshank Redemption", year: 1994 },
              { label: "The Godfather", year: 1972 },
            ]}
            sx={{ width: 290, height: 500 }}
            className="h-12 mt-2"
            renderInput={(params) => (
              <TextField {...params} label="Type rooms" />
            )}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700">
            Guests
          </label>
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
            sx={{ width: "290px" }}
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
        <div className="mt-8">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Price
          </label>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="on"
            min={0}
            max={1000}
            step={1}
            marks={marks}
            sx={{
              color: "#d9af63",
              "& .MuiSlider-valueLabel": {
                backgroundColor: "#d9af63",
                color: "white",
                fontSize: "0.75rem", // Kích thước chữ nhỏ lại
                padding: "2px 5px", // Padding nhỏ hơn
                borderRadius: "4px",
              },
              "& .MuiSlider-thumb": {
                width: 14,
                height: 14,
              },
              mt:2,
            }}
          />
        </div>
      </div>

      <div className="md:w-3/4 py-3 ml-2">
        <div className="mb-4 flex justify-end items-center">
          <label className="block text-sm font-medium text-gray-700 mr-4">
            Sort by
          </label>
          <select className="border rounded-md px-3 py-2">
            <option value="default">Default</option>
            <option value="price">Lowest Price</option>
            <option value="rating">Highest Price</option>
          </select>
        </div>
        <RoomItem
          checkIn={checkIn}
          checkOut={checkOut}
          roomType={roomType}
          guest={guestCount}
        />
        <RoomItem
          checkIn={checkIn}
          checkOut={checkOut}
          roomType={roomType}
          guest={guestCount}
        />
        <RoomItem
          checkIn={checkIn}
          checkOut={checkOut}
          roomType={roomType}
          guest={guestCount}
        />
        <RoomItem
          checkIn={checkIn}
          checkOut={checkOut}
          roomType={roomType}
          guest={guestCount}
        />
      </div>
    </div>
  );
}
