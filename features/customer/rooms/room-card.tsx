"use client";

import { Heart, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { moneyFormatter } from "@/utils/money-formatter";

import { TypeRoom } from "@/features/admin/rooms/types-table/type-rooms-columns";

import { Button } from "@/components/ui/button";

interface RoomCardProps {
    typeRoom: TypeRoom;
}

export function RoomCard({ typeRoom }: RoomCardProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <div className="group relative overflow-hidden rounded-lg">
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={typeRoom.images[0]}
                    alt={typeRoom.typename}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                />
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 z-10 bg-white/70 hover:bg-white"
                    onClick={() => setIsFavorite(!isFavorite)}
                >
                    <Heart
                        className={cn(
                            "h-5 w-5",
                            isFavorite
                                ? "fill-red-500 stroke-red-500"
                                : "stroke-gray-600",
                        )}
                    />
                </Button>
            </div>
            <div className="py-4">
                <h3 className="text-lg font-semibold">{typeRoom.typename}</h3>
                <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                    <span className="font-medium">
                        {typeRoom.rating.averageScore}
                    </span>
                    <span className="text-muted-foreground">
                        ({typeRoom.rating.totalRating} reviews)
                    </span>
                </div>
                <div className="mt-2">
                    <div className="text-2xl font-bold">
                        {moneyFormatter(typeRoom.price.dailyRate)}
                    </div>
                    <div className="text-muted-foreground">
                        Hourly rate: {moneyFormatter(typeRoom.price.hourlyRate)}
                    </div>
                </div>
            </div>
        </div>
    );
}
