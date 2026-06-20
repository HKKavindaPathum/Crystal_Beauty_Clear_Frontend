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
import { Menu, LogOut, LayoutDashboard, ShoppingBag, Users, ShoppingCart, Star } from "lucide-react";

export default function AdminPage() {
  const [status, setStatus] = useState("loading");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="h-screen w-full flex bg-gray-100 dark:bg-[var(--color-dark-bg)] transition-colors duration-300">
      {/* Sidebar Backdrop for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-72 bg-white dark:bg-[var(--color-dark-surface)] border-r border-pink-100/50 dark:border-[var(--color-dark-border)] shadow-xl md:shadow-none transform transition-transform duration-300 z-40
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="p-6 text-center font-bold text-2xl font-heading text-accent tracking-wide border-b border-pink-50 dark:border-[var(--color-dark-border)]">
          BeautyClear
        </div>
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
                `flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold transition ${
                  isActive
                    ? "bg-accent/20 text-accent font-bold shadow-xs"
                    : "text-gray-600 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-800"
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white dark:bg-[var(--color-dark-surface)] border-b border-pink-100/50 dark:border-[var(--color-dark-border)] shadow-xs flex items-center justify-between px-6 transition-colors duration-300">
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
          
          <h1 className="text-xl font-bold font-heading text-secondary dark:text-[var(--color-dark-text)] hidden sm:block">
            Admin Panel
          </h1>
          
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-xl shadow-md transition cursor-pointer"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-pink-50/20 dark:bg-[var(--color-dark-bg)] transition-colors duration-300">
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
