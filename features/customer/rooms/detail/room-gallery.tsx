"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

interface RoomGalleryProps {
    images: string[];
}

export function RoomGallery({ images }: RoomGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="flex flex-col space-y-4">
            <Image
                src={images[selectedImage] || "/placeholder.svg"}
                alt="Hotel image"
                width={2000}
                height={2000}
                className="h-auto w-full rounded-lg object-cover"
                priority
            />

            {/* Thumbnails Carousel */}
            <div className="relative px-12">
                <Carousel orientation="horizontal">
                    <CarouselContent className="w-full">
                        {images.map((src, index) => (
                            <CarouselItem
                                key={index}
                                className="pt-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
                            >
                                <button
                                    onClick={() => setSelectedImage(index)}
                                    className={cn(
                                        "h-28 w-28 overflow-hidden rounded-lg border-2",
                                        selectedImage === index
                                            ? "border-primary"
                                            : "border-gray-200",
                                    )}
                                >
                                    <Image
                                        src={src}
                                        alt={`Hotel thumbnail ${index + 1}`}
                                        width={2000}
                                        height={2000}
                                        className="h-auto w-full object-cover"
                                    />
                                </button>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    );
}
