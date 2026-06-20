import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/productCard";
import Loading from "../../components/loading";

export default function ProductPage() {
  const { category } = useParams(); // read category from URL
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  // Clear query when category changes
  useEffect(() => {
    setQuery("");
  }, [category]);

  useEffect(() => {
    if (query.trim().length > 0) {
      setIsLoading(true);
      const delayDebounceFn = setTimeout(async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/search/${query}`
          );
          setProducts(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
          console.error("Error searching products:", err);
          setProducts([]);
        } finally {
          setIsLoading(false);
        }
      }, 400); // 400ms debounce delay

      return () => clearTimeout(delayDebounceFn);
    } else {
      const fetchProducts = async () => {
        setIsLoading(true);
        try {
          let url = import.meta.env.VITE_BACKEND_URL + "/api/products";
          if (category) {
            url += `/category/${category}`;
          }

          const res = await axios.get(url);
          setProducts(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
          console.error("Error fetching products:", err);
          setProducts([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProducts();
    }
  }, [category, query]);

  // Format category name for title
  const getPageTitle = () => {
    if (!category) return "Our Collection";
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase() + " Collection";
  };

  return (
    <div className="w-full bg-pink-50 dark:bg-[var(--color-dark-bg)] min-h-screen flex flex-col items-center pt-8 pb-20 transition-colors duration-300">
      
      {/* Header Info */}
      <div className="text-center mb-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold font-heading text-pink-900 dark:text-[var(--color-accent)] mb-2">
          {getPageTitle()}
        </h1>
        <p className="text-sm md:text-md text-gray-500 dark:text-gray-400 max-w-xl font-main">
          Discover premium, cruelty-free beauty formulations designed to bring out your natural glow.
        </p>
      </div>

      {/* Premium Search Bar */}
      <div className="w-full max-w-xl px-4 mb-10 flex items-center relative">
        <input
          type="text"
          placeholder="Search products by name..."
          className="w-full h-12 px-5 pr-12 rounded-2xl border border-pink-100 dark:border-[var(--color-dark-border)] bg-white dark:bg-[var(--color-dark-surface)] text-secondary dark:text-[var(--color-dark-text)] shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all font-main placeholder-gray-400 dark:placeholder-gray-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <svg
          className="absolute right-8 text-gray-400 dark:text-gray-500 w-5 h-5 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Grid Content Area */}
      <div className="w-full max-w-7xl px-4 flex flex-wrap justify-center gap-6">
        {isLoading ? (
          <div className="flex justify-center mt-12 w-full">
            <Loading />
          </div>
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))
        ) : (
          <div className="flex flex-col items-center mt-12 w-full text-center gap-2">
            <span className="text-4xl">🛍️</span>
            <p className="text-gray-500 dark:text-gray-400 font-semibold font-main">
              No products found {query && `for "${query}"`}.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
