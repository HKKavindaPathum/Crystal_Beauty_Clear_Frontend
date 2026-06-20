import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/productCard";

export default function ProductPage() {
  const { category } = useParams(); // read category from URL
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
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
  }, [category]);

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="w-full bg-pink-50 dark:bg-[var(--color-dark-bg)] min-h-screen flex flex-wrap justify-center items-start pt-10 pb-20 transition-colors duration-300">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))
      ) : (
        <p className="text-center text-pink-900">No products found.</p>
      )}
    </div>
  );
}
