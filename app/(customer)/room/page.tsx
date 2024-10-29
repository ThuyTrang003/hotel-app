"use client";

import Breadcrumb from "@/features/room/components/breadcrumb";
import RoomItem from "@/features/room/components/room-item";
import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function Room() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // useEffect(() => {
  //   const fetchRooms = async () => {
  //     const { data, error } = await getRooms(currentPage);
  //     if (error) {
  //       console.error("Error fetching rooms:", error);
  //     } else {
  //       console.log(data);
  //       setRooms(data.rooms);
  //       setLoading(false);
  //     }
  //   };

  //   fetchRooms();
  // }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Room Section */}
      {/* {loading ? (
        <p>Loading rooms...</p>
      ) : (
        rooms.map((room, index) => <RoomItem key={index} {...room} />)
      )} */}
      <RoomItem />
      <RoomItem />
      <RoomItem />
      <RoomItem />
      <RoomItem />

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-4">
        {/* Previous Button */}
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>

        {/* Current Page */}
        <span className="px-4 py-2 text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        {/* Next Button */}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-yellow-500 text-white rounded-full shadow-lg hover:bg-yellow-600 transition"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
