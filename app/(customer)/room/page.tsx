"use client";

import Breadcrumb from "@/features/room/components/breadcrumb";
import RoomItem from "@/features/room/components/room-item";
import RestClient from "@/features/room/utils/api-function";
import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function Room() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cache, setCache] = useState({});
  const [pageSize, setPageSize] = useState(10);

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
      setShowScrollToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      const restClient = new RestClient();

      const cacheKey = `${currentPage}-${pageSize}`;
      if (cache[cacheKey]) {
        setRooms(cache[cacheKey].data);
        setTotalPages(cache[cacheKey].totalPages);
        setLoading(false);
        return;
      }

      try {
        const { data, metadata } = await restClient
          .service("type-rooms")
          .find({ page: currentPage, size: pageSize });
        if (data) {
          setRooms(data);

          const totalElements = metadata.totalElements;
          const totalPageCount = Math.ceil(totalElements / pageSize);

          setTotalPages(totalPageCount);

          setCache((prevCache) => ({
            ...prevCache,
            [cacheKey]: { data, totalPages: totalPageCount },
          }));

          if (currentPage > totalPageCount) {
            setCurrentPage(totalPageCount);
          }
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }

      setLoading(false);
    };

    fetchRooms();
  }, [currentPage, pageSize]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Room Section */}
      {loading ? (
        <p>Loading rooms...</p>
      ) : rooms.length > 0 ? (
        rooms.map((room) => <RoomItem key={room._id} room={room} />)
      ) : (
        <p>No rooms available</p>
      )}
      <div className="flex items-center justify-center mt-4 space-x-4">
        <label htmlFor="pageSize" className="text-gray-600">
          Items per page:
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => {
            const newSize = Number(e.target.value);
            setPageSize(newSize);
            setCurrentPage(1);
          }}
          className="border rounded px-2 py-1"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>

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
          Page {currentPage} of {totalPages} (Size: {pageSize})
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
