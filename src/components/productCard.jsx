import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const isOutOfStock = !product.isAvailable || product.stock <= 0;

  return (
    <Link 
      to={"/overview/" + product.productId} 
      className="group w-full max-w-[280px] bg-white dark:bg-[var(--color-dark-surface)] shadow-sm hover:shadow-xl rounded-2xl overflow-hidden flex flex-col border border-pink-100/50 dark:border-[var(--color-dark-border)] hover:-translate-y-1 transition-all duration-300 relative"
    >
      {/* Floating Stock Badge */}
      <span
        className={`absolute top-3 left-3 z-10 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-xs backdrop-blur-md border transition-all duration-300 ${
          !isOutOfStock
            ? "bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-100/20"
            : "bg-red-50/80 dark:bg-red-950/60 text-red-500 border-red-100/20"
        }`}
      >
        {!isOutOfStock ? "In Stock" : "Out of Stock"}
      </span>

      {/* Image */}
      <div className="aspect-square w-full shrink-0 bg-pink-50/10 dark:bg-[var(--color-dark-bg)] flex items-center justify-center overflow-hidden relative">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image</span>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 p-4 flex flex-col justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold font-heading text-secondary dark:text-[var(--color-dark-text)] line-clamp-1 group-hover:text-accent transition duration-300">
            {product.name}
          </h3>
          <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium truncate mb-1">
            {product.productId}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mt-1">
            {product.description}
          </p>
        </div>

        {/* Pricing & Details Action */}
        <div className="flex items-center justify-between mt-1 gap-2">
          <div>
            {product.labelledPrice !== product.price ? (
              <div className="flex flex-col">
                <span className="text-gray-400 dark:text-gray-500 line-through text-[10px] leading-tight">
                  Rs. {product.labelledPrice.toLocaleString()}
                </span>
                <span className="text-accent font-bold text-sm leading-snug">
                  Rs. {product.price.toLocaleString()}
                </span>
              </div>
            ) : (
              <span className="text-secondary dark:text-[var(--color-dark-text)] font-bold text-sm">
                Rs. {product.price.toLocaleString()}
              </span>
            )}
          </div>

          <span
            className={`px-3 py-1.5 text-[10px] rounded-xl font-bold transition duration-300 border flex items-center justify-center ${
              !isOutOfStock
                ? "border-accent text-accent group-hover:bg-accent group-hover:text-white"
                : "border-gray-200 dark:border-gray-800 text-gray-400 cursor-not-allowed"
            }`}
          >
            {!isOutOfStock ? "View Details" : "Sold Out"}
          </span>
        </div>
      </div>
    </Link>
  );
}