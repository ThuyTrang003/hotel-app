import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import RoomItem from "./room-item";
import BookingSummary from "./booking-summary";
import RestClient from "@/features/room/utils/api-function";

export default function ContentSearch() {
  const searchParams = useSearchParams();
  const queryCheckIn = searchParams.get("checkIn");
  const queryCheckOut = searchParams.get("checkOut");
  const queryGuests = searchParams.get("guests");

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [roomCount, setRoomCount] = useState(0);
  const [adults, setAdults] = useState(Array(roomCount).fill(1));
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updatedData, setUpdatedData] = useState([]);
  const [size, setSize] = useState(10);

  useEffect(() => {
    if (queryCheckIn) setCheckIn(queryCheckIn);
    if (queryCheckOut) setCheckOut(queryCheckOut);
    if (queryGuests) setGuests(Number(queryGuests));
  }, [queryCheckIn, queryCheckOut, queryGuests]);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      const restClient = new RestClient();

      try {
        const response = await restClient.service("type-rooms").find({
          checkInTime: checkIn,
          checkOutTime: checkOut,
          limit: guests,
          page: currentPage,
          size: size,
        });

        console.log("RESPONSE", response);

        if (response) {
          const roomsData = response.data || [];
          setAvailableRooms(roomsData);

          const { totalPages, totalElements } = response.metadata;
          setTotalPages(totalPages || 1);
          console.log("Total Pages:", totalPages, "Total Elements:", totalElements);
        } else {
          setAvailableRooms([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setAvailableRooms([]);
      }

      setLoading(false);
    };

    if (checkIn && checkOut) {
      fetchRooms();
    }
  }, [checkIn, checkOut, guests, currentPage, size]);

  const handleRoomCountChange = (newRoomCount) => {
    setRoomCount(newRoomCount);
    setAdults((prev) => [
      ...prev.slice(0, newRoomCount),
      ...Array(Math.max(0, newRoomCount - prev.length)).fill(1),
    ]);
  };

  const updateBookingSummary = (newData) => {
    setUpdatedData((prevData) => {
      const existingIndex = prevData.findIndex(
        (item) => item.roomId === newData.roomId
      );
      if (existingIndex >= 0) {
        const updatedData = [...prevData];
        updatedData[existingIndex] = newData;
        return updatedData;
      }
      return [...prevData, newData];
    });

    setAdults((prevAdults) => {
      const updatedAdults = [...prevAdults];
      updatedAdults[newData.roomId] = newData.adults;
      return updatedAdults;
    });
  };

  return (
    <div className="flex justify-center mx-10 gap-12 py-8">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl w-auto space-y-6 h-fit">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <label className="block text-sm font-medium text-gray-700 mr-4">
              Sort by
            </label>
            <select className="border rounded-md px-3 py-2">
              <option value="default">Default</option>
              <option value="price">Lowest Price</option>
              <option value="rating">Highest Price</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="block text-sm font-medium text-gray-700 mr-4">
              Rooms per page
            </label>
            <select
              className="border rounded-md px-3 py-2"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))} 
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
        <div className="space-y-4">
          {loading ? (
            <p>Loading rooms...</p>
          ) : availableRooms.length === 0 ? (
            <p className="text-red-600 font-bold">There are no rooms available that match your search.</p>
          ) : (
            availableRooms.map((room) => (
              <RoomItem
                key={room._id}
                roomData={room}
                checkIn={checkIn}
                checkOut={checkOut}
                roomType={room.roomType}
                // guests={guests}
                updateBookingSummary={updateBookingSummary}
              />
            ))
          )}
        </div>
        <div className="flex justify-center items-center mt-4 space-x-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`px-4 py-2 border rounded-md ${
              currentPage === 1 ? "text-gray-400 border-gray-300" : "text-blue-500 border-blue-500"
            }`}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className={`px-4 py-2 border rounded-md ${
              currentPage === totalPages ? "text-gray-400 border-gray-300" : "text-blue-500 border-blue-500"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      <BookingSummary
        checkIn={checkIn}
        checkOut={checkOut}
        roomCount={roomCount}
        adults={adults}
        availableRooms={availableRooms}
        updatedData={updatedData}
      />
    </div>
  );
}
