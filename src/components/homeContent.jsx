import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Banner from "./banner";
import ProductCard from "./productCard";
import Skincare from "../../public/SkinCare.png";
import Makeup from "../../public/MakeUp.png";
import Haircare from "../../public/HairCare.png";
import { Sparkles, ShieldCheck, Truck, Star, Mail } from "lucide-react";

export default function HomeContent() {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
      .then((res) => {
        // Display the first 4 products as featured formulations
        setFeaturedProducts(Array.isArray(res.data) ? res.data.slice(0, 4) : []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching featured products:", err);
        setIsLoading(false);
      });
  }, []);

  const goToCategory = (category) => {
    navigate(`/products/${category}`);
  };

  return (
    <div className="bg-pink-50 dark:bg-[var(--color-dark-bg)] pt-4 flex flex-col items-center w-full min-h-screen transition-colors duration-300 font-[var(--font-main)]">
      {/* Hero Banner Section */}
      <Banner />

      {/* Shop By Category Section */}
      <div className="w-full max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold font-fancy text-pink-900 dark:text-[var(--color-dark-text)] mb-8 text-center tracking-wide">
          Shop by Category
        </h2>

        <div className="flex flex-col md:flex-row gap-5">
          {/* Skincare */}
          <div
            onClick={() => goToCategory("skincare")}
            className="relative group flex-1 rounded-2xl border border-pink-100/40 dark:border-[var(--color-dark-border)] overflow-hidden shadow-xs hover:shadow-md cursor-pointer transition-transform transform hover:scale-[1.015] duration-300"
          >
            <img
              src={Skincare}
              alt="Skincare"
              className="w-full h-40 md:h-48 object-cover brightness-95 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-pink-50/20 dark:bg-black/25 flex items-center justify-center backdrop-blur-xs group-hover:backdrop-blur-none transition duration-300">
              <h3 className="text-2xl font-bold font-fancy text-pink-900 dark:text-white drop-shadow-md">Skincare</h3>
            </div>
          </div>

          {/* Makeup */}
          <div
            onClick={() => goToCategory("makeup")}
            className="relative group flex-1 rounded-2xl border border-pink-100/40 dark:border-[var(--color-dark-border)] overflow-hidden shadow-xs hover:shadow-md cursor-pointer transition-transform transform hover:scale-[1.015] duration-300"
          >
            <img
              src={Makeup}
              alt="Makeup"
              className="w-full h-40 md:h-48 object-cover brightness-95 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-pink-50/20 dark:bg-black/25 flex items-center justify-center backdrop-blur-xs group-hover:backdrop-blur-none transition duration-300">
              <h3 className="text-2xl font-bold font-fancy text-pink-900 dark:text-white drop-shadow-md">Makeup</h3>
            </div>
          </div>

          {/* Haircare */}
          <div
            onClick={() => goToCategory("haircare")}
            className="relative group flex-1 rounded-2xl border border-pink-100/40 dark:border-[var(--color-dark-border)] overflow-hidden shadow-xs hover:shadow-md cursor-pointer transition-transform transform hover:scale-[1.015] duration-300"
          >
            <img
              src={Haircare}
              alt="Haircare"
              className="w-full h-40 md:h-48 object-cover brightness-95 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-pink-50/20 dark:bg-black/25 flex items-center justify-center backdrop-blur-xs group-hover:backdrop-blur-none transition duration-300">
              <h3 className="text-2xl font-bold font-fancy text-pink-900 dark:text-white drop-shadow-md">Haircare</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="w-full max-w-7xl mx-auto px-6 py-16 border-t border-pink-100/30 dark:border-pink-950/20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-fancy text-pink-900 dark:text-[var(--color-dark-text)] tracking-wide">
            Featured Formulations
          </h2>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2 font-main max-w-xl mx-auto">
            Our most-loved, high-performance skincare and beauty selections curated just for you.
          </p>
        </div>

        {isLoading ? (
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i} 
                className="w-full max-w-[280px] aspect-[3/4] rounded-2xl bg-white/50 dark:bg-gray-800/40 animate-pulse border border-pink-100/20 dark:border-gray-800/20" 
              />
            ))}
          </div>
        ) : featuredProducts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 text-xs py-8">No featured products available.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {featuredProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>

      {/* Brand Value Propositions Section */}
      <div className="w-full bg-white/30 dark:bg-[var(--color-dark-surface)]/20 py-16 border-y border-pink-100/40 dark:border-[var(--color-dark-border)]/50 transition-colors duration-300">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-white/60 dark:bg-[var(--color-dark-surface)]/50 border border-pink-100/20 dark:border-[var(--color-dark-border)]/30 shadow-xs group hover:border-accent/30 transition duration-300">
              <div className="p-4 bg-pink-100/40 dark:bg-pink-950/20 rounded-2xl text-accent group-hover:scale-110 transition duration-300">
                <Sparkles size={24} />
              </div>
              <h4 className="text-md font-bold font-heading text-secondary dark:text-[var(--color-dark-text)] mt-4">Natural Ingredients</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed max-w-xs">
                Formulated with premium botanical extracts and scientifically proven active organic elements.
              </p>
            </div>

            {/* Value 2 */}
            <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-white/60 dark:bg-[var(--color-dark-surface)]/50 border border-pink-100/20 dark:border-[var(--color-dark-border)]/30 shadow-xs group hover:border-accent/30 transition duration-300">
              <div className="p-4 bg-pink-100/40 dark:bg-pink-950/20 rounded-2xl text-accent group-hover:scale-110 transition duration-300">
                <ShieldCheck size={24} />
              </div>
              <h4 className="text-md font-bold font-heading text-secondary dark:text-[var(--color-dark-text)] mt-4">Dermatology Approved</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed max-w-xs">
                Hypoallergenic products tested rigorously to ensure complete compatibility with sensitive skin.
              </p>
            </div>

            {/* Value 3 */}
            <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-white/60 dark:bg-[var(--color-dark-surface)]/50 border border-pink-100/20 dark:border-[var(--color-dark-border)]/30 shadow-xs group hover:border-accent/30 transition duration-300">
              <div className="p-4 bg-pink-100/40 dark:bg-pink-950/20 rounded-2xl text-accent group-hover:scale-110 transition duration-300">
                <Truck size={24} />
              </div>
              <h4 className="text-md font-bold font-heading text-secondary dark:text-[var(--color-dark-text)] mt-4">Free Shipping</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed max-w-xs">
                Enjoy complimentary, insured fast shipping on all domestic orders exceeding LKR 5,000.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Glow Stories (Testimonials) Section */}
      <div className="w-full max-w-7xl mx-auto px-6 py-16 border-b border-pink-100/30 dark:border-pink-950/20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-fancy text-pink-900 dark:text-[var(--color-dark-text)] tracking-wide">
            Glow Stories
          </h2>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2 font-main max-w-xl mx-auto">
            Hear from our beautiful community about their skin transformations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Testimonial 1 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[var(--color-dark-surface)] border border-pink-100/30 dark:border-[var(--color-dark-border)] shadow-xs flex flex-col justify-between h-full">
            <div className="space-y-3">
              <div className="flex text-amber-500 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-current" />
                ))}
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 italic leading-relaxed font-fancy">
                "My skin has never felt softer. The Charcoal Face Mask did wonders for my pores. Highly recommended!"
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 mt-4 border-t border-pink-50/50 dark:border-pink-950/20">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent/20 to-accent/40 text-accent font-bold text-xs flex items-center justify-center border border-accent/20">
                SK
              </div>
              <div>
                <h5 className="text-xs font-bold text-secondary dark:text-[var(--color-dark-text)]">Sashini K.</h5>
                <p className="text-[9px] text-gray-400 dark:text-gray-500">Verified Purchaser</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[var(--color-dark-surface)] border border-pink-100/30 dark:border-[var(--color-dark-border)] shadow-xs flex flex-col justify-between h-full">
            <div className="space-y-3">
              <div className="flex text-amber-500 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-current" />
                ))}
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 italic leading-relaxed font-fancy">
                "The hydration serum feels like absolute luxury. It sits beautifully under my makeup and gives a dewy finish."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 mt-4 border-t border-pink-50/50 dark:border-pink-950/20">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent/20 to-accent/40 text-accent font-bold text-xs flex items-center justify-center border border-accent/20">
                PM
              </div>
              <div>
                <h5 className="text-xs font-bold text-secondary dark:text-[var(--color-dark-text)]">Piyumi M.</h5>
                <p className="text-[9px] text-gray-400 dark:text-gray-500">Verified Purchaser</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[var(--color-dark-surface)] border border-pink-100/30 dark:border-[var(--color-dark-border)] shadow-xs flex flex-col justify-between h-full">
            <div className="space-y-3">
              <div className="flex text-amber-500 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-current" />
                ))}
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 italic leading-relaxed font-fancy">
                "Finally found a haircare range that addresses hairfall without weighing my hair down. Incredible formulas!"
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 mt-4 border-t border-pink-50/50 dark:border-pink-950/20">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent/20 to-accent/40 text-accent font-bold text-xs flex items-center justify-center border border-accent/20">
                RN
              </div>
              <div>
                <h5 className="text-xs font-bold text-secondary dark:text-[var(--color-dark-text)]">Ruvini N.</h5>
                <p className="text-[9px] text-gray-400 dark:text-gray-500">Verified Purchaser</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter signup module */}
      <div className="w-full max-w-7xl mx-auto px-6 py-16">
        <div className="relative overflow-hidden rounded-3xl border border-pink-100/30 dark:border-[var(--color-dark-border)]/50 bg-gradient-to-br from-white/60 to-pink-50/30 dark:from-[var(--color-dark-surface)]/60 dark:to-[var(--color-dark-bg)]/40 p-8 md:p-12 shadow-sm text-center max-w-4xl mx-auto">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl" />

          <div className="relative space-y-6 max-w-xl mx-auto">
            <div className="inline-flex p-3 bg-pink-100/40 dark:bg-pink-950/20 rounded-2xl text-accent border border-pink-100/20">
              <Mail size={20} />
            </div>
            <h3 className="text-2xl font-bold font-fancy text-pink-900 dark:text-[var(--color-dark-text)]">Join Our Beauty Club</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Subscribe to receive skincare secrets, new launch alerts, and LKR 1,000 off your first beauty order.
            </p>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Welcome to the Beauty Club! Check your inbox.");
                e.target.reset();
              }}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <input 
                type="email" 
                required
                placeholder="Your email address" 
                className="flex-grow px-4 py-2.5 rounded-xl border border-pink-100 dark:border-[var(--color-dark-border)] bg-white dark:bg-[var(--color-dark-bg)] text-xs text-secondary dark:text-[var(--color-dark-text)] focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
              <button 
                type="submit"
                className="px-6 py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded-xl transition duration-300 cursor-pointer shadow-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

