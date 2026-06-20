import { useNavigate } from "react-router-dom";
import Banner from "./banner";
import Skincare from "../../public/SkinCare.png";
import Makeup from "../../public/MakeUp.png";
import Haircare from "../../public/HairCare.png";

export default function HomeContent() {
  const navigate = useNavigate();

  const goToCategory = (category) => {
    navigate(`/products/${category}`);
  };

  return (
    <div className="bg-pink-50 dark:bg-[var(--color-dark-bg)] pt-4 flex flex-col items-center w-full min-h-screen transition-colors duration-300">
      <Banner />

      <div className="w-full max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-bold font-fancy text-pink-900 dark:text-[var(--color-dark-text)] mb-10 text-center tracking-wide">
          Shop by Category
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Skincare */}
          <div
            onClick={() => goToCategory("skincare")}
            className="relative group flex-1 rounded-3xl border-2 border-accent dark:border-[var(--color-accent)] overflow-hidden shadow-xl hover:shadow-2xl cursor-pointer transition-transform transform hover:scale-[1.03] duration-300"
          >
            <img
              src={Skincare}
              alt="Skincare"
              className="w-full h-64 md:h-80 object-cover brightness-95 group-hover:brightness-100 transition duration-300"
            />
            <div className="absolute inset-0 bg-pink-50/40 dark:bg-black/30 flex items-center justify-center backdrop-blur-xs group-hover:backdrop-blur-none transition duration-300">
              <h3 className="text-3xl font-bold font-fancy text-pink-900 dark:text-white drop-shadow-md">Skincare</h3>
            </div>
          </div>

          {/* Makeup */}
          <div
            onClick={() => goToCategory("makeup")}
            className="relative group flex-1 rounded-3xl border-2 border-accent dark:border-[var(--color-accent)] overflow-hidden shadow-xl hover:shadow-2xl cursor-pointer transition-transform transform hover:scale-[1.03] duration-300"
          >
            <img
              src={Makeup}
              alt="Makeup"
              className="w-full h-64 md:h-80 object-cover brightness-95 group-hover:brightness-100 transition duration-300"
            />
            <div className="absolute inset-0 bg-pink-50/40 dark:bg-black/30 flex items-center justify-center backdrop-blur-xs group-hover:backdrop-blur-none transition duration-300">
              <h3 className="text-3xl font-bold font-fancy text-pink-900 dark:text-white drop-shadow-md">Makeup</h3>
            </div>
          </div>

          {/* Haircare */}
          <div
            onClick={() => goToCategory("haircare")}
            className="relative group flex-1 rounded-3xl border-2 border-accent dark:border-[var(--color-accent)] overflow-hidden shadow-xl hover:shadow-2xl cursor-pointer transition-transform transform hover:scale-[1.03] duration-300"
          >
            <img
              src={Haircare}
              alt="Haircare"
              className="w-full h-64 md:h-80 object-cover brightness-95 group-hover:brightness-100 transition duration-300"
            />
            <div className="absolute inset-0 bg-pink-50/40 dark:bg-black/30 flex items-center justify-center backdrop-blur-xs group-hover:backdrop-blur-none transition duration-300">
              <h3 className="text-3xl font-bold font-fancy text-pink-900 dark:text-white drop-shadow-md">Haircare</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
