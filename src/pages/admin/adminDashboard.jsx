import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/loading";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  PlusCircle, 
  UserPlus, 
  Star, 
  ArrowUpRight, 
  Activity, 
  FolderHeart, 
  ShieldAlert 
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";

const COLORS = ["#D4AF37", "#E6C280", "#C5A028", "#8D6E1A"];

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    lowStockCount: 0,
    lowStockProducts: [],
    salesOverTime: [],
    categoryDistribution: [],
    topProducts: [],
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/orders/dashboard/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStats(res.data);
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

  // Mock data fallbacks for visuals if DB is empty
  const mockSalesOverTime = [
    { name: "Mon", sales: 12000, orders: 4 },
    { name: "Tue", sales: 19000, orders: 5 },
    { name: "Wed", sales: 15000, orders: 3 },
    { name: "Thu", sales: 22000, orders: 6 },
    { name: "Fri", sales: 30000, orders: 8 },
    { name: "Sat", sales: 25000, orders: 7 },
    { name: "Sun", sales: 34000, orders: 9 }
  ];

  const mockCategoryData = [
    { name: "Skincare", value: 3 },
    { name: "Makeup", value: 2 },
    { name: "Haircare", value: 1 }
  ];

  const mockTopProducts = [
    { name: "Charcoal Face Mask", salesCount: 14, image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=200" },
    { name: "Hydrating Serum", salesCount: 9, image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=200" },
    { name: "Glow Highlighter", salesCount: 6, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200" }
  ];

  // Process data for charts
  const salesChartData = stats.salesOverTime && stats.salesOverTime.length > 0 
    ? stats.salesOverTime.map(item => ({
        name: new Date(item._id).toLocaleDateString("en-GB", { weekday: 'short' }),
        sales: item.sales,
        orders: item.orders
      }))
    : mockSalesOverTime;

  const categoryChartData = stats.categoryDistribution && stats.categoryDistribution.length > 0
    ? stats.categoryDistribution.map(item => ({
        name: item._id ? item._id.charAt(0).toUpperCase() + item._id.slice(1) : "General",
        value: item.count
      }))
    : mockCategoryData;

  const topProductsData = stats.topProducts && stats.topProducts.length > 0
    ? stats.topProducts
    : mockTopProducts;

  return (
    <div className="space-y-8 font-[var(--font-main)]">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-secondary dark:text-[var(--color-dark-text)]">
            Analytics Dashboard
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Real-time visual summary of store performance, inventory alerts, and operations.
          </p>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Sales */}
        <div className="bg-white dark:bg-[var(--color-dark-surface)] p-6 rounded-2xl shadow-sm border border-pink-100/40 dark:border-[var(--color-dark-border)] flex items-center justify-between hover:shadow-[0_8px_30px_rgba(16,185,129,0.06)] hover:border-emerald-500/30 transition-all duration-300 group">
          <div>
            <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider font-heading">Total Sales</p>
            <h3 className="text-2xl font-extrabold mt-1.5 text-secondary dark:text-[var(--color-dark-text)] tracking-tight">
              Rs. {stats.totalSales.toLocaleString()}
            </h3>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-xl group-hover:scale-105 transition-transform duration-300">
            <DollarSign size={22} />
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white dark:bg-[var(--color-dark-surface)] p-6 rounded-2xl shadow-sm border border-pink-100/40 dark:border-[var(--color-dark-border)] flex items-center justify-between hover:shadow-[0_8px_30px_rgba(59,130,246,0.06)] hover:border-blue-500/30 transition-all duration-300 group">
          <div>
            <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider font-heading">Total Orders</p>
            <h3 className="text-2xl font-extrabold mt-1.5 text-secondary dark:text-[var(--color-dark-text)] tracking-tight">
              {stats.totalOrders}
            </h3>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 rounded-xl group-hover:scale-105 transition-transform duration-300">
            <ShoppingBag size={22} />
          </div>
        </div>

        {/* Registered Users */}
        <div className="bg-white dark:bg-[var(--color-dark-surface)] p-6 rounded-2xl shadow-sm border border-pink-100/40 dark:border-[var(--color-dark-border)] flex items-center justify-between hover:shadow-[0_8px_30px_rgba(147,51,234,0.06)] hover:border-purple-500/30 transition-all duration-300 group">
          <div>
            <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider font-heading">Total Users</p>
            <h3 className="text-2xl font-extrabold mt-1.5 text-secondary dark:text-[var(--color-dark-text)] tracking-tight">
              {stats.totalUsers}
            </h3>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 rounded-xl group-hover:scale-105 transition-transform duration-300">
            <Users size={22} />
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white dark:bg-[var(--color-dark-surface)] p-6 rounded-2xl shadow-sm border border-pink-100/40 dark:border-[var(--color-dark-border)] flex items-center justify-between hover:shadow-[0_8px_30px_rgba(239,68,68,0.06)] hover:border-red-500/30 transition-all duration-300 group">
          <div>
            <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider font-heading">Low Stock Alert</p>
            <h3 className="text-2xl font-extrabold mt-1.5 text-red-600 dark:text-red-500 tracking-tight">
              {stats.lowStockCount}
            </h3>
          </div>
          <div className={`p-3 rounded-xl transition-all duration-300 ${
            stats.lowStockCount > 0 
              ? "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 animate-pulse scale-105" 
              : "bg-gray-50 dark:bg-gray-800 text-gray-400"
          }`}>
            <AlertTriangle size={22} />
          </div>
        </div>
      </div>

      {/* Charts Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend Line Chart (Col span 2) */}
        <div className="bg-white dark:bg-[var(--color-dark-surface)] border border-pink-100/40 dark:border-[var(--color-dark-border)] rounded-3xl p-6 shadow-sm lg:col-span-2 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-sm font-bold font-heading text-secondary dark:text-[var(--color-dark-text)] flex items-center gap-1.5">
                <TrendingUp size={16} className="text-accent" />
                Sales & Revenue Trends
              </h3>
              <p className="text-[10px] text-gray-400 dark:text-gray-500">Invoice volumes aggregated by day of transaction.</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(212,175,55,0.08)" />
                <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `Rs.${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--color-dark-surface, #1C1416)", 
                    borderRadius: "12px", 
                    borderColor: "var(--color-dark-border, #2C2224)",
                    color: "#fff"
                  }}
                  itemStyle={{ color: "#D4AF37" }}
                />
                <Area type="monotone" dataKey="sales" stroke="#D4AF37" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share Distribution Chart (Col span 1) */}
        <div className="bg-white dark:bg-[var(--color-dark-surface)] border border-pink-100/40 dark:border-[var(--color-dark-border)] rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold font-heading text-secondary dark:text-[var(--color-dark-text)] flex items-center gap-1.5 mb-1">
              <FolderHeart size={16} className="text-accent" />
              Category Inventory Share
            </h3>
            <p className="text-[10px] text-gray-400 dark:text-gray-500">Distribution share of active catalog items.</p>
          </div>
          <div className="h-48 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--color-dark-surface, #1C1416)", 
                    borderRadius: "12px", 
                    borderColor: "var(--color-dark-border, #2C2224)",
                    color: "#fff" 
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-secondary dark:text-[var(--color-dark-text)]">{stats.totalProducts}</span>
              <span className="text-[9px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-bold">Products</span>
            </div>
          </div>
          {/* Legend Items */}
          <div className="flex justify-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
            {categoryChartData.map((entry, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                <span>{entry.name} ({entry.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Multi-Column Operations Center */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Top Selling Leaderboard & Quick Actions */}
        <div className="space-y-6">
          {/* Quick Actions Panel */}
          <div className="bg-white dark:bg-[var(--color-dark-surface)] border border-pink-100/40 dark:border-[var(--color-dark-border)] rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold font-heading text-secondary dark:text-[var(--color-dark-text)] mb-4 flex items-center gap-1.5">
              <Activity size={16} className="text-accent" />
              Quick Actions Panel
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Link 
                to="/admin/add-product" 
                className="flex items-center gap-2 p-3 rounded-xl bg-pink-50/20 dark:bg-pink-950/10 border border-pink-100/10 dark:border-pink-950/20 hover:border-accent/40 text-xs font-bold text-secondary dark:text-[var(--color-dark-text)] transition duration-300 cursor-pointer"
              >
                <PlusCircle size={14} className="text-accent" />
                Add Product
              </Link>
              <Link 
                to="/admin/add-admin" 
                className="flex items-center gap-2 p-3 rounded-xl bg-pink-50/20 dark:bg-pink-950/10 border border-pink-100/10 dark:border-pink-950/20 hover:border-accent/40 text-xs font-bold text-secondary dark:text-[var(--color-dark-text)] transition duration-300 cursor-pointer"
              >
                <UserPlus size={14} className="text-accent" />
                Create Admin
              </Link>
            </div>
          </div>

          {/* Top Selling Products Leaderboard */}
          <div className="bg-white dark:bg-[var(--color-dark-surface)] border border-pink-100/40 dark:border-[var(--color-dark-border)] rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold font-heading text-secondary dark:text-[var(--color-dark-text)] mb-4 flex items-center gap-1.5">
              <Star size={16} className="text-accent" />
              Best-Selling Items
            </h3>
            <div className="space-y-3">
              {topProductsData.map((p, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-xl hover:bg-pink-50/10 dark:hover:bg-gray-800/10 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="w-9 h-9 object-cover rounded-lg border border-pink-100/20" />
                    ) : (
                      <div className="w-9 h-9 rounded-lg bg-pink-100 dark:bg-pink-950/20 flex items-center justify-center text-accent"><ShoppingBag size={14} /></div>
                    )}
                    <span className="text-xs font-bold text-secondary dark:text-[var(--color-dark-text)] truncate max-w-[130px]">{p.name}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400">{p.salesCount} sold</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column: Recent Orders Activity Log */}
        <div className="bg-white dark:bg-[var(--color-dark-surface)] border border-pink-100/40 dark:border-[var(--color-dark-border)] rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold font-heading text-secondary dark:text-[var(--color-dark-text)] flex items-center gap-1.5">
              <ShoppingBag size={16} className="text-accent" />
              Recent Operations
            </h3>
            <Link to="/admin/orders" className="text-[10px] text-accent hover:underline flex items-center gap-0.5">
              View All <ArrowUpRight size={10} />
            </Link>
          </div>
          {stats.recentOrders && stats.recentOrders.length === 0 ? (
            <p className="text-xs text-gray-400 dark:text-gray-500 py-8 text-center">No recent purchases recorded.</p>
          ) : (
            <div className="space-y-4">
              {stats.recentOrders?.map((ord, idx) => (
                <div key={idx} className="flex justify-between items-start pb-3.5 border-b border-pink-50/10 dark:border-pink-950/20 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-secondary dark:text-[var(--color-dark-text)]">{ord.name}</p>
                    <p className="text-[9px] font-mono text-gray-400 dark:text-gray-500">{ord.orderId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-extrabold text-accent">Rs. {ord.total.toLocaleString()}</p>
                    <span className="text-[8px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      {new Date(ord.date).toLocaleDateString("en-GB")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Inventory Stock Alert Table */}
        <div className="bg-white dark:bg-[var(--color-dark-surface)] border border-pink-100/40 dark:border-[var(--color-dark-border)] rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold font-heading text-secondary dark:text-[var(--color-dark-text)] flex items-center gap-1.5">
                <ShieldAlert size={16} className="text-red-500" />
                Critical Inventory Alerts
              </h3>
            </div>
            {stats.lowStockProducts?.length === 0 ? (
              <p className="text-xs text-gray-500 dark:text-gray-400 py-12 text-center">
                All catalog items are fully stocked! 🎉
              </p>
            ) : (
              <div className="space-y-3">
                {stats.lowStockProducts?.slice(0, 4).map((p) => (
                  <div key={p.productId} className="flex justify-between items-center p-2 rounded-xl bg-red-500/5 border border-red-500/10">
                    <div className="flex items-center gap-2">
                      <img src={p.images[0]} alt={p.name} className="w-8 h-8 object-cover rounded-lg border border-red-500/10" />
                      <div>
                        <p className="text-xs font-bold text-secondary dark:text-[var(--color-dark-text)] truncate max-w-[120px]">{p.name}</p>
                        <span className="text-[8px] font-mono text-gray-400">{p.productId}</span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-red-500">{p.stock} left</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {stats.lowStockProducts?.length > 4 && (
            <div className="text-center pt-3 border-t border-pink-50/10 dark:border-pink-950/20 mt-4">
              <span className="text-[9px] uppercase tracking-wider text-red-500 font-bold">
                + {stats.lowStockProducts.length - 4} more warnings active
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
