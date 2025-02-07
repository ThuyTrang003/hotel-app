"use client";

import { useRouter } from "next/navigation";
import {
  UsersRound,
  CalendarDays,
  BedDouble,
  LandPlot,
  Star,
} from "lucide-react";

import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useState, useEffect } from "react";
import Rating from "@/components/ui/rating";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Input } from "@/components/ui/input";

import RoomAvailability from "./room-availability";
import RestClient from "../utils/api-function";
import RoomReviews from "./room-reviews";

interface Price {
  dailyRate: number;
  hourlyRate: number;
}

interface RoomTypeData {
  _id: string;
  typename: string;
  price: {
    dailyRate: number;
    hourlyRate: number;
  };
  limit: number;
}

interface Rating {
  bookingId: {
    userId: string;
  };
  reviewerName?: string;
}

interface OverOccupancyCharge {
  excessGuests: number;
  extraCharge: number;
}

export default function RoomInfo({ roomId }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [roomCount, setRoomCount] = useState(0);
  const [totalGuests, setTotalGuests] = useState(1);
  const [overOccupancyCharges, setOverOccupancyCharges] = useState<
    OverOccupancyCharge[]
  >([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [totalPricePreview, setTotalPricePreview] = useState(0);
  const [extraChargePreview, setExtraChargePreview] = useState(0);
  const [roomType, setRoomType] = useState<RoomTypeData | null>(null);
  const [checkIn, setCheckin] = useState<Date | null>(null);
  const [checkOut, setCheckout] = useState<Date | null>(null);
  const [availableRooms, setAvailableRooms] = useState(0);

  useEffect(() => {
    const fetchOverOccupancyCharges = async () => {
      const client = new RestClient();
      client.service("over-occupancy-charges");

      try {
        const { data } = await client.find();
        setOverOccupancyCharges(data);
      } catch (error) {
        console.error("Failed to fetch over-occupancy charges:", error);
      }
    };

    fetchOverOccupancyCharges();
  }, []);

  const calculateExtraCharge = (excessGuests) => {
    const charge = overOccupancyCharges.find(
      (charge) => charge.excessGuests === excessGuests
    );
    return charge ? charge.extraCharge : 0;
  };

  useEffect(() => {
    const checkUserLogin = async () => {
      const client = new RestClient();
      try {
        const response = await client.service("auth/current-user").find({})
        console.log("RESSQQWEW", response)
        if (response) {
          
          const userData = await response.data;
          console.log("USERDAAAAA",userData)
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


  const handleBooking = () => {
    if (!isUserLoggedIn) {
      router.push("/signin");
      return;
    }

    if (!checkIn || !checkOut) {
      alert("Vui lòng chọn ngày nhận phòng và ngày trả phòng");
      return;
    }

    if (!roomType) {
      alert("Dữ liệu loại phòng chưa được tải");
      return;
    }

    const charges = calculateRoomCharges();
    if (!charges) return;

    const { extraCharge, totalPrice } = charges;

    const roomDetails = [
      {
        roomId: roomType._id,
        typeRoom: roomType.typename,
        roomCount,
        adults: totalGuests,
        price: roomType.price,
        extraCharge,
        totalPrice,
      },
    ];

    const queryString = new URLSearchParams({
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      roomDetails: JSON.stringify(roomDetails),
    }).toString();

    router.push(`/booking?${queryString}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleBooking();
  };

  const handleRoomCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setRoomCount(count);
  };

  const handleGuestChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10));
    setTotalGuests(value);
  };

  useEffect(() => {
    const fetchRoomType = async () => {
      setLoading(true);
      try {
        const restClient = new RestClient();
        restClient.service("type-rooms");
        const roomTypeData = await restClient.get(roomId);

        if (roomTypeData) {
          setRoomType(roomTypeData);
          console.log("Room Type Data", roomTypeData);
        }
      } catch (error) {
        console.error("Error fetching room type:", error);
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      fetchRoomType();
      console.log("ROOMTYPE", roomType);
    }
  }, [roomId]);

  const calculateRoomCharges = (): {
    extraCharge: number;
    totalPrice: number;
  } | null => {
    if (!checkIn || !checkOut) {
      alert("Vui lòng chọn cả ngày nhận phòng và ngày trả phòng");
      return null;
    }
  
    if (!roomType) {
      alert("Dữ liệu phòng chưa được tải");
      return null;
    }
  
    const diffInMs = new Date(checkOut) - new Date(checkIn);
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.ceil(
      (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
  
    const dailyRate = roomType?.price?.dailyRate || 0;
    const hourlyRate = roomType?.price?.hourlyRate || 0;
    const roomLimit = roomType.limit;
  
    const dayCost = dailyRate * diffInDays * roomCount;
    const hourCost = diffInHours > 0 ? hourlyRate * diffInHours * roomCount : 0;
  
    const excessGuests = Math.max(totalGuests - roomLimit * roomCount, 0);
    const extraCharge = calculateExtraCharge(excessGuests) * roomCount;
  
    const totalPrice = dayCost + hourCost + extraCharge;
  
    setExtraChargePreview(extraCharge);
    setTotalPricePreview(totalPrice);
  
    console.log('Calculated charges:', { extraCharge, totalPrice });
  
    return { extraCharge, totalPrice };
  };

  useEffect(() => {
    console.log('Values changed:', { checkIn, checkOut, roomCount, totalGuests, roomType });
    if (checkIn && checkOut && roomType) {
      const charges = calculateRoomCharges();
      console.log('Charges:', charges);
    }
  }, [checkIn, checkOut, roomCount, totalGuests, roomType]);
  

  useEffect(() => {
    const fetchAvailableRooms = async () => {
      const client = new RestClient();

      try {
        const response = await client.service(`type-rooms/${roomId}/availableRooms`).find({
          checkInTime: checkIn.toISOString(),
          checkOutTime: checkOut.toISOString(),
        });
        setAvailableRooms(response.data.availableRoom);
      } catch (error) {
        console.error("Failed to fetch available rooms:", error);
      }
    };

    if (checkIn && checkOut) {
      fetchAvailableRooms();
    }
  }, [checkIn, checkOut, roomId]);

  if (loading) return <p>Loading...</p>;
  if (!roomType) return <p>No room type data available</p>;
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section - Room details and Room Services */}
        <div className="lg:col-span-2">
          {/* Room Information */}
          <div className="mb-8">
            <div className="flex justify-between">
              <h1 className="text-4xl font-bold mb-4">{roomType.typename}</h1>
              <div className="flex space-x-4 mt-3">
                <p className="text-xl font-bold">
                  {roomType.price.dailyRate.toLocaleString()} VND / per night
                </p>
                <div className="h-7 border-r border-gray-300 mx-4"></div>
                <p className="text-xl font-bold">
                  {roomType.price.hourlyRate.toLocaleString()} VND / per hour
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <UsersRound className="w-6 h-6" />
                <div>
                  <p className="font-semibold">Max Guests:</p>
                  <p className="text-gray-600">{roomType.limit} Guest</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarDays className="w-6 h-6" />
                <div>
                  <p className="font-semibold">Booking Nights:</p>
                  <p className="text-gray-600">No Limit</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <BedDouble className="w-6 h-6" />
                <div>
                  <p className="font-semibold">Bed Type:</p>
                  <p className="text-gray-600">Twins Bed</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <LandPlot className="w-6 h-6" />
                <div>
                  <p className="font-semibold">Area:</p>
                  <p className="text-gray-600">80 m²</p>
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Room Description</h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              {roomType.description}
            </p>
          </div>
          {/* Room Services Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-6">Room Availability</h2>
            <RoomAvailability typeId={roomType._id} />
          </div>
          {/* Room Reviews Section */}
          <div className="mt-12">
            <RoomReviews roomId={roomType._id} />
          </div>
        </div>

        {/* Right Section - Booking form */}
        <div className="lg:col-span-1 bg-white px-10">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Book Your Room</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div>
                <label className="block text-gray-600 mb-2">Check In</label>
                <DateTimePicker
                  label="Select Check In Date"
                  value={checkIn}
                  onChange={(newValue) => setCheckin(newValue)}
                  renderInput={(params) => (
                    <input
                      {...params}
                      className="w-full p-2 border rounded-md"
                    />
                  )}
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Check Out</label>
                <DateTimePicker
                  label="Select Check Out Date"
                  value={checkOut}
                  onChange={(newValue) => setCheckout(newValue)}
                  renderInput={(params) => (
                    <input
                      {...params}
                      className="w-full p-2 border rounded-md"
                    />
                  )}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Number of Rooms
                </label>
                {availableRooms > 0 ? (
                  <select
                    value={roomCount}
                    onChange={handleRoomCountChange}
                    className="border rounded-md px-3 py-2 w-[280px]"
                  >
                    {Array.from(
                      { length: availableRooms + 1 },
                      (_, index) => index
                    ).map((count) => (
                      <option key={count} value={count}>
                        {count}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-red-500">
                    No rooms available for the selected dates.
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Total Guests</label>
                <Input
                  value={totalGuests}
                  onChange={handleGuestChange}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                  type="number"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Total Price Details
                </h3>

                <div className="flex justify-between mb-2">
                  <p className="text-gray-600">Total Days:</p>
                  <strong className="text-gray-900">
                    {Math.floor(
                      (new Date(checkOut) - new Date(checkIn)) /
                        (1000 * 60 * 60 * 24)
                    )}
                  </strong>
                </div>

                <div className="flex justify-between mb-2">
                  <p className="text-gray-600">Additional Charge:</p>
                  <strong className="text-red-500">
                    {extraChargePreview.toLocaleString()} VND
                  </strong>
                </div>

                <div className="flex justify-between">
                  <p className="text-gray-600 text-base">
                    Estimated Total Price:
                  </p>
                  <strong className="text-green-600">
                    {totalPricePreview.toLocaleString()} VND
                  </strong>
                </div>
              </div>

              <button
                type="submit"
                disabled={totalPricePreview <= 0}
                className={`py-4 text-center rounded-md transition duration-300 text-white ${
                  totalPricePreview > 0
                    ? "bg-yellow-500 hover:bg-yellow-400"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Book Room
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
