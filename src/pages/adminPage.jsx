import { NavLink, Route, Routes } from "react-router-dom";
import ProductsPage from "./admin/productsPage";
import AddProductPage from "./admin/addProductPage";
import EditProductPage from "./admin/editProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import ProductReviewsPage from "./admin/productsReviewPage";
import AdminUserPage from "./admin/usersPage";
import AdminAccount from "./admin/addAdminPage";
import AdminDashboard from "./admin/adminDashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../components/loading";
import { Menu, LogOut, LayoutDashboard, ShoppingBag, Users, ShoppingCart, Star, Sun, Moon } from "lucide-react";

export default function AdminPage() {
  const [status, setStatus] = useState("loading");
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Toggle dark class on <html>
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setStatus("unauthenticated");
      window.location.href = "/login";
    } else {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.role !== "admin") {
            setStatus("unauthorized");
            toast.error("You are not authorized to access this page");
            window.location.href = "/";
          } else {
            setUser(response.data);
            setStatus("authenticated");
          }
        })
        .catch(() => {
          setStatus("unauthenticated");
          toast.error("You are not authenticated, please login");
          window.location.href = "/login";
        });
    }
  }, []);

  if (status === "loading" || status === "unauthenticated") {
    return <Loading />;
  }

  return (
    <div className="h-screen w-full flex bg-[#FAF6F6] dark:bg-[#120D0E] text-secondary dark:text-[var(--color-dark-text)] transition-colors duration-300 overflow-hidden font-main">
      {/* Sidebar Backdrop for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white dark:bg-[var(--color-dark-surface)] border-r border-pink-100/40 dark:border-[var(--color-dark-border)] shadow-xl md:shadow-none transform transition-transform duration-300 z-40 flex flex-col justify-between
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex flex-col flex-1">
          {/* Logo Title */}
          <div className="h-16 flex items-center justify-center font-bold text-xl font-heading text-accent tracking-widest border-b border-pink-50/50 dark:border-[var(--color-dark-border)] uppercase">
            BeautyClear
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col space-y-1.5 px-4 mt-6">
            {[
              { to: "/admin", label: "Dashboard", icon: <LayoutDashboard size={18} />, end: true },
              { to: "/admin/products", label: "Products", icon: <ShoppingBag size={18} /> },
              { to: "/admin/users", label: "Users", icon: <Users size={18} /> },
              { to: "/admin/orders", label: "Orders", icon: <ShoppingCart size={18} /> },
              { to: "/admin/reviews", label: "Reviews", icon: <Star size={18} /> },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition border-l-4 ${
                    isActive
                      ? "bg-accent/10 border-accent text-accent font-bold shadow-xs"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:bg-pink-50/50 dark:hover:bg-[#120D0E]/50 hover:text-secondary dark:hover:text-[var(--color-dark-text)]"
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer: Profile Card */}
        {user && (
          <div className="p-4 border-t border-pink-50/50 dark:border-[var(--color-dark-border)] bg-pink-50/10 dark:bg-[#120D0E]/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center font-bold shadow-sm flex-shrink-0">
              {user.firstName[0].toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-secondary dark:text-[var(--color-dark-text)] truncate leading-tight">
                {user.firstName} {user.lastName}
              </p>
              <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-accent/20 text-accent uppercase leading-none">
                Admin Profile
              </span>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Glassmorphic Topbar Header */}
        <header className="h-16 bg-white/70 dark:bg-[var(--color-dark-surface)]/70 backdrop-blur-md border-b border-pink-100/40 dark:border-[var(--color-dark-border)] shadow-xs flex items-center justify-between px-6 z-10 transition-colors duration-300">
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
          
          <h2 className="text-lg font-bold font-heading text-secondary dark:text-[var(--color-dark-text)] hidden sm:block">
            Console Workspace
          </h2>
          
          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-xl bg-pink-50 dark:bg-dark-surface hover:bg-pink-100/60 dark:hover:bg-dark-border text-pink-600 dark:text-accent transition duration-300 cursor-pointer shadow-xs border border-pink-100/20 dark:border-dark-border"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-xl shadow-md transition duration-300 cursor-pointer transform active:scale-95"
            >
              <LogOut className="h-4.5 w-4.5" /> <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content Dashboard Panel */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#FAF6F6] dark:bg-[#120D0E] transition-colors duration-300">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/users" element={<AdminUserPage />} />
            <Route path="/add-admin" element={<AdminAccount />} />
            <Route path="/orders" element={<AdminOrdersPage />} />
            <Route path="/reviews" element={<ProductReviewsPage />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/edit-product" element={<EditProductPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
