/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Trash } from "lucide-react";
import { format } from "date-fns";
import Rating from "@/components/ui/rating";
import RestClient from "@/features/room/utils/api-function";

interface BookingData {
  _id: string;
  paidAmount: {
    amount: number;
  };
  totalAmount: number;
  checkInTime: string;
  checkOutTime: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export default function HistoryBooking() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [metadata, setMetadata] = useState({
    currentPage: 1,
    totalPages: 1,
    sizeEachPage: 10,
    totalElements: 0,
  });
  const [showReviewForm, setShowReviewForm] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [bookingsCache, setBookingsCache] = useState<Map<number, any>>(
    new Map()
  );

  const bookingClient = new RestClient().service("bookings");
  const typeRoomClient = new RestClient().service("type-rooms");
  const ratingClient = new RestClient().service("ratings");

  useEffect(() => {
    const fetchBookingsForUser = async () => {
      const userAccount = localStorage.getItem("userAccount");
      if (userAccount) {
        const parsedAccount = JSON.parse(userAccount);
        const userId = parsedAccount.state.userAccount.id;
        if (userId) {
          fetchBookings(userId);
        }
      }
    };
    fetchBookingsForUser();
  }, []);

  const fetchBookings = async (
    userId: string,
    page: number = 1,
    size: number = metadata.sizeEachPage
  ) => {
    if (bookingsCache.has(page)) {
      setBookings(bookingsCache.get(page));
      setMetadata((prevMetadata) => ({
        ...prevMetadata,
        currentPage: page,
      }));
      return;
    }

    try {
      const bookingResponse = await bookingClient.find({ userId, page, size });
      const bookingsWithTypes = await Promise.all(
        bookingResponse.data.map(async (booking: { roomIds: any[] }) => {
          const roomsWithTypeInfo = await Promise.all(
            booking.roomIds.map(async (room: { typeId: any }) => {
              const roomTypeData = await fetchRoomTypeById(room.typeId);
              return { ...room, roomTypeInfo: roomTypeData };
            })
          );
          return { ...booking, roomIds: roomsWithTypeInfo };
        })
      );

      setBookings(bookingsWithTypes);
      setBookingsCache((prevCache) =>
        new Map(prevCache).set(page, bookingsWithTypes)
      );
      setMetadata((prevMetadata) => ({
        ...prevMetadata,
        currentPage: page,
        totalPages: bookingResponse.metadata.totalPages,
        totalElements: bookingResponse.metadata.totalElements,
      }));
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const fetchRoomTypeById = async (typeId: any) => {
    try {
      const typeRoomResponse = await typeRoomClient.get(typeId);
      return typeRoomResponse;
    } catch (error) {
      console.error("Error fetching room type:", error);
      return null;
    }
  };

  const handleReviewClick = (bookingId: any) => {
    setShowReviewForm(showReviewForm === bookingId ? null : bookingId);
    setSelectedRoom(null);
    setRatingValue(0);
    setReviewText("");
  };

  const handleRoomChange = (event: any) => {
    setSelectedRoom(event.target.value);
  };

  const handleSubmitReview = async (bookingId: any) => {
    if (!selectedRoom) {
      console.error("Please select a room");
      return;
    }

    const reviewData = {
      bookingId,
      typeRoomId: selectedRoom,
      score: ratingValue,
      feedback: reviewText,
    };

    try {
      await ratingClient.create(reviewData);
      alert("Review submitted successfully!");
      setShowReviewForm(null);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleCancelBooking = async (bookingId: any) => {
    try {
      await bookingClient.update(bookingId, { currentStatus: "Cancelled" });
      alert("Booking cancelled successfully!");
      const userAccount = localStorage.getItem("userAccount");
      if (userAccount) {
        const parsedAccount = JSON.parse(userAccount);
        const userId = parsedAccount.state.userAccount.id;
        if (userId) {
          fetchBookings(userId, metadata.currentPage);
        }
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking.");
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= metadata.totalPages) {
      fetchBookings(localStorage.getItem("Login")!, page);
    }
  };

  const handleSizeChange = (event: any) => {
    const newSize = parseInt(event.target.value, 10);
    setMetadata((prevMetadata) => ({
      ...prevMetadata,
      sizeEachPage: newSize,
      currentPage: 1,
    }));

    const userAccount = localStorage.getItem("userAccount");
    if (userAccount) {
      const parsedAccount = JSON.parse(userAccount);
      const userId = parsedAccount.state.userAccount.id;
      fetchBookings(userId, 1, newSize);
    }
  };

  return (
    <div className="mt-10 py-20 px-6 mb-12">
      <h2 className="flex items-center justify-center text-2xl font-bold mb-4">
        Booking History
      </h2>

      <div className="mb-6 flex justify-end items-center">
        <label htmlFor="sizeEachPage" className="mr-2 text-lg">
          Items per page:
        </label>
        <select
          id="sizeEachPage"
          value={metadata.sizeEachPage}
          onChange={handleSizeChange}
          className="border p-2 rounded-md"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => {
          // Kiểm tra nếu ngày hiện tại lớn hơn ngày checkOutTime
          const isReviewAllowed = new Date() > new Date(booking.checkOutTime);

          return (
            <div
              key={booking._id}
              className="p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm"
            >
              <p className="text-sm font-semibold text-gray-600">
                Booking ID: <span className="font-normal">{booking._id}</span>
              </p>
              <p className="text-sm font-semibold text-gray-600">
                Paid Amount:
                <span className="font-normal">
                  {booking.paidAmount.amount.toLocaleString()} VND
                </span>
              </p>
              <p className="text-sm font-semibold text-gray-600">
                Total Amount:
                <span className="font-normal">
                  {booking.totalAmount.toLocaleString()} VND{" "}
                </span>
              </p>
              <p className="text-sm font-semibold text-gray-600">
                Check-In Time:
                <span className="font-normal">
                  {" "}
                  {format(new Date(booking.checkInTime), "dd/MM/yyyy HH:mm")}
                </span>
              </p>
              <p className="text-sm font-semibold text-gray-600">
                Check-Out Time:
                <span className="font-normal">
                  {format(new Date(booking.checkOutTime), "dd/MM/yyyy HH:mm")}
                </span>
              </p>
              <div className="mt-4">
                <p className="font-semibold text-gray-600">Rooms:</p>
                <ul className="ml-4 mt-2 space-y-2">
                  {booking.roomIds.map((room) => (
                    <li
                      key={room.roomNumber}
                      className="pl-4 border-l-4 border-blue-400"
                    >
                      <p className="text-sm text-gray-600">
                        <strong>Room Number:</strong> {room.roomNumber}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Room Type:</strong>{" "}
                        {room.roomTypeInfo?.typename || "N/A"}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Description:</strong>{" "}
                        {room.roomTypeInfo?.description ||
                          "No description available"}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-end mt-4 space-x-4">
                {isReviewAllowed && (
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={() => handleReviewClick(booking._id)}
                  >
                    Leave a Review
                  </button>
                )}
                <button
                  className="px-4 py-2 text-red-600 hover:text-red-800"
                  title="Cancel Booking"
                  onClick={() => handleCancelBooking(booking._id)}
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>
              {showReviewForm === booking._id && (
                <div className="border p-6 rounded-md mt-4 bg-white shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
                  {/* Form review */}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Phần phân trang */}
      <div className="flex justify-center mt-6">
        <button
          className="px-4 py-2 bg-gray-200 rounded-md mr-2"
          onClick={() => handlePageChange(metadata.currentPage - 1)}
          disabled={metadata.currentPage === 1}
        >
          Previous
        </button>
        {[...Array(metadata.totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-md ${
              metadata.currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="px-4 py-2 bg-gray-200 rounded-md ml-2"
          onClick={() => handlePageChange(metadata.currentPage + 1)}
          disabled={metadata.currentPage === metadata.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
