import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Star, Trash2, User, X } from "lucide-react";

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
    return (
      <div className="w-full text-center py-12 text-red-500 font-bold">
        Please login first
      </div>
    );
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

  if (loading) {
    return (
      <div className="w-full h-[50vh] flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-accent rounded-full animate-spin"></div>
      </div>
    );
  }

  const groupedReviews = reviews.reduce((acc, review) => {
    if (!acc[review.productId]) acc[review.productId] = [];
    acc[review.productId].push(review);
    return acc;
  }, {});

  return (
    <div className="space-y-6 font-[var(--font-main)]">
      {/* Top Panel Header */}
      <div>
        <h1 className="text-2xl font-bold font-heading text-secondary dark:text-[var(--color-dark-text)]">
          Product Reviews
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Inspect customer testimonials, average score metrics, and moderate feedback records.
        </p>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Object.keys(groupedReviews).length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400">
            No reviews found in your catalog.
          </div>
        )}
        {Object.keys(groupedReviews).map((productId) => {
          const product = products[productId];
          const productReviews = groupedReviews[productId];
          const reviewCount = productReviews.length;
          
          // Calculate average rating
          const avgRating = productReviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount;

          return (
            <div
              key={productId}
              className="border border-pink-100/40 dark:border-[var(--color-dark-border)] rounded-3xl overflow-hidden hover:shadow-lg hover:border-accent/40 transition-all duration-300 cursor-pointer bg-white dark:bg-[var(--color-dark-surface)] group flex flex-col h-full"
              onClick={() => setSelectedProduct(productId)}
            >
              <div className="w-full shrink-0">
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={product?.images[0] || "/placeholder.png"}
                    alt={product?.name || productId}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 border-b border-pink-50/50 dark:border-[var(--color-dark-border)]"
                  />
                </div>
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                <div>
                  <h2 className="font-bold text-sm text-secondary dark:text-[var(--color-dark-text)] group-hover:text-accent transition-colors truncate">
                    {product?.name || productId}
                  </h2>
                  <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 mt-0.5">ID: {productId}</p>
                </div>
                
                {/* Rating Stats Summary */}
                <div className="flex items-center justify-between border-t border-pink-50/30 dark:border-[var(--color-dark-border)]/50 pt-2.5">
                  <div className="flex items-center gap-1">
                    <Star size={13} className="text-amber-500 fill-amber-500" />
                    <span className="text-xs font-extrabold text-secondary dark:text-[var(--color-dark-text)]">
                      {avgRating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    {reviewCount} review{reviewCount !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-[var(--color-dark-surface)] w-[850px] max-w-[95%] h-[600px] rounded-3xl shadow-2xl p-6 overflow-y-auto relative border border-pink-100/50 dark:border-[var(--color-dark-border)] flex flex-col justify-between">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-pink-50/50 dark:border-[var(--color-dark-border)] pb-4 mb-4">
              <div>
                <h2 className="text-lg font-bold font-heading text-secondary dark:text-[var(--color-dark-text)]">
                  Customer Testimonials
                </h2>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  Product: <span className="font-semibold text-accent">{products[selectedProduct]?.name || selectedProduct}</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-1.5 rounded-xl hover:bg-pink-50 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Comments List */}
            <div className="space-y-4 overflow-y-auto flex-grow pr-1.5 min-h-0">
              {groupedReviews[selectedProduct].map((review) => (
                <div
                  key={review.reviewId}
                  className="border border-pink-100/20 dark:border-[var(--color-dark-border)]/50 rounded-2xl p-4 flex justify-between items-start bg-pink-50/5 dark:bg-pink-950/5 hover:bg-pink-50/10 dark:hover:bg-pink-950/10 transition-colors duration-200"
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <div className="w-8 h-8 rounded-full bg-pink-50 dark:bg-pink-950/20 text-accent flex items-center justify-center border border-pink-100/30 dark:border-[var(--color-dark-border)]">
                        <User size={14} />
                      </div>
                      <span className="font-bold text-xs text-secondary dark:text-[var(--color-dark-text)] truncate">
                        {review.email}
                      </span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={
                              i < review.rating
                                ? "text-amber-500 fill-amber-500"
                                : "text-gray-200 dark:text-gray-700"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed font-medium pl-1">
                      {review.comment}
                    </p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2.5 font-mono pl-1">
                      Published: {new Date(review.date).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteReview(review.reviewId)}
                    className="p-2 rounded-xl bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 transition-colors duration-200 cursor-pointer"
                    title="Delete review comment"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end pt-4 border-t border-pink-50/50 dark:border-[var(--color-dark-border)] mt-4">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-secondary dark:text-[var(--color-dark-text)] rounded-xl transition duration-300 font-bold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

