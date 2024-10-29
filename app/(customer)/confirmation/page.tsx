"use client"

import BookingDetails from "@/features/confirmation/components/booking-details";
import Stepper from "@/features/room/components/stepper"

export default function Confirmation(){
    return(
        <div className="">
            <Stepper/>
            <BookingDetails/>
        </div>
    );
}