import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSun, BiMoon } from "react-icons/bi";
import { useState, useEffect } from "react";
import axios from "axios";
import CartDrawer from "./CartDrawer";

export default function Header() {
  const [sideDrawerOpened, setSideDrawerOpened] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Load cart count
  const loadCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    setCartCount(totalQty);
  };

  // Initial cart load
  useEffect(() => {
    loadCartCount();
  }, []);

  // Listen for cart updates
  useEffect(() => {
    window.addEventListener("cartUpdated", loadCartCount);
    window.addEventListener("storage", loadCartCount);

    return () => {
      window.removeEventListener("cartUpdated", loadCartCount);
      window.removeEventListener("storage", loadCartCount);
    };
  }, []);

  // Toggle dark class on <html>
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Fetch logged-in user
  useEffect(() => {
    if (token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="w-full h-[80px] shadow-lg bg-pink-200 dark:bg-[var(--color-dark-surface)] border-b dark:border-[var(--color-dark-border)] flex justify-between items-center px-4 md:px-8 relative transition-colors duration-300">
      
      {/* Mobile Drawer Trigger */}
      <GiHamburgerMenu
        className="text-3xl md:hidden cursor-pointer text-pink-600 dark:text-[var(--color-accent)]"
        onClick={() => setSideDrawerOpened(true)}
      />

      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          onClick={() => navigate("/")}
          src="/logo.png"
          alt="Logo"
          className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] object-cover cursor-pointer rounded-full border border-pink-100/50"
        />
        <span 
          onClick={() => navigate("/")}
          className="hidden lg:block font-fancy text-xl font-bold text-pink-900 dark:text-[var(--color-accent)] cursor-pointer tracking-wider"
        >
          BeautyClear
        </span>
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center justify-center gap-6">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `text-md font-semibold font-heading tracking-wide transition ${isActive ? "text-accent font-bold" : "text-pink-900 dark:text-gray-300 hover:text-accent"}`
          }
        >
          Home
        </NavLink>
        <NavLink 
          to="/products" 
          className={({ isActive }) => 
            `text-md font-semibold font-heading tracking-wide transition ${isActive ? "text-accent font-bold" : "text-pink-900 dark:text-gray-300 hover:text-accent"}`
          }
        >
          Products
        </NavLink>
        <NavLink 
          to="/about" 
          className={({ isActive }) => 
            `text-md font-semibold font-heading tracking-wide transition ${isActive ? "text-accent font-bold" : "text-pink-900 dark:text-gray-300 hover:text-accent"}`
          }
        >
          About
        </NavLink>
        <NavLink 
          to="/contact" 
          className={({ isActive }) => 
            `text-md font-semibold font-heading tracking-wide transition ${isActive ? "text-accent font-bold" : "text-pink-900 dark:text-gray-300 hover:text-accent"}`
          }
        >
          Contact
        </NavLink>
        <NavLink 
          to="/search" 
          className={({ isActive }) => 
            `text-md font-semibold font-heading tracking-wide transition ${isActive ? "text-accent font-bold" : "text-pink-900 dark:text-gray-300 hover:text-accent"}`
          }
        >
          Search
        </NavLink>
      </nav>

      {/* Cart, Theme & User Icons */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2 rounded-full hover:bg-pink-300/30 dark:hover:bg-pink-950/20 text-pink-900 dark:text-gray-300 transition cursor-pointer"
        >
          {theme === "light" ? <BiMoon size={22} /> : <BiSun size={22} />}
        </button>

        {/* Cart Icon Trigger */}
        <div 
          onClick={() => setIsCartDrawerOpen(true)}
          className="relative p-2 rounded-full hover:bg-pink-300/30 dark:hover:bg-pink-950/20 text-pink-900 dark:text-gray-300 cursor-pointer transition"
        >
          <BsCart3 className="text-[22px]" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full font-bold">
              {cartCount}
            </span>
          )}
        </div>

        {/* User Icon */}
        {user ? (
          <div className="relative">
            <div
              className="w-10 h-10 rounded-full bg-accent hover:bg-accent-hover flex items-center justify-center text-white font-bold cursor-pointer shadow-md transition"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user.firstName[0].toUpperCase()}
            </div>
            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-[var(--color-dark-surface)] shadow-xl rounded-xl z-50 border border-pink-100 dark:border-[var(--color-dark-border)] animate-fadeIn">
                <div className="p-3 border-b border-pink-100 dark:border-[var(--color-dark-border)]">
                  <p className="font-bold text-pink-900 dark:text-[var(--color-dark-text)] text-sm">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm font-bold hover:bg-pink-50 dark:hover:bg-pink-950/10 text-red-500 rounded-b-xl transition cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="px-4 py-1.5 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-xl shadow-md transition cursor-pointer"
          >
            Login
          </Link>
        )}
      </div>

      {/* Side drawer for mobile */}
      {sideDrawerOpened && (
        <div 
          className="fixed h-screen w-full bg-black/40 backdrop-blur-xs flex md:hidden z-50 transition-opacity"
          onClick={() => setSideDrawerOpened(false)}
        >
          <div 
            className="w-[300px] bg-white dark:bg-[var(--color-dark-surface)] h-full flex flex-col shadow-2xl border-r dark:border-[var(--color-dark-border)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="w-full h-[80px] px-4 flex justify-between items-center border-b border-pink-100 dark:border-[var(--color-dark-border)] bg-pink-100 dark:bg-[var(--color-dark-bg)]">
              <GiHamburgerMenu
                className="text-3xl cursor-pointer text-pink-600 dark:text-[var(--color-accent)]"
                onClick={() => setSideDrawerOpened(false)}
              />
              <img
                onClick={() => { setSideDrawerOpened(false); navigate("/"); }}
                src="/logo.png"
                alt="Logo"
                className="w-[60px] h-[60px] object-cover cursor-pointer rounded-full border"
              />
            </div>

            {/* Mobile Nav Links */}
            <div className="w-full flex-1 flex flex-col items-center gap-4 py-6">
              <Link to="/" onClick={() => setSideDrawerOpened(false)} className="text-lg font-semibold text-pink-900 dark:text-gray-200 hover:text-accent">Home</Link>
              <Link to="/products" onClick={() => setSideDrawerOpened(false)} className="text-lg font-semibold text-pink-900 dark:text-gray-200 hover:text-accent">Products</Link>
              <Link to="/about" onClick={() => setSideDrawerOpened(false)} className="text-lg font-semibold text-pink-900 dark:text-gray-200 hover:text-accent">About</Link>
              <Link to="/contact" onClick={() => setSideDrawerOpened(false)} className="text-lg font-semibold text-pink-900 dark:text-gray-200 hover:text-accent">Contact</Link>
              <Link to="/search" onClick={() => setSideDrawerOpened(false)} className="text-lg font-semibold text-pink-900 dark:text-gray-200 hover:text-accent">Search</Link>

              {user ? (
                <div className="flex flex-col items-center w-full mt-4 border-t border-pink-100 dark:border-[var(--color-dark-border)] pt-4">
                  <p className="font-bold text-pink-700 dark:text-[var(--color-dark-text)]">{user.firstName} {user.lastName}</p>
                  <p className="text-sm text-gray-400 mb-6">{user.email}</p>
                  <button
                    onClick={() => { handleLogout(); setSideDrawerOpened(false); }}
                    className="w-3/4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="w-3/4 py-2 bg-accent hover:bg-accent-hover text-white rounded-xl font-bold transition text-center mt-6 cursor-pointer"
                  onClick={() => setSideDrawerOpened(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart Slide-out Drawer */}
      <CartDrawer isOpen={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} />
    </header>
  );
}
