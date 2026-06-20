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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin: Product Reviews</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Object.keys(groupedReviews).length === 0 && (
          <p className="text-gray-500">No reviews found.</p>
        )}
        {Object.keys(groupedReviews).map((productId) => {
          const product = products[productId];
          const reviewCount = groupedReviews[productId].length;

          return (
            <div
              key={productId}
              className="border rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer bg-white p-4"
              onClick={() => setSelectedProduct(productId)}
            >
              <img
                src={product?.images[0] || "/placeholder.png"}
                alt={product?.name || productId}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h2 className="font-semibold text-lg text-gray-900">
                {product?.name || productId}
              </h2>
              <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                {reviewCount} review{reviewCount !== 1 ? "s" : ""}
              </span>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-start pt-16 z-50">
          <div className="bg-white w-[850px] max-w-[95%] h-[600px] rounded-2xl shadow-2xl p-6 overflow-y-auto relative animate-fadeIn">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-600 font-bold text-2xl"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {products[selectedProduct]?.name || selectedProduct} – Reviews
            </h2>

            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {groupedReviews[selectedProduct].map((review) => (
                <div
                  key={review.reviewId}
                  className="border rounded-lg p-3 flex justify-between items-start bg-gray-50"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-gray-700">
                        <User size={16} />
                      </div>
                      <span className="font-medium text-gray-800">{review.email}</span>
                      <div className="flex">
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
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteReview(review.reviewId)}
                    className="ml-3 p-2 h-10 bg-red-500 text-white rounded-lg hover:bg-red-600"
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
