"use client"; // Đảm bảo đây là Client Component

import { useRouter } from "next/navigation";
import {
  Martini,
  Wifi,
  Utensils,
  Coffee,
  Smartphone,
  Tv,
  Bath,
  WashingMachine,
  AirVent,
  UsersRound,
  CalendarDays,
  BedDouble,
  LandPlot,
  Star,
} from "lucide-react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import { useState } from "react";

export default function RoomInfo({ roomId }) {
  const router = useRouter();
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guest, setGuest] = useState("");

  const [guests, setGuests] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lưu roomId vào sessionStorage
    sessionStorage.setItem("roomId", roomId);
    localStorage.setItem("checkIn", checkin);
    localStorage.setItem("checkOut", checkout);

    // Chuyển hướng đến trang booking
    router.push("/booking");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section - Room details and Room Services */}
        <div className="lg:col-span-2">
          {/* Room Information */}
          <div className="mb-8">
            <div className="flex justify-between">
              <h1 className="text-4xl font-bold mb-4">Deluxe Room</h1>
              <p className="text-3xl font-bold">€199 / per night</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <UsersRound className="w-6 h-6" />
                <div>
                  <p className="font-semibold">Max Guests:</p>
                  <p className="text-gray-600">5 Adults / 2 Children</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarDays className="w-6 h-6" />
                <div>
                  <p className="font-semibold">Booking Nights:</p>
                  <p className="text-gray-600">3 Min.</p>
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
            <p className="text-gray-700 leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat...
            </p>
            <ul className="list-disc ml-5 text-gray-700 space-y-2">
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            </ul>
          </div>

          {/* Room Services Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Room Services</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 p-4 border rounded-md">
                <Martini className="w-6 h-6" />
                <p>Mini Bar</p>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-md">
                <Bath className="w-6 h-6" />
                <p>Sauna</p>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-md">
                <Wifi className="w-6 h-6" />
                <p>Wi-Fi</p>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-md">
                <Utensils className="w-6 h-6" />
                <p>Breakfast</p>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-md">
                <Coffee className="w-6 h-6" />
                <p>Coffee Maker</p>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-md">
                <WashingMachine className="w-6 h-6" />
                <p>Hair Dryer</p>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-md">
                <Smartphone className="w-6 h-6" />
                <p>Free-to-use Smartphone</p>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-md">
                <Tv className="w-6 h-6" />
                <p>Widescreen TV</p>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-md">
                <AirVent className="w-6 h-6" />
                <p>Air Conditioner</p>
              </div>
            </div>
          </div>

          {/* Room Reviews Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Room Reviews</h2>
            {/* New comment input */}
            <div className="border p-6 rounded-md mb-5">
              <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
              <div className="flex items-center mb-4">
                <span className="mr-2">Rating:</span>
                <div className="flex space-x-1">
                  {/* <Star className="w-6 h-6 cursor-pointer text-gray-300 hover:text-yellow-500" />
                  <Star className="w-6 h-6 cursor-pointer text-gray-300 hover:text-yellow-500" />
                  <Star className="w-6 h-6 cursor-pointer text-gray-300 hover:text-yellow-500" />
                  <Star className="w-6 h-6 cursor-pointer text-gray-300 hover:text-yellow-500" />
                  <Star className="w-6 h-6 cursor-pointer text-gray-300 hover:text-yellow-500" /> */}
                  <Stack spacing={1}>
                    <Rating
                      name="half-rating"
                      defaultValue={0}
                      precision={0.5}
                    />
                  </Stack>
                </div>
              </div>
              <textarea
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your review here..."
              ></textarea>
              <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Submit Review
              </button>
            </div>
            <div className="border p-6 rounded-md mb-4">
              <div className="flex items-start space-x-4 mb-5">
                <Image
                  src="/images/image1.jpg"
                  alt="Reviewer Avatar"
                  className="w-16 h-16 rounded-full object-cover"
                  width={50}
                  height={50}
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <Stack spacing={1}>
                        <Rating
                          name="half-rating-read"
                          defaultValue={2.5}
                          precision={0.5}
                          readOnly
                        />
                      </Stack>
                    </div>
                  </div>
                  <p className="font-semibold text-lg">
                    Felecia Lawson
                  </p>
                  <p className="text-gray-600">
                    Everything was absolutely great, staff were excellent and
                    helpful. Room was spacious and clean. Breakfast was great.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Image
                  src="/images/image1.jpg"
                  alt="Reviewer Avatar"
                  className="w-16 h-16 rounded-full object-cover"
                  width={50}
                  height={50}
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <Stack spacing={1}>
                        <Rating
                          name="half-rating-read"
                          defaultValue={2.5}
                          precision={0.5}
                          readOnly
                        />
                      </Stack>
                    </div>
                  </div>
                  <p className="font-semibold text-lg">
                    Felecia Lawson
                  </p>
                  <p className="text-gray-600">
                    Everything was absolutely great, staff were excellent and
                    helpful. Room was spacious and clean. Breakfast was great.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">2 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Booking form */}
        <div className="lg:col-span-1 bg-white px-10">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Book Your Room</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div>
                <label htmlFor="checkin" className="block text-gray-600 mb-2">
                  Check In
                </label>
                <input
                  type="date"
                  id="checkin"
                  value={checkin}
                  onChange={(e) => setCheckin(e.target.value)}
                  placeholder="Check In"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="checkin" className="block text-gray-600 mb-2">
                  Check Out
                </label>
                <input
                  type="date"
                  id="checkout"
                  value={checkout}
                  onChange={(e) => setCheckout(e.target.value)}
                  placeholder="Check Out"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Guests
                </label>
                <input
                  type="number"
                  name="guest"
                  value={guest}
                  onChange={(e) => setGuest(e.target.value)}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                  className="border rounded-md px-3 py-2 w-full"
                  placeholder="Number of Guests"
                  min="1"
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-500 text-white py-2 text-center rounded-md hover:bg-yellow-400 transition duration-300"
              >
                Check Availability
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
