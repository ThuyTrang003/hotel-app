"use client";
import { useEffect, useState } from "react";
import BookingDetail from "@/features/checkout/components/booking-details";
import PaymentOption from "@/features/checkout/components/payment-option";
import Stepper from "@/features/room/components/stepper"

export default function Checkout() {
  const [bookingInfo, setBookingInfo] = useState(null);

  useEffect(() => {
    const savedBookingInfo = localStorage.getItem("bookingInfo");
    if (savedBookingInfo) {
      setBookingInfo(JSON.parse(savedBookingInfo));
    }
  }, []);

  const handleBookNow = () => {
    window.location.href = "/confirmation";
  };

  if (!bookingInfo) return <p>Loading...</p>;

  return (
    <>
      <Stepper/>
      <div className="container mx-auto px-6 py-8 min-h-screen">
        <h2 className="text-3xl font-semibold mb-6">Booking Details</h2>
        <BookingDetail bookingInfo={bookingInfo} />

        <h2 className="text-3xl font-semibold mb-14 mt-6">Payment option</h2>
        <PaymentOption handleBookNow={handleBookNow} />
      </div>
    </>
  );
}
