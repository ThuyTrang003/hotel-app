import Image from "next/image";
import Link from "next/link";
import {
  Martini,
  Wifi,
  Utensils,
  Coffee,
  Baby,
  Smartphone,
  Tv,
  Bath,
  ChevronRight,
} from "lucide-react";

export default function RoomItem() {
  return (
    <div className="px-24 mb-5">
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

        <div className="md:w-2/3 p-6 flex flex-col md:flex-row justify-between">
          <div className="md:w-2/3">
            <Link href="/room/1">
              <h2 className="text-2xl font-bold mb-2 cursor-pointer">
                Deluxe Room
              </h2>
            </Link>
            <p className="text-gray-600 text-base mb-4">Description of Room</p>
            <div className="flex flex-wrap space-x-4 mb-4">
              <span className="p-2 border rounded">
                <Martini className="h-6 w-6 text-gray-600" />
              </span>
              <span className="p-2 border rounded">
                <Bath className="h-6 w-6 text-gray-600" />
              </span>
              <span className="p-2 border rounded">
                <Wifi className="h-6 w-6 text-gray-600" />
              </span>
              <span className="p-2 border rounded">
                <Utensils className="h-6 w-6 text-gray-600" />
              </span>
              <span className="p-2 border rounded">
                <Coffee className="h-6 w-6 text-gray-600" />
              </span>
              <span className="p-2 border rounded">
                <Baby className="h-6 w-6 text-gray-600" />
              </span>
              <span className="p-2 border rounded">
                <Smartphone className="h-6 w-6 text-gray-600" />
              </span>
              <span className="p-2 border rounded">
                <Tv className="h-6 w-6 text-gray-600" />
              </span>
            </div>
          </div>

          <div className="md:w-1/3 mt-4 flex flex-col items-center justify-center h-full">
            <div className="mb-10 text-center">
              <span className="text-4xl font-semibold text-gray-400">€199</span>
              <span className="block text-gray-500 text-xs">PER NIGHT</span>
            </div>
            <Link
              href="/room/1"
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
