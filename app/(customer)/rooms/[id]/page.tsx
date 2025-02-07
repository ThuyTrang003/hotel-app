import { RoomDetail } from "@/features/customer/rooms/detail/room-detail";
import { RoomsPreview } from "@/features/customer/rooms/preview/rooms-preview";

export default function RoomDetailPage() {
    return (
        <div className="w-full px-16">
            <RoomDetail />
            <RoomsPreview />
        </div>
    );
}
