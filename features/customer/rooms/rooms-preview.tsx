"use client";

import { RoomCard } from "./room-card";
import { RoomCardSkeleton } from "./room-card-skeleton";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useGetAllTypeRooms } from "@/hooks/rooms-hook/useTypeRooms";

import { TypeRoom } from "@/features/admin/rooms/types-table/type-rooms-columns";

import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export function RoomsPreview() {
    const router = useRouter();

    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);

    const {
        data: allTypeRoomsData,
        isSuccess,
        isError,
        error,
        isPending,
    } = useGetAllTypeRooms({ size: pageSize, page: pageNumber });
    if (isError) {
        console.log(error);
    }

    return (
        <section className="px-10 py-12">
            <div className="flex items-center justify-between pb-4">
                <h2 className="text-2xl font-semibold tracking-tight">
                    All rooms
                </h2>
                <Button
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => router.push("/rooms")}
                >
                    See All
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="mx-10"
            >
                <CarouselContent className="w-full">
                    {isPending
                        ? Array.from({ length: 4 }).map((_, index) => (
                              <CarouselItem
                                  key={index}
                                  className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                              >
                                  <RoomCardSkeleton />
                              </CarouselItem>
                          ))
                        : allTypeRoomsData?.data.map(
                              (typeRoomsData: TypeRoom) => (
                                  <CarouselItem
                                      key={typeRoomsData._id}
                                      className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                                  >
                                      <RoomCard typeRoom={typeRoomsData} />
                                  </CarouselItem>
                              ),
                          )}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    );
}
