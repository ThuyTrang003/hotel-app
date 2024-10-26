import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FavoriteRoomItem {
    id: string;
    URL: string;
    title: string;
    price: string;
    description: string;
}
export const FavoriteRoomItem = ({
    id,
    URL,
    title,
    price,
    description,
}: FavoriteRoomItem) => {
    return (
        <div className="group overflow-hidden rounded-tl-xl rounded-tr-xl border border-slate-200">
            <Link href={`/room/${id}`} className="relative overflow-hidden">
                <Image src={URL} height={366} width={640} alt="img" />
                <span className="bold-16 group-hover:bg-amber-1 absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 rounded-full bg-black px-8 py-2 text-white">
                    $ {price}
                </span>
            </Link>
            <div className="bg-white p-4">
                <div className="medium-22 capitalize">
                    <span>{title}</span>
                </div>
                <hr className="mt-3" />
                <p className="my-3 line-clamp-3 overflow-hidden text-ellipsis">
                    {description}
                </p>
                <hr className="mb-3" />
                <div className="flex justify-between">
                    <div className="flex items-center gap-x-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <span className="medium-16">(222)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
