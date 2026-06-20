import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={"/overview/"+product.productId} 
    className="w-[280px] h-[380px] bg-white dark:bg-[var(--color-dark-surface)] shadow-md hover:shadow-xl rounded-2xl m-4 overflow-hidden flex flex-col border border-pink-100/50 dark:border-[var(--color-dark-border)] hover:scale-[1.02] transition-all duration-300">
      {/* Image */}
      <div className="h-[180px] w-full bg-gray-50 dark:bg-[var(--color-dark-bg)] flex items-center justify-center overflow-hidden relative">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-md font-bold font-heading text-secondary dark:text-[var(--color-dark-text)] truncate">{product.name}</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 h-[36px] overflow-hidden leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing */}
        <div className="mt-2">
          {product.labelledPrice !== product.price ? (
            <div className="flex items-center gap-2">
              <p className="text-accent font-bold text-md">
                Rs. {product.price.toLocaleString()}
              </p>
              <p className="text-gray-400 dark:text-gray-500 line-through text-xs">
                Rs. {product.labelledPrice.toLocaleString()}
              </p>
            </div>
          ) : (
            <p className="text-secondary dark:text-[var(--color-dark-text)] font-semibold text-md">
              Rs. {product.price.toLocaleString()}
            </p>
          )}
        </div>

        {/* Stock & Button */}
        <div className="mt-3 flex items-center justify-between">
          <span
            className={`text-xs font-semibold ${
              product.isAvailable && product.stock > 0
                ? "text-emerald-600 dark:text-emerald-500"
                : "text-red-500"
            }`}
          >
            {product.isAvailable && product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>

          <button
            disabled={!product.isAvailable || product.stock <= 0}
            className="px-3 py-1.5 text-xs rounded-xl text-white bg-accent hover:bg-accent-hover disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:text-gray-500 transition duration-300 cursor-pointer"
          >
            {product.isAvailable && product.stock > 0 ? "View Details" : "Unavailable"}
          </button>
        </div>
      </div>
    </Link>
  );
}