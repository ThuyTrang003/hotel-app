import Breadcrumb from "@/features/room/components/breadcrumb";
import RoomItem from "@/features/room/components/room-item";
import Image from "next/image";

export default function Room() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Breadcrumb */}
      <Breadcrumb />
      {/* Room Section */}
      <RoomItem />
      <RoomItem />
      <RoomItem />
      <RoomItem />
      <RoomItem />
      <RoomItem />
    </div>
  );
}
