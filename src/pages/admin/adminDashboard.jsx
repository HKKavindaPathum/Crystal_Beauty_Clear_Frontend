import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/loading";
import toast from "react-hot-toast";
import { DollarSign, ShoppingBag, Users, AlertTriangle } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    lowStockCount: 0,
  });
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/orders/dashboard/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { totalSales, totalOrders, totalUsers, totalProducts, lowStockCount, lowStockProducts } = res.data;

        setStats({
          totalSales,
          totalOrders,
          totalUsers,
          totalProducts,
          lowStockCount,
        });

        setLowStockProducts(lowStockProducts);
      } catch (err) {
        toast.error("Failed to load dashboard statistics");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="space-y-6 font-[var(--font-main)]">
      <h1 className="text-3xl font-extrabold font-heading text-secondary dark:text-[var(--color-dark-text)]">
        Analytics Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Sales */}
        <div className="bg-white dark:bg-[var(--color-dark-surface)] p-6 rounded-2xl shadow-sm border border-pink-100/50 dark:border-[var(--color-dark-border)] flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Sales</p>
            <h3 className="text-2xl font-bold mt-1 text-secondary dark:text-[var(--color-dark-text)]">
              Rs. {stats.totalSales.toLocaleString()}
            </h3>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <DollarSign size={24} />
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white dark:bg-[var(--color-dark-surface)] p-6 rounded-2xl shadow-sm border border-pink-100/50 dark:border-[var(--color-dark-border)] flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</p>
            <h3 className="text-2xl font-bold mt-1 text-secondary dark:text-[var(--color-dark-text)]">
              {stats.totalOrders}
            </h3>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 rounded-xl">
            <ShoppingBag size={24} />
          </div>
        </div>

        {/* Registered Users */}
        <div className="bg-white dark:bg-[var(--color-dark-surface)] p-6 rounded-2xl shadow-sm border border-pink-100/50 dark:border-[var(--color-dark-border)] flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
            <h3 className="text-2xl font-bold mt-1 text-secondary dark:text-[var(--color-dark-text)]">
              {stats.totalUsers}
            </h3>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 rounded-xl">
            <Users size={24} />
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white dark:bg-[var(--color-dark-surface)] p-6 rounded-2xl shadow-sm border border-pink-100/50 dark:border-[var(--color-dark-border)] flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Low Stock Alert</p>
            <h3 className="text-2xl font-bold mt-1 text-red-600 dark:text-red-500">
              {stats.lowStockCount}
            </h3>
          </div>
          <div className={`p-3 rounded-xl ${stats.lowStockCount > 0 ? "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 animate-pulse" : "bg-gray-50 dark:bg-gray-800 text-gray-400"}`}>
            <AlertTriangle size={24} />
          </div>
        </div>
      </div>

      {/* Low Stock Table details */}
      <div className="bg-white dark:bg-[var(--color-dark-surface)] rounded-2xl border border-pink-100/50 dark:border-[var(--color-dark-border)] p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4 font-heading text-secondary dark:text-[var(--color-dark-text)] flex items-center gap-2">
          Inventory Alert (Low Stock)
        </h2>
        {lowStockProducts.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 py-4">All products are well stocked! ✅</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-gray-100 dark:border-[var(--color-dark-border)] text-gray-400">
                  <th className="py-3 px-2">Image</th>
                  <th className="py-3 px-2">Product Name</th>
                  <th className="py-3 px-2">Product ID</th>
                  <th className="py-3 px-2">Category</th>
                  <th className="py-3 px-2 text-red-600 dark:text-red-400">Stock Left</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-[var(--color-dark-border)]">
                {lowStockProducts.map((p) => (
                  <tr key={p.productId} className="text-gray-700 dark:text-gray-300">
                    <td className="py-3 px-2">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-10 h-10 object-cover rounded-lg border border-gray-100 dark:border-gray-800"
                      />
                    </td>
                    <td className="py-3 px-2 font-medium">{p.name}</td>
                    <td className="py-3 px-2 text-xs font-mono">{p.productId}</td>
                    <td className="py-3 px-2 capitalize">{p.category}</td>
                    <td className="py-3 px-2 text-red-600 dark:text-red-500 font-bold">{p.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
