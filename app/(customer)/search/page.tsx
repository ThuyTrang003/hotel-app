"use client"

import ContentSearch from "@/features/search/components/content-search"
import SearchBooking from "@/features/room/components/search-booking"

export default function Search(){
    console.log("Rendering Stepper");
    return(
        <div className="bg-orange-50">
            <SearchBooking/>
            <ContentSearch/>
        </div>
    )
}