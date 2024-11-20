import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FavoriteRoomItem {
  id: string;
  URL: string;
  title: string;
  price: string;
  description: string;
  rating: number;
  totalRatings: number;
}

export const FavoriteRoomItem = ({
  id,
  URL,
  title,
  price,
  description,
  rating,
  totalRatings,
}: FavoriteRoomItem) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow group h-full">
      <Link href={`/room/${id}`} className="relative block">
        <Image
          src={URL}
          height={366}
          width={640}
          alt={title}
          className="rounded-t-xl object-cover h-48 w-full"
        />
        <span
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-80 px-6 py-2 rounded-full 
          font-semibold text-sm group-hover:bg-[#FF813F] transition-colors"
        >
          {price.toLocaleString()} VND / night
        </span>
      </Link>

      {/* Nội dung */}
      <div className="p-6 bg-white">
        <h3 className="text-lg font-semibold text-gray-800 capitalize">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{description}</p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">
              {rating.toFixed(1)} / 5
            </span>
          </div>
          <span className="text-sm text-gray-500">
            ({totalRatings} đánh giá)
          </span>
        </div>
      </div>
    </div>
  );
};
