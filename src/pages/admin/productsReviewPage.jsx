import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Star, Trash2, User } from "lucide-react";

export default function AdminProductReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.error("Please login first");
      setLoading(false);
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/reviews", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setReviews(res.data))
      .catch(() => toast.error("Failed to load reviews"))
      .finally(() => setLoading(false));

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const productMap = {};
        res.data.forEach((p) => {
          productMap[p.productId] = p;
        });
        setProducts(productMap);
      })
      .catch(() => toast.error("Failed to load products"));
  }, [token]);

  if (!token) {
    return <p className="text-center text-red-500 mt-6">Please login first</p>;
  }

  const deleteReview = (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success("Review deleted");
        setReviews(reviews.filter((r) => r.reviewId !== reviewId));
      })
      .catch((e) => {
        toast.error(e.response?.data?.message || "Failed to delete review");
      });
  };

  if (loading) return <p className="text-center mt-6">Loading reviews...</p>;

  const groupedReviews = reviews.reduce((acc, review) => {
    if (!acc[review.productId]) acc[review.productId] = [];
    acc[review.productId].push(review);
    return acc;
  }, {});

  return (
    <div className="p-4 font-[var(--font-main)] bg-pink-50/10 dark:bg-[var(--color-dark-bg)] min-h-screen transition-colors duration-300">
      <h1 className="text-3xl font-bold font-heading mb-6 text-secondary dark:text-[var(--color-dark-text)]">Product Reviews</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Object.keys(groupedReviews).length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">No reviews found.</p>
        )}
        {Object.keys(groupedReviews).map((productId) => {
          const product = products[productId];
          const reviewCount = groupedReviews[productId].length;

          return (
            <div
              key={productId}
              className="border border-pink-100/50 dark:border-[var(--color-dark-border)] rounded-2xl shadow-md hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer bg-white dark:bg-[var(--color-dark-surface)] p-4"
              onClick={() => setSelectedProduct(productId)}
            >
              <img
                src={product?.images[0] || "/placeholder.png"}
                alt={product?.name || productId}
                className="w-full h-40 object-cover rounded-xl mb-3 border dark:border-gray-800"
              />
              <h2 className="font-bold text-md text-secondary dark:text-[var(--color-dark-text)] truncate">
                {product?.name || productId}
              </h2>
              <span className="inline-block mt-2 px-3 py-1 bg-pink-50 dark:bg-[var(--color-dark-bg)] text-accent font-bold text-xs rounded-full border dark:border-[var(--color-dark-border)]">
                {reviewCount} review{reviewCount !== 1 ? "s" : ""}
              </span>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex justify-center items-start pt-16 z-50 transition-opacity duration-300">
          <div className="bg-white dark:bg-[var(--color-dark-surface)] w-[850px] max-w-[95%] h-[600px] rounded-2xl shadow-2xl p-6 overflow-y-auto relative border dark:border-[var(--color-dark-border)] transition-colors duration-300">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 font-bold text-2xl cursor-pointer"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold font-heading mb-6 text-secondary dark:text-[var(--color-dark-text)] pr-8 border-b dark:border-[var(--color-dark-border)] pb-3">
              {products[selectedProduct]?.name || selectedProduct} – Reviews
            </h2>

            <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
              {groupedReviews[selectedProduct].map((review) => (
                <div
                  key={review.reviewId}
                  className="border border-pink-50 dark:border-[var(--color-dark-border)] rounded-2xl p-4 flex justify-between items-start bg-pink-50/10 dark:bg-[var(--color-dark-bg)]"
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-950/20 text-accent flex items-center justify-center">
                        <User size={16} />
                      </div>
                      <span className="font-semibold text-sm text-secondary dark:text-[var(--color-dark-text)] truncate">{review.email}</span>
                      <div className="flex">
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
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{review.comment}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteReview(review.reviewId)}
                    className="p-2 rounded-xl bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-500 hover:text-red-600 cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
