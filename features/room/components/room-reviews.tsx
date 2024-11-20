import Image from "next/image";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import Rating from "@/components/ui/rating";
import RestClient from "../utils/api-function";

interface Rating {
  _id: string;
  bookingId: {
    userId: {
      _id: string;
      fullName: string;
    };
  };
  feedback: string;
  score: number;
  createAt: string;
}

export default function RoomReviews({ roomId }: { roomId: string }) {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [editingReview, setEditingReview] = useState<Rating | null>(null);
  const [updatedFeedback, setUpdatedFeedback] = useState("");
  const [updatedRating, setUpdatedRating] = useState(0);

  const userId = typeof window !== "undefined" ? localStorage.getItem("Login") : null;

  // Fetch ratings
  useEffect(() => {
    const fetchRatings = async () => {
      setLoading(true);
      const restClient = new RestClient();

      try {
        const { data: ratingsData, metadata } = await restClient
          .service("ratings")
          .find({
            typeRoomId: roomId,
            page: String(page),
            size: String(size),
          });

        if (ratingsData.length > 0) {
          setRatings((prevRatings) => {
            const existingIds = prevRatings.map((rating) => rating._id);
            const newRatings = ratingsData.filter(
              (rating) => !existingIds.includes(rating._id)
            );
            return [...prevRatings, ...newRatings];
          });
        } else if (page === 1) {
          setRatings([]);
          setHasMore(false);
        }

        const totalPages = metadata?.totalPages || 1;
        setHasMore(page < totalPages);
      } catch (error) {
        console.error("Error fetching ratings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      fetchRatings();
    }
  }, [roomId, page]);

  // Handle edit logic
  const handleEditReview = (review: Rating) => {
    setEditingReview(review);
    setUpdatedFeedback(review.feedback);
    setUpdatedRating(review.score);
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
    setUpdatedFeedback("");
    setUpdatedRating(0);
  };

  const handleSaveReview = async () => {
    if (!editingReview) return;

    try {
      const restClient = new RestClient();
      const updatedReview = {
        ...editingReview,
        feedback: updatedFeedback,
        score: updatedRating,
      };
      await restClient.service("ratings").update(editingReview._id, updatedReview);

      setRatings((prevRatings) =>
        prevRatings.map((rating) =>
          rating._id === editingReview._id
            ? { ...rating, feedback: updatedFeedback, score: updatedRating }
            : rating
        )
      );

      handleCancelEdit();
      alert("Cập nhật đánh giá thành công!");
    } catch (error) {
      console.error("Error updating review:", error);
      alert("Cập nhật đánh giá thất bại!");
    }
  };

  const handleDeleteReview = async (id: string) => {
    const confirmDelete = confirm("Bạn có chắc chắn muốn xóa đánh giá này?");
    if (!confirmDelete) return;

    try {
      const restClient = new RestClient();
      await restClient.service("ratings").delete(id);

      setRatings((prevRatings) => prevRatings.filter((rating) => rating._id !== id));
      alert("Xóa đánh giá thành công!");
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Xóa đánh giá thất bại!");
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Room Reviews</h2>

      {ratings.length === 0 && !loading && (
        <p className="text-center text-gray-500">
          There are no reviews for this room yet.
        </p>
      )}

      {ratings.map((rating) => (
        <div key={rating._id} className="border p-6 rounded-md mb-4">
          <div className="flex items-start space-x-4 mb-5">
            <Image
              src="/images/image1.jpg"
              alt="Reviewer Avatar"
              className="w-16 h-16 rounded-full object-cover"
              width={50}
              height={50}
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <Rating initialValue={rating.score} readonly={true} />
                </div>
              </div>
              <p className="font-semibold text-lg">
                {rating.bookingId.userId.fullName || "Reviewer Name"}
              </p>
              <p className="text-gray-600">{rating.feedback}</p>
              <p className="text-sm text-gray-500 mt-2">
                {formatDistanceToNow(new Date(rating.createAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>

          {rating.bookingId.userId._id === userId && (
            <div className="text-right space-x-2">
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                onClick={() => handleEditReview(rating)}
              >
                Update
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={() => handleDeleteReview(rating._id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}

      {hasMore && ratings.length > 0 && (
        <div className="text-center mt-6">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              if (hasMore) setPage((prevPage) => prevPage + 1);
            }}
            disabled={loading || !hasMore}
          >
            {loading ? "Loading..." : "Xem thêm"}
          </button>
        </div>
      )}

      {editingReview && (
        <div className="border p-6 rounded-md mb-4 bg-gray-50">
          <h3 className="text-xl font-bold mb-4">Update rating</h3>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Rating:
            </label>
            <Rating
              initialValue={updatedRating}
              onChange={(value) => setUpdatedRating(value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Feedback:
            </label>
            <textarea
              className="w-full p-2 border rounded-md"
              value={updatedFeedback}
              onChange={(e) => setUpdatedFeedback(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded-md"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleSaveReview}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
