"use client";

import { useParams } from "next/navigation";

import CarouselImage from "@/features/room/components/carousel-image";
import RoomInfo from "@/features/room/components/room-info";

export default function RoomDetail() {
    const { id } = useParams();

    return (
        <div className="">
            <CarouselImage roomId={id} />
            <RoomInfo roomId={id} />
        </div>
    );
}
