import { AllRoomsPreview } from "@/features/customer/rooms/preview/all-rooms-preview";
import { SearchForm } from "@/features/customer/search/search-form";

export default function RoomsPage() {
    return (
        <div className="w-full px-10">
            <SearchForm />
            <AllRoomsPreview />
        </div>
    );
}
