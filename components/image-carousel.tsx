import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

interface ImageCarouselProps {
    images: string[];
}
export function ImageCarousel({ images }: ImageCarouselProps) {
    return (
        <Carousel className="w-full">
            <CarouselContent>
                {images.map((src, index) => (
                    <CarouselItem key={index}>
                        <div className="relative flex justify-center">
                            <Image
                                src={src}
                                alt={`Image ${index + 1}`}
                                className="h-24 w-24 object-cover"
                                width={100}
                                height={100}
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full">
                <ChevronLeft className="h-4 w-4" />
            </CarouselPrevious>
            <CarouselNext className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full">
                <ChevronRight className="h-4 w-4" />
            </CarouselNext>
        </Carousel>
    );
}
