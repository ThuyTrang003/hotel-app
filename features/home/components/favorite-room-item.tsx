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
        <div className="group h-full overflow-hidden rounded-xl border border-gray-200 shadow-lg transition-shadow hover:shadow-xl">
            <Link href={`/room/${id}`} className="relative block">
                <Image
                    src={URL}
                    height={366}
                    width={640}
                    alt={title}
                    className="h-48 w-full rounded-t-xl object-cover"
                />
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 transform rounded-full bg-black bg-opacity-80 px-6 py-2 text-sm font-semibold text-white transition-colors group-hover:bg-[#FF813F]">
                    {price.toLocaleString()} VND / night
                </span>
            </Link>

            {/* Nội dung */}
            <div className="bg-white p-6">
                <h3 className="text-lg font-semibold capitalize text-gray-800">
                    {title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                    {description}
                </p>

                <div className="mt-4 flex items-center justify-between">
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
