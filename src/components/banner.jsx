import { useNavigate } from "react-router-dom";
import bannerImg from "../../public/banner.png";
import bannerImage from "../../public/bannerImage.png";


export default function Banner() {
  const navigate = useNavigate();
  return (
    <section
      className="relative w-full rounded-3xl shadow-xl border-2 border-accent dark:border-[var(--color-accent)] overflow-hidden bg-cover bg-center bg-no-repeat transition-all duration-300"
      style={{ 
        backgroundImage: `url(${bannerImg})`,
        minHeight: '350px' 
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-pink-50/65 dark:bg-black/70 transition-colors duration-300"></div>

      <div className="relative container mx-auto px-6 md:px-16 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* Left Content */}
        <div className="text-center md:text-left z-10">
          <h1 className="text-3xl md:text-5xl font-bold font-fancy text-pink-900 dark:text-[var(--color-dark-text)] mb-3 tracking-wide">
            Beauty Products
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-md text-sm md:text-base leading-relaxed">
            Discover our wide selection of high-quality beauty products that
            bring out your natural glow.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-accent hover:bg-accent-hover text-white font-bold px-6 py-3 rounded-xl shadow-md transition duration-300 cursor-pointer"
          >
            Shop Now
          </button>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end z-10">
          <img
            src={bannerImage}
            alt="Beauty Products"
            className="rounded-full shadow-lg max-w-[200px] md:max-w-sm w-full border-2 border-accent dark:border-[var(--color-accent)] object-cover"
          />
        </div>
      </div>
    </section>
  )
};
