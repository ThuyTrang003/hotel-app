import { useEffect, useState } from "react";
import { Check } from "lucide-react"
export default function BookingDetails() {
  const [bookingInfo, setBookingInfo] = useState(null);

  useEffect(() => {
    const savedBookingInfo = localStorage.getItem("bookingInfo");
    if (savedBookingInfo) {
      setBookingInfo(JSON.parse(savedBookingInfo));
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto my-8 bg-white shadow-md rounded-lg overflow-hidden">
      <div className="bg-[#90ffaf] text-green-500 p-4 mb-5 flex">
        <Check className="bg-[#B4D0BC] mr-2 rounded-xl text-green-500"/>
        Your booking has been submitted successfully. We just sent you a confirmation email to {bookingInfo.email}
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
        {bookingInfo && (
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Transaction ID:</span>
              <span>{bookingInfo.transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Full Name:</span>
              <span>{bookingInfo.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Email:</span>
              <span>{bookingInfo.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Phone:</span>
              <span>{bookingInfo.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Address:</span>
              <span>{bookingInfo.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Room:</span>
              <span>{bookingInfo.room}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Branch:</span>
              <span>{bookingInfo.branch}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Check In/Out:</span>
              <span>{bookingInfo.checkInOut}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Guests:</span>
              <span>{bookingInfo.guests}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Payment:</span>
              <span>{bookingInfo.payment}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Total Price:</span>
              <span>{bookingInfo.totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Deposit Amount:</span>
              <span>{bookingInfo.depositAmount}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}