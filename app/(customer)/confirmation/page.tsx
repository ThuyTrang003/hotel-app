"use client"

import BookingDetails from "@/features/confirmation/components/booking-details";
import Progressbar from "@/features/confirmation/components/progressbar";

export default function Confirmation(){
    return(
        <div className="">
            <Progressbar/>
            <BookingDetails/>
        </div>
    );
}