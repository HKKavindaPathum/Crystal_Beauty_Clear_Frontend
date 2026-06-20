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
      <h2 className="text-xl font-bold font-fancy mb-4 text-secondary dark:text-[var(--color-dark-text)]">Customer Reviews</h2>

      {/* Review Form */}
      <form
        onSubmit={handleSubmit}
        className="border border-pink-100/50 dark:border-[var(--color-dark-border)] rounded-2xl p-4 bg-gray-50 dark:bg-[var(--color-dark-bg)] shadow-xs mb-6"
      >
        <div className="flex items-center mb-3">
          <span className="mr-3 text-sm text-gray-700 dark:text-gray-300 font-medium">Your Rating:</span>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={20}
              onClick={() => setRating(i + 1)}
              className={`cursor-pointer transition-colors duration-200 ${
                i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"
              }`}
            />
          ))}
        </div>
        <textarea
          className="w-full p-3 border border-pink-100 dark:border-[var(--color-dark-border)] rounded-xl bg-white dark:bg-[var(--color-dark-surface)] text-secondary dark:text-[var(--color-dark-text)] focus:ring-2 focus:ring-accent focus:outline-none transition"
          rows="3"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button
          type="submit"
          disabled={submitting}
          className="mt-2 px-5 py-2 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl shadow-md transition disabled:opacity-50 cursor-pointer"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      {/* Reviews Box */}
      <div className="border border-pink-100/50 dark:border-[var(--color-dark-border)] rounded-2xl p-4 bg-white dark:bg-[var(--color-dark-surface)] shadow-xs max-h-[250px] overflow-y-auto">
        {reviews.length === 0 && (
          <p className="text-center text-gray-400 py-6">
            No reviews yet. Be the first to review!
          </p>
        )}

        {reviews.map((review) => (
          <div
            key={review.reviewId}
            className="border-b last:border-b-0 border-pink-50 dark:border-[var(--color-dark-border)] py-4 first:pt-0"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-gray-800 dark:text-[var(--color-dark-text)] text-sm">{review.email}</span>
              <span className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }
                  />
                ))}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{review.comment}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">
              {new Date(review.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>

  );
}
