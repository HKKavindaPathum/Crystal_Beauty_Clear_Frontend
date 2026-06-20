import axios from "axios";
import { useState, useEffect } from "react";
import ProductCard from "../../components/productCard";
import Loading from "../../components/loading";
import toast from "react-hot-toast";

export default function SearchProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.trim().length === 0) {
      setProducts([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/search/${query}`
        );
        setProducts(response.data);
      } catch (error) {
        toast.error("Error fetching products");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }, 400); // 400ms debounce delay

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col items-center px-4 py-12">
      
      {/* Search box */}
      <div className="w-full max-w-2xl flex items-center relative">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full h-14 px-5 pr-12 rounded-2xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-lg"
          value={query}
          onChange={handleSearch}
        />
        <svg
          className="absolute right-4 text-gray-400 w-6 h-6 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Results section */}
      <div className="w-full max-w-7xl mt-10">
        {query.length === 0 ? (
          <h1 className="text-xl md:text-2xl text-gray-600 font-medium text-center">
            🔍 Start typing to search for products
          </h1>
        ) : (
          <>
            {isLoading ? (
              <div className="flex justify-center mt-20">
                <Loading />
              </div>
            ) : (
              <>
                {products.length === 0 ? (
                  <h2 className="text-lg text-gray-500 text-center mt-10">
                    No products found for "<span className="font-semibold">{query}</span>"
                  </h2>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
                    {products.map((product) => (
                      <ProductCard key={product.productId} product={product} />
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
