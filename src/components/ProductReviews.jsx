import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Star, Edit2, Save } from "lucide-react";

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/reviews/${productId}`
        );
        setReviews(res.data);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load reviews");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  // Submit review
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment.trim()) {
      toast.error("Please provide both rating and comment");
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews/${productId}`,
        { rating, comment },
        { headers: {
						Authorization: "Bearer " + token,
					},
        },
      );

      toast.success("Review submitted!");
      setRating(0);
      setComment("");
      
      // Refresh reviews
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews/${productId}`
      );
      setReviews(res.data);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading reviews...</p>;
  }

  return (
    <div className="mt-6 w-full">
      <h2 className="text-2xl font-semibold mb-4 text-secondary">Customer Reviews</h2>

      {/* Review Form */}
      <form
        onSubmit={handleSubmit}
        className="border rounded-2xl p-3 bg-gray-50 shadow-sm mb-2 lg:mb-6 p:4"
      >
        <div className="flex items-center mb-2 lg:mb-3">
          <span className="mr-3 text-gray-700">Your Rating:</span>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={22}
              onClick={() => setRating(i + 1)}
              className={`cursor-pointer ${
                i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <textarea
          className="w-full p-2 border rounded-lg focus:ring-accent focus:border-accent"
          rows="2"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button
          type="submit"
          disabled={submitting}
          className="mt-1 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/80 transition disabled:opacity-50 lg:mt-2"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      {/* Reviews Box */}
      <div className="border rounded-2xl pl-3 pr-3 bg-white shadow-sm max-h-[100px] overflow-y-auto lg:max-h-[200px] p-4 ">
        {reviews.length === 0 && (
          <p className="text-center text-gray-500">
            No reviews yet. Be the first to review!
          </p>
        )}

        {reviews.map((review) => (
          <div
            key={review.reviewId}
            className="border-b last:border-b-0 py-3"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-gray-800 text-sm">{review.email}</span>
              <span className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </span>
            </div>
            <p className="text-gray-700 text-sm">{review.comment}</p>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(review.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>

  );
}
