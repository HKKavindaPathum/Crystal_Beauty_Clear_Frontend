import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import ProductsPage from "./admin/productsPage";
import AddProductPage from "./admin/addProductPage";
import EditProductPage from "./admin/editProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import ProductReviewsPage from "./admin/productsReviewPage";
import AdminUserPage from "./admin/usersPage";
import AdminAccount from "./admin/addAdminPage";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../components/loading";
import { Menu, LogOut } from "lucide-react";

export default function AdminPage() {
  const location = useLocation();
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
    <div className="h-screen w-full flex bg-gray-100 relative">
      {/* Sidebar Backdrop for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 z-40
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="p-6 text-center font-bold text-2xl text-accent">
          Dashboard
        </div>
        <nav className="flex flex-col space-y-2 px-4">
          {[
            { to: "/admin/products", label: "Products" },
            { to: "/admin/users", label: "Users" },
            { to: "/admin/orders", label: "Orders" },
            { to: "/admin/reviews", label: "Reviews" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-blue-200 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-accent">Admin Panel</h1>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            <LogOut className="h-5 w-5" /> Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
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
