import { MapPin, Phone, Mail } from "lucide-react";
import { 
  FaFacebookF, 
  FaPinterestP, 
  FaInstagram, 
  FaTiktok, 
  FaYoutube 
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-pink-100 dark:bg-[var(--color-dark-surface)] text-pink-955 dark:text-gray-300 font-[var(--font-main)] border-t border-pink-200 dark:border-[var(--color-dark-border)] transition-colors duration-300">
      {/* Centered Dual-Column Container with Reduced Vertical Padding */}
      <div className="w-full max-w-4xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20">
        
        {/* Column 1: Brand Info & Socials with Compact Spacing */}
        <div className="space-y-2.5">
          <div className="space-y-0.5">
            <h2 className="text-xl font-bold font-fancy text-pink-900 dark:text-accent tracking-wide">
              BeautyClear
            </h2>
            <p className="text-[9px] text-accent font-heading font-bold uppercase tracking-widest">
              Purity & Glow in Every Formulation
            </p>
          </div>
          <p className="text-xs text-pink-900/80 dark:text-gray-400 leading-relaxed">
            Discover original, premium, and cruelty-free skin formulation blends. Elevating your daily self-care routine with clean beauty.
          </p>
          {/* Social Icons with Sleek Margin */}
          <div className="flex items-center gap-3 pt-1">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              className="w-7.5 h-7.5 rounded-full bg-pink-200 dark:bg-gray-800/60 hover:bg-accent dark:hover:bg-accent hover:text-white flex items-center justify-center transition-colors duration-300 text-xs cursor-pointer"
            >
              <FaFacebookF />
            </a>
            <a 
              href="https://pinterest.com" 
              target="_blank" 
              rel="noreferrer" 
              className="w-7.5 h-7.5 rounded-full bg-pink-200 dark:bg-gray-800/60 hover:bg-accent dark:hover:bg-accent hover:text-white flex items-center justify-center transition-colors duration-300 text-xs cursor-pointer"
            >
              <FaPinterestP />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="w-7.5 h-7.5 rounded-full bg-pink-200 dark:bg-gray-800/60 hover:bg-accent dark:hover:bg-accent hover:text-white flex items-center justify-center transition-colors duration-300 text-xs cursor-pointer"
            >
              <FaInstagram />
            </a>
            <a 
              href="https://tiktok.com" 
              target="_blank" 
              rel="noreferrer" 
              className="w-7.5 h-7.5 rounded-full bg-pink-200 dark:bg-gray-800/60 hover:bg-accent dark:hover:bg-accent hover:text-white flex items-center justify-center transition-colors duration-300 text-xs cursor-pointer"
            >
              <FaTiktok />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer" 
              className="w-7.5 h-7.5 rounded-full bg-pink-200 dark:bg-gray-800/60 hover:bg-accent dark:hover:bg-accent hover:text-white flex items-center justify-center transition-colors duration-300 text-xs cursor-pointer"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Column 2: Contact Info with Tightened spacing */}
        <div className="space-y-3 md:pl-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-pink-900 dark:text-white font-heading">
            Connect With Us
          </h3>
          <ul className="space-y-2 text-xs text-pink-900/80 dark:text-gray-400">
            <li className="flex items-start gap-2">
              <MapPin size={14} className="text-accent shrink-0 mt-0.5" />
              <span>No: 120, Galle Road, Colombo 03, Sri Lanka</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone size={14} className="text-accent shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span>+94 11 999 8888</span>
                <span>+94 76 777 6666</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={14} className="text-accent shrink-0 mt-0.5" />
              <a href="mailto:cbeautyclear@gmail.com" className="hover:text-accent transition duration-300">
                cbeautyclear@gmail.com
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright Area with Sleek vertical padding */}
      <div className="w-full bg-pink-200/50 dark:bg-[#120D0E] py-3 border-t border-pink-200/30 dark:border-gray-800/80">
        <div className="w-full max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-[9px] text-pink-900/60 dark:text-gray-500 font-bold uppercase tracking-wider">
          <span>&copy; {new Date().getFullYear()}, CRYSTALBEAUTYCLEAR. ALL RIGHTS RESERVED.</span>
          <span>Powered by MERN Platform</span>
        </div>
      </div>
    </footer>
  );
}
