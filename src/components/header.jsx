import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Header() {
  const [sideDrawerOpened, setSideDrawerOpened] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  //Load cart count
  const loadCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    setCartCount(totalQty);
  };

  //Initial cart load
  useEffect(() => {
    loadCartCount();
  }, []);

  //Listen for cart updates
  useEffect(() => {
    window.addEventListener("cartUpdated", loadCartCount);
    window.addEventListener("storage", loadCartCount);

    return () => {
      window.removeEventListener("cartUpdated", loadCartCount);
      window.removeEventListener("storage", loadCartCount);
    };
  }, []);

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
    <header className="w-full h-[80px] shadow-lg bg-pink-200 flex justify-center relative">

      {/* Hamburger menu */}
      <GiHamburgerMenu
        className="h-full text-3xl md:hidden absolute left-2 text-pink-600"
        onClick={() => setSideDrawerOpened(true)}
      />

      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        src="/logo.png"
        alt="Logo"
        className="w-[80px] h-[80px] object-cover cursor-pointer"
      />

      {/* Links */}
      <div className="w-[calc(100%-160px)] h-full hidden md:flex justify-center items-center">
        <NavLink to="/" className={({ isActive }) => `text-[20px] font-bold mx-2 ${isActive ? "text-yellow-600" : "text-pink-900 hover:text-yellow-600"}`}>
          Home
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => `text-[20px] font-bold mx-2 ${isActive ? "text-yellow-600" : "text-pink-900 hover:text-yellow-600"}`}>
          Products
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => `text-[20px] font-bold mx-2 ${isActive ? "text-yellow-600" : "text-pink-900 hover:text-yellow-600"}`}>
          About
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => `text-[20px] font-bold mx-2 ${isActive ? "text-yellow-600" : "text-pink-900 hover:text-yellow-600"}`}>
          Contact
        </NavLink>
        <NavLink to="/search" className={({ isActive }) => `text-[20px] font-bold mx-2 ${isActive ? "text-yellow-600" : "text-pink-900 hover:text-yellow-600"}`}>
          Search
        </NavLink>
      </div>

      {/* Cart and User */}
      <div className="w-[150px] hidden md:flex justify-center items-center relative">
        <div className="relative">
          <Link to="/cart" className="text-pink-900">
            <BsCart3 className="text-[22px]" />
          </Link>

          {cartCount > 0 && (
            <span
              className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </div>

        {/* User icon */}
        {user ? (
          <div className="ml-4 relative flex">
            <div
              className="w-12 h-12 rounded-full bg-pink-500 hover:bg-pink-600 flex items-center justify-center text-white cursor-pointer shadow-md"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user.firstName[0]}
            </div>
            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-16 w-48 bg-white shadow-lg rounded-lg z-50 border border-pink-200">
                <div className="p-2 border-b border-pink-100">
                  <p className="font-bold text-pink-700">{user.firstName} {user.lastName}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 font-bold hover:bg-pink-100 text-pink-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
             className="ml-4 px-3 py-1 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600"
          >
            Login
          </Link>
        )}
      </div>

      {/* Side drawer for mobile */}
      {sideDrawerOpened && (
        <div className="fixed h-screen w-full bg-[#00000060] flex md:hidden z-60"
        onClick={() => setSideDrawerOpened(false)}>
            <div className="w-[350px] bg-pink-50 h-full flex flex-col shadow-lg"
            onClick={(e) => e.stopPropagation()}>
              <div className="w-full h-[80px] shadow-md flex justify-center items-center relative bg-pink-200">
                  <GiHamburgerMenu
                  className="h-full text-3xl absolute left-2 cursor-pointer text-pink-600"
                  onClick={() => setSideDrawerOpened(false)}
                  />
                  <img
                  onClick={() => (window.location.href = "/")}
                  src="/logo.png"
                  alt="Logo"
                  className="w-[70px] h-[70px] object-cover cursor-pointer rounded-full border-2 border-yellow-500"
                  />
              </div>

              <div className="w-full flex flex-col items-center gap-2">
                  {user ? (
                      <div className="flex flex-col items-center w-full">
                          {/* User info */}
                          <div className="flex flex-col items-center my-4">
                              <p className="font-bold text-pink-700">{user.firstName} {user.lastName}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                          </div>

                          {/* Links */}
                          <Link to="/" className="text-[20px] font-bold my-2 text-pink-700">Home</Link>
                          <Link to="/products" className="text-[20px] font-bold my-2 text-pink-700">Products</Link>
                          <Link to="/about" className="text-[20px] font-bold my-2 text-pink-700">About</Link>
                          <Link to="/contact" className="text-[20px] font-bold my-2 text-pink-700">Contact</Link>
                          <Link to="/search" className="text-[20px] font-bold my-2 text-pink-700">Search</Link>
                          <div className="my-2 relative">
                            <Link to="/cart" className="text-[20px] font-bold text-pink-700"
                              onClick={() => setSideDrawerOpened(false)}
                            >
                              <BsCart3 className="text-[22px]" />
                            </Link>
                            {cartCount > 0 && (
                              <span
                                className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
                                {cartCount}
                              </span>
                            )}
                          </div>

                          {/* Logout button */}
                          <button
                              onClick={() => {
                              handleLogout();
                              setSideDrawerOpened(false);
                              }}
                              className="w-full px-3 py-2 font-bold hover:bg-pink-100 mt-4 text-pink-700"
                          >
                              Logout
                          </button>
                      </div>
                  ) : (
                      <div className="flex flex-col items-center w-full">
                          {/* Links */}
                          <Link to="/" className="text-[20px] font-bold my-2 text-pink-700">Home</Link>
                          <Link to="/products" className="text-[20px] font-bold my-2 text-pink-700">Products</Link>
                          <Link to="/about" className="text-[20px] font-bold my-2 text-pink-700">About</Link>
                          <Link to="/contact" className="text-[20px] font-bold my-2 text-pink-700">Contact</Link>
                          <Link to="/search" className="text-[20px] font-bold my-2 text-pink-700">Search</Link>
                          <div className="my-2 relative">
                            <Link to="/cart" className="text-[20px] font-bold text-pink-700"
                                onClick={() => setSideDrawerOpened(false)}
                              >
                                <BsCart3 className="text-[22px]" />
                              </Link>
                              {cartCount > 0 && (
                                <span
                                  className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
                                  {cartCount}
                                </span>
                              )}
                          </div>
                          <Link
                          to="/login"
                          className="px-3 py-2 bg-pink-500 text-white rounded-lg my-4 hover:bg-pink-600"
                          onClick={() => setSideDrawerOpened(false)}
                          >
                              Login
                          </Link>
                      </div>
                  )}
              </div>
            </div>
        </div>
      )}
    </header>
  );
}
