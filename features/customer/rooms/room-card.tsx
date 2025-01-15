"use client";

import { Heart, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { moneyFormatter } from "@/utils/money-formatter";

import { TypeRoom } from "@/features/admin/rooms/types-table/type-rooms-columns";

import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

interface RoomCardProps {
    typeRoom: TypeRoom;
}

export function RoomCard({ typeRoom }: RoomCardProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <div className="group relative overflow-hidden rounded-lg">
            <div className="relative aspect-[4/3] overflow-hidden">
                <Carousel className="w-full">
                    <CarouselContent>
                        {typeRoom.images.map((image, index) => (
                            <CarouselItem key={index}>
                                <div className="relative aspect-[4/3]">
                                    <Image
                                        src={image}
                                        alt={`Image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                </Carousel>
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
