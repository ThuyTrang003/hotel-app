"use client";

import RestClient from "@/features/room/utils/api-function";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const Confirmation = () => {
  const [bookingData, setBookingData] = useState(null);
  const [roomDetails, setRoomDetails] = useState([]);

  useEffect(() => {
    // Lấy thông tin booking từ localStorage
    const storedData = localStorage.getItem("bookingData");
    console.log("STORR",storedData)
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setBookingData(parsedData);
      } catch (error) {
        console.error("Failed to parse booking data from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Lấy thông tin chi tiết phòng từ roomIds
    const fetchRoomDetails = async () => {
      if (bookingData?.roomIds) {
        try {
          const restClient = new RestClient();
          restClient.service("rooms");

          const roomInfoPromises = bookingData.roomIds.map((roomId) =>
            restClient.get(roomId)
          );

          const roomInfo = await Promise.all(roomInfoPromises);
          console.log("ROOMSWW", roomInfo);
          setRoomDetails(roomInfo);
        } catch (error) {
          console.error("Error fetching room details:", error);
        }
      }
    };

    fetchRoomDetails();
  }, [bookingData]);

  if (!bookingData) {
    return <p className="mt-20 text-center">Loading...</p>;
  }

  return (
    <div className="mt-12 px-24 py-32">
      <h2 className="text-2xl font-bold mb-4">Booking Confirmation</h2>
      <div className="border p-6 rounded-md bg-gray-50 shadow-lg">
        <p>
          <strong>Booking ID:</strong> {bookingData._id || "N/A"}
        </p>
        <p>
          <strong className="pr-2">Check-In:</strong>
          {bookingData.checkInTime
            ? format(new Date(bookingData.checkInTime), "dd/MM/yyyy hh:mm a")
            : "N/A"}
        </p>
        <p>
          <strong className="pr-2">Check-Out:</strong>
          {bookingData.checkOutTime
            ? format(new Date(bookingData.checkOutTime), "dd/MM/yy hh:mm a")
            : "N/A"}
        </p>
        <p>
          <strong>Number of Guests:</strong>{" "}
          {bookingData.numberOfGuests || "N/A"}
        </p>
        <p>
          <strong>Paid Amount:</strong>{" "}
          {bookingData.paidAmount?.amount
            ? `${bookingData.paidAmount.amount.toLocaleString()} VND`
            : "N/A"}
        </p>

        <p>
          <strong>Payment Method:</strong> {bookingData.paymentMethod || "N/A"}
        </p>
        <p>
          <strong>Status:</strong> {bookingData.currentStatus || "N/A"}
        </p>
        <div>
          <h3 className="font-semibold mt-2">Room:</h3>
          <ul className="ml-4 mt-2 space-y-2">
            {roomDetails.length > 0 ? (
              roomDetails.map((room, index) => (
                <li key={index} className="pl-4 border-l-4 border-blue-400">
                  <p>
                    <strong>Room Number:</strong> {room.roomNumber || "N/A"}
                  </p>
                  <p>
                    <strong>Type:</strong> {room.typeId.typename || "N/A"}
                  </p>
                </li>
              ))
            ) : (
              <p className="text-gray-600">Loading room details...</p>
            )}
          </ul>
        </div>
        <p className="mt-3">
          <strong>Total Amount:</strong>
          {bookingData.totalAmount
            ? `${bookingData.totalAmount.toLocaleString()} VND`
            : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default Confirmation;
