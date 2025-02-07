import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Star,
} from "lucide-react";

export default function RoomItem({ room }) {
  return (
    <div className="px-24 mb-5">
      <div className="flex flex-col md:flex-row justify-between items-start border rounded-lg shadow-sm overflow-hidden">
        <div className="w-full md:w-1/3">
          <Link href={`/room/${room._id}`}>
            <Image
              src={room.images?.[0] || "/image2.jpg"}
              width={450}
              height={280}
              alt={room.description || "Room Image"}
              className="w-full h-auto object-cover cursor-pointer"
            />
          </Link>
        </div>

        <div className="md:w-2/3 p-6 flex flex-col md:flex-row justify-between">
          <div className="md:w-2/3">
            <Link href={`/room/${room._id}`}>
              <h2 className="text-2xl font-bold mb-2 cursor-pointer">
                {room.typename || "Room Type"}
              </h2>
            </Link>
            <p className="text-gray-600 text-base mb-4">{room.description}</p>
            <div className="flex items-center space-x-1 text-green-500 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4"
                  fill={
                    i < Math.round(room.rating?.averageScore || 0)
                      ? "currentColor"
                      : "none"
                  }
                />
              ))}
              <span className="text-gray-700 ml-2">
                {room.rating?.averageScore
                  ? `${room.rating.averageScore}/5`
                  : "No Rating"}
              </span>
              <span className="text-gray-500 ml-1">
                ({room.rating?.totalRating || 0} reviews)
              </span>
            </div>
          </div>
          <div className="h-44 border-r border-gray-300 mx-4 mt-2"></div>{" "}
          <div className="md:w-1/3 mt-4 flex flex-col items-center justify-center h-full">
            <div className="flex">
              <div className="mb-10 text-center">
                <span className="text-lg font-semibold text-gray-400">
                  {room.price?.dailyRate.toLocaleString() || "N/A"} VND
                </span>
                <span className="block text-gray-500 text-xs">PER NIGHT</span>
              </div>
              <div className="h-16 border-r border-gray-300 mx-4"></div>
              <div className="mb-10 text-center">
                <span className="text-lg font-semibold text-gray-400">
                  {room.price?.hourlyRate.toLocaleString() || "N/A"} VND
                </span>
                <span className="block text-gray-500 text-xs">PER HOUR</span>
              </div>
            </div>
            <Link
              href={`/room/${room._id}`}
              className="text-blue-500 font-bold flex items-center text-center"
            >
              MORE DETAILS
              <span className="flex items-center justify-center bg-blue-500 rounded-2xl ml-2 p-1">
                <ChevronRight className="h-4 w-4 text-white" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
