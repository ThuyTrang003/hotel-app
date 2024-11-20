import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Coffee, User, Plus, Star } from "lucide-react";
import { Input } from "@/components/ui/input";


interface RoomData {
  _id: string;
  typename: string;
  description: string;
  rating: {
    averageScore: number;
    totalRating: number;
  };
  price: {
    dailyRate?: number;
    hourlyRate?: number;
  };
  limit: number;
  availableRoom: number;
}

interface RoomItemProps {
  roomData: RoomData;
  checkIn: string;
  checkOut: string;
  roomType: string;
  updateBookingSummary: (bookingDetails: BookingSummary) => void;
}

interface BookingSummary {
  roomId: string;
  typeRoom: string;
  roomCount: number;
  numberOfGuestAllowed: number;
  adults: number;
  price: {
    dailyRate: number;
    hourlyRate: number;
  };
}


const RoomItem: React.FC<RoomItemProps> = ({
  roomData,
  checkIn,
  checkOut,
  roomType,
  updateBookingSummary,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [roomCount, setRoomCount] = useState(0);
  const [totalGuests, setTotalGuests] = useState(1);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  console.log("ROOOMMMDATa",roomData);
  const handleRoomCountChange = (newRoomCount) => {
    setRoomCount(newRoomCount);
    updateBookingSummary({
      roomId: roomData._id,
      typeRoom: roomData.typename,
      roomCount: newRoomCount,
      numberOfGuestAllowed:roomData.limit*newRoomCount,
      adults: totalGuests,
      price: {
        dailyRate: roomData.price?.dailyRate ?? 100,
        hourlyRate: roomData.price?.hourlyRate ?? 50,
      },
    });
  };

  const handleTotalGuestsChange = (value) => {
    const newValue = Number(value);
    if (newValue >= 1 || value === "") {
      setTotalGuests(newValue);
      updateBookingSummary({
        roomId: roomData._id,
        typeRoom: roomData.typename,
        roomCount: roomCount,
        numberOfGuestAllowed:roomData.limit*roomCount,
        adults: newValue,
        price: {
          dailyRate: roomData.price?.dailyRate ?? 100,
          hourlyRate: roomData.price?.hourlyRate ?? 50,
        },
      });
    }
  };

  const resetRoomSelection = () => {
    setRoomCount(0);
    setTotalGuests(1);
  };

  return (
    <div className="mb-5">
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
          <div className="md:w-2/3 p-4">
            <Link href={`/room/${roomData._id}`}>
              <h2 className="text-2xl font-bold mb-2 cursor-pointer">
                {roomData.typename || "Room"}
              </h2>
            </Link>
            <p className="text-gray-600 text-base mb-4 truncate">
              {roomData.description || "No description available."}
            </p>
            <div className="flex items-center space-x-1 text-green-500 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4"
                  fill={
                    i < Math.round(roomData.rating?.averageScore || 0)
                      ? "currentColor"
                      : "none"
                  }
                />
              ))}
              <span className="text-gray-700 ml-2">
                {roomData.rating?.averageScore
                  ? `${roomData.rating.averageScore}/5`
                  : "No Rating"}
              </span>
              <span className="text-gray-500 ml-1">
                ({roomData.rating?.totalRating || 0} reviews)
              </span>
            </div>
          </div>

          <div className="md:w-1/3 mt-4 flex flex-col items-center justify-center h-full">
            <div className="flex space-x-3">
              <div className="mb-10 text-center">
                <span className="block text-yellow-600 text-sm font-bold">
                  {roomData.price?.dailyRate
                    ? `${roomData.price.dailyRate.toLocaleString()} VNĐ`
                    : "Price not available"}
                </span>
                <span className="text-gray-500 text-xs">PER NIGHT</span>
              </div>
              <div className="mb-10 text-center">
                <span className="block text-yellow-600 text-sm font-bold">
                  {roomData.price?.hourlyRate
                    ? `${roomData.price.hourlyRate.toLocaleString()} VNĐ`
                    : "Price not available"}
                </span>
                <span className="text-gray-500 text-xs">PER HOUR</span>
              </div>
            </div>
            <button
              onClick={toggleDropdown}
              className="text-white bg-yellow-300 cursor-pointer font-semibold flex items-center justify-center text-center py-2 px-3 rounded"
            >
              Select Room
            </button>
          </div>
        </div>
      </div>

      {isDropdownOpen && (
        <div className="border-t mt-3 p-4 bg-gray-100 rounded-lg shadow-md">
          <div className="flex flex-row items-center justify-center space-x-16">
            <div>
              <div className="mb-4 flex items-center space-x-2">
                <Coffee className="text-gray-600" />
                <p className="text-gray-700">Đã bao gồm ăn sáng</p>
              </div>
              <div className="mb-4 flex items-center space-x-2">
                <Users className="text-gray-600" />
                <p className="text-gray-700">
                  Không hoàn trả phí khi hủy phòng
                </p>
              </div>
            </div>
            <div className="mb-4 flex flex-col items-center space-x-2">
              <p className="flex flex-row ml-2 mb-1">
                <User />
                <User />
                <Plus />
              </p>
              <span className="text-lg font-bold text-gray-800">
                {roomData.limit || "N/A"} Người
              </span>
            </div>

            <div className="flex flex-col">
              <Input
                type="number"
                placeholder="Total Guests"
                value={totalGuests}
                onChange={(e) => handleTotalGuestsChange(e.target.value)}
                className="border rounded-md px-3 py-3 mb-3"
              />
            </div>
            <div>
              <select
                value={roomCount}
                onChange={(e) => handleRoomCountChange(Number(e.target.value))}
                className="border rounded-md px-3 py-3 mb-3"
              >
                {Array.from(
                  { length: roomData.availableRoom + 1 },
                  (_, num) => (
                    <option key={num} value={num}>
                      {num} Room{num !== 1 ? "s" : ""}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomItem;

