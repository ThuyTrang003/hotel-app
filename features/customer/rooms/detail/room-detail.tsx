"use client";

import { RoomGallery } from "./room-gallery";
import { RoomGallerySkeleton } from "./room-gallery-skeleton";
import { Bed, ChevronRight, Heart, Moon, Star, Users } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { useGetTypeRoomById } from "@/hooks/rooms-hook/useTypeRooms";

import { moneyFormatter } from "@/utils/money-formatter";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function RoomDetail() {
    const [isWishlist, setIsWishlist] = useState(false);
    const { id } = useParams();
    const { data: typeRoomData, isPending, isSuccess } = useGetTypeRoomById(id);
    return (
        <div className="py-8">
            <div className="grid gap-8 md:grid-cols-2">
                {typeRoomData && <RoomGallery images={typeRoomData.images} />}
                {isPending && <RoomGallerySkeleton />}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold">
                            {typeRoomData?.typename}
                        </h1>
                        {/* <p className="text-muted-foreground">
                            {hotel.location}
                        </p> */}
                        <div className="mt-2 flex items-center gap-4">
                            <div className="flex items-center">
                                <Star className="h-5 w-5 fill-yellow-400 stroke-yellow-400 text-primary" />
                                <span className="ml-1 font-medium">
                                    {typeRoomData?.rating.averageScore}
                                </span>
                                <span className="ml-1 text-muted-foreground">
                                    ({typeRoomData?.rating.totalRating} reviews)
                                </span>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-foreground"
                                onClick={() => setIsWishlist(!isWishlist)}
                            >
                                <Heart
                                    className={cn(
                                        "mr-2 h-5 w-5",
                                        isWishlist &&
                                            "fill-red-500 stroke-red-500",
                                    )}
                                />
                                Add to wishlist
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-4 rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Moon className="h-5 w-5 text-primary" />
                                <span className="font-medium">
                                    Price per night
                                </span>
                            </div>
                            <span className="text-2xl font-bold">
                                {moneyFormatter(typeRoomData?.price)}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-primary" />
                                <span className="font-medium">
                                    Max Occupancy
                                </span>
                            </div>
                            <span>{typeRoomData?.limit}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Bed className="h-5 w-5 text-primary" />
                                <span className="font-medium">Room Type</span>
                            </div>
                            <span>Deluxe Ocean View</span>
                        </div>
                    </div>

                    <p className="whitespace-pre-line">
                        {typeRoomData?.description}
                    </p>

                    <div className="grid gap-4">
                        <Button size="lg" className="w-full">
                            Book Now
                        </Button>
                        <Button variant="outline" size="lg" className="w-full">
                            Check Availability
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
