import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dayjs from "dayjs";

import { Input } from "@/components/ui/input";
import DateTimeRangePicker from "@/components/ui/date-time-range-picker";

dayjs.locale("vi");

export default function SearchBooking() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const initialGuestCount = searchParams.get("guests");

  const [checkInOut, setCheckInOut] = useState({
    checkIn: checkIn ? dayjs(checkIn).toDate() : new Date(),
    checkOut: checkOut ? dayjs(checkOut).toDate() : new Date(),
  });
  const [guestCount, setGuestCount] = useState(initialGuestCount || 1);

  useEffect(() => {
    if (checkIn && checkOut) {
      setCheckInOut({
        checkIn: dayjs(checkIn).toDate(),
        checkOut: dayjs(checkOut).toDate(),
      });
    }
    if (initialGuestCount) {
      setGuestCount(initialGuestCount);
    }
  }, [checkIn, checkOut, initialGuestCount]);

  const handleCheckAvailability = () => {
    if (checkInOut.checkIn && checkInOut.checkOut) {
      const checkInDate = dayjs(checkInOut.checkIn).format("YYYY-MM-DDTHH:mm:ss");
      const checkOutDate = dayjs(checkInOut.checkOut).format("YYYY-MM-DDTHH:mm:ss");

      const url = `/search?checkIn=${encodeURIComponent(checkInDate)}&checkOut=${encodeURIComponent(checkOutDate)}&guests=${encodeURIComponent(guestCount)}`;
      router.push(url);
    }
  };

  const handleDateChange = (checkIn, checkOut) => {
    setCheckInOut({
      checkIn: checkIn || new Date(),
      checkOut: checkOut || new Date(),
    });
  };

  return (
    <div className="flex justify-center py-10 mt-14">
      <div className="flex flex-row space-x-32 items-start py-10 px-16 bg-white rounded-xl shadow-md">
        <div className="flex flex-col">
          <label className="text-lg font-bold">Check-in and Check-out date</label>
          <DateTimeRangePicker
            onChange={handleDateChange}
            value={[checkInOut.checkIn, checkInOut.checkOut]}
            className="w-full h-full mt-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-bold">Guests</label>
          <Input
            type="number"
            placeholder="Number of Guests"
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            customSize="default"
            className="w-52 mt-2 h-14"
            inputProps={{ min: 1 }}
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
  );
}
