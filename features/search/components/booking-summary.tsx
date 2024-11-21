/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
import { useRouter } from "next/navigation";
import { Plus, Minus } from "lucide-react";
import dayjs from "dayjs";
import RestClient from "@/features/room/utils/api-function";

interface BookingSummaryProps {
  checkIn: string | null;
  checkOut: string | null;
  roomCount: number;
  adults: any;
  availableRooms: never[];
  updatedData: any;
}

export default function BookingSummary({
  checkIn,
  checkOut,
  roomCount,
  adults,
  availableRooms,
  updatedData,
}: BookingSummaryProps) {
  const router = useRouter();
  const [showRooms, setShowRooms] = useState(false);
  const [roomsData, setRoomsData] = useState(updatedData);
  const [overOccupancyCharges, setOverOccupancyCharges] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const daysDifference = dayjs(checkOut).diff(dayjs(checkIn), "day");
  const hoursDifference = dayjs(checkOut).diff(dayjs(checkIn), "hour");
  const totalHoursDifference = dayjs(checkOut).diff(dayjs(checkIn), "hour");
  const remainingHours = totalHoursDifference - daysDifference * 24;

  const toggleShowRooms = () => setShowRooms(!showRooms);

  useEffect(() => {
    setRoomsData(updatedData);
  }, [updatedData]);

  useEffect(() => {
    const fetchOverOccupancyCharges = async () => {
      const client = new RestClient();
      try {
        const response = await client.service("over-occupancy-charges").find({})
        setOverOccupancyCharges(response.data);
      } catch (error) {
        console.error("Failed to fetch over-occupancy charges:", error);
      }
    };

    fetchOverOccupancyCharges();
  }, []);

  useEffect(() => {
    const checkUserLogin = async () => {
      const client = new RestClient();
      try {
        const response = await client.service("auth/current-user").find({})
        if (response) {
          const userData = await response.json();
          if (userData?.user_id) {
            setIsUserLoggedIn(true);
          } else {
            setIsUserLoggedIn(false);
          }
        } else {
          setIsUserLoggedIn(false);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setIsUserLoggedIn(false);
      }
    };

    checkUserLogin();
  }, []);

  const handleRoomCancel = (index: any) => {
    const updatedRooms = roomsData.filter((_: any, i: any) => i !== index);
    setRoomsData(updatedRooms);
  };

  const calculateExtraCharge = (excessGuests: number) => {
    const charge = overOccupancyCharges.find(
      (charge) => charge.excessGuests === excessGuests
    );
    return charge ? charge.extraCharge : 0;
  };

  const calculateTotalCost = () => {
    return roomsData.reduce((total: number, room: { price: { dailyRate: any; hourlyRate: any; }; roomCount: number; adults: number; numberOfGuestAllowed: number; }) => {
      const totalDays = Math.floor(daysDifference);
      const remainingHours = hoursDifference - totalDays * 24;
      const dayCost = (room.price.dailyRate || 0) * totalDays * room.roomCount;
      const hourCost =
        remainingHours > 0
          ? (room.price.hourlyRate || 0) * remainingHours * room.roomCount
          : 0;

      const excessGuests = Math.max(room.adults - room.numberOfGuestAllowed, 0);
      const extraCharge = calculateExtraCharge(excessGuests) * room.roomCount;

      return total + dayCost + hourCost + extraCharge;
    }, 0);
  };

  const handleBooking = () => {
    if (!isUserLoggedIn) {
      router.push("/login");
      return;
    }
    const roomDetails = roomsData.map((room: { adults: number; numberOfGuestAllowed: number; roomId: any; typeRoom: any; roomCount: any; price: any; }) => {
      const excessGuests = Math.max(room.adults - room.numberOfGuestAllowed, 0);
      const extraCharge = calculateExtraCharge(excessGuests);

      return {
        roomId: room.roomId,
        typeRoom: room.typeRoom,
        roomCount: room.roomCount,
        adults: room.adults,
        price: room.price,
        extraCharge: extraCharge,
      };
    });

    const queryString = new URLSearchParams({
      checkIn,
      checkOut,
      roomDetails: JSON.stringify(roomDetails),
    }).toString();

    router.push(`/booking?${queryString}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm space-y-4 sticky top-20 h-fit overflow-y-auto">
      <h2 className="text-lg font-bold text-gray-800">Booking Information</h2>
      <hr className="border-gray-300" />

      <div>
        <p className="text-gray-700 font-semibold">Hotel Zante</p>
        <p className="text-gray-500">
          {dayjs(checkIn).format("DD/MM/YYYY HH:mm")} -{" "}
          {dayjs(checkOut).format("DD/MM/YYYY HH:mm")} ({daysDifference} days
          {remainingHours > 0 ? `, ${remainingHours} hours` : ""})
        </p>
      </div>

      <hr className="border-gray-300" />

      <div className="flex justify-between items-center">
        <p className="text-gray-800 font-semibold">Room Information</p>
        {roomsData.length > 0 && (
          <button
            onClick={toggleShowRooms}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            {showRooms ? <Minus /> : <Plus />}
          </button>
        )}
      </div>

      {showRooms &&
        roomsData.map((room: { adults: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined; numberOfGuestAllowed: number; typeRoom: any; roomCount: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; price: { dailyRate: { toLocaleString: () => any; }; hourlyRate: { toLocaleString: () => any; }; }; }, index: Key | null | undefined) => {
          const excessGuests = Math.max(
            room.adults - room.numberOfGuestAllowed,
            0
          );
          const extraCharge = calculateExtraCharge(excessGuests);

          return (
            <div key={index} className="mt-2">
              <p className="text-gray-600">
                Room: {room.typeRoom || "Unknown Type"}
              </p>
              <p className="text-gray-600">Number of Rooms: {room.roomCount}</p>
              <p className="text-gray-600">Number of Guests: {room.adults}</p>
              <p className="text-gray-600">
                Extra Charge:{" "}
                {excessGuests > 0
                  ? `${extraCharge.toLocaleString()} VND`
                  : "0"}
              </p>
              <div className="flex justify-between items-center mt-2">
                <div className="flex space-x-2">
                  <p className="text-gray-700 font-semibold">
                    {room.price.dailyRate
                      ? `${room.price.dailyRate.toLocaleString()} VND/night`
                      : "Price not available"}
                  </p>
                  <p className="text-gray-700 font-semibold">
                    {room.price.hourlyRate
                      ? `${room.price.hourlyRate.toLocaleString()} VND/hour`
                      : "Price not available"}
                  </p>
                </div>
                <button
                  onClick={() => handleRoomCancel(index)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  Cancel
                </button>
              </div>
              {index < roomsData.length - 1 && (
                <hr className="border-gray-300 my-3" />
              )}
            </div>
          );
        })}

      <hr className="border-gray-300" />

      <div className="flex justify-between items-center">
        <p className="text-gray-800 font-bold">Total</p>
        <p className="text-yellow-600 font-bold">
          {calculateTotalCost().toLocaleString()} VND
        </p>
      </div>

      <button
        onClick={handleBooking}
        disabled={calculateTotalCost() <= 0}
        className={`w-full py-3 rounded-lg text-white transition-colors duration-300 ${
          calculateTotalCost() > 0
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        BOOK NOW
      </button>
    </div>
  );
}
