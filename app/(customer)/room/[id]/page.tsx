"use client";
import CarouselImage from '@/features/room/components/carousel-image';
import RoomInfo from '@/features/room/components/room-info';
import { useParams } from 'next/navigation';


export default function RoomDetail() {
  const { id } = useParams(); // Lấy id từ URL params
  
  return (
    <div className="">
      <CarouselImage/>
      <RoomInfo roomId={id}/>
    </div>
  );
}
