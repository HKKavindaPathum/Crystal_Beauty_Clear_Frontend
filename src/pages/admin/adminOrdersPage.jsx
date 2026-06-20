import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import Modal from "react-modal";
import toast from "react-hot-toast";
import { Search, Printer, X, Eye } from "lucide-react";

// Helper function to render modern status pill badges with a pulsing dot indicator
function getStatusPill(status) {
  const normStatus = status.toLowerCase();
  let bgTextClass = "";
  switch(normStatus) {
    case "completed":
    case "delivered":
      bgTextClass = "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/40";
      break;
    case "pending":
      bgTextClass = "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/40";
      break;
    case "cancelled":
      bgTextClass = "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/40";
      break;
    case "returned":
      bgTextClass = "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/40";
      break;
    default:
      bgTextClass = "bg-gray-50 text-gray-600 border-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700/50";
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${bgTextClass}`}>
      <span className="w-1 h-1 rounded-full bg-current mr-1.5 animate-pulse" />
      {status}
    </span>
  );
}

export default function AdminOrdersPage() {
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [activeOrder, setActiveOrder] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");

	useEffect(() => {
		if (isLoading) {
			const token = localStorage.getItem("token");
			if (!token) {
				toast.error("Please login first");
				return;
			}
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
					headers: {
						Authorization: "Bearer " + token,
					},
				})
				.then((res) => {
					setOrders(res.data);
					setIsLoading(false);
				})
				.catch((e) => {
					toast.error(
						"Error fetching orders: " +
							(e.response?.data?.message || "Unknown error")
					);
					setIsLoading(false);
				});
		}
	}, [isLoading]);

	const filteredOrders = orders.filter((order) => {
		const query = searchQuery.toLowerCase();
		const matchesSearch = 
			order.orderId?.toLowerCase().includes(query) ||
			order.name?.toLowerCase().includes(query) ||
			order.email?.toLowerCase().includes(query) ||
			order.phone?.toLowerCase().includes(query);

		const matchesStatus = 
			statusFilter === "all" || 
			order.status?.toLowerCase() === statusFilter;

		return matchesSearch && matchesStatus;
	});

	return (
		<div className="space-y-6 font-[var(--font-main)]">
			{/* Top Panel Header */}
			<div>
				<h1 className="text-2xl font-bold font-heading text-secondary dark:text-[var(--color-dark-text)]">
					Orders Management
				</h1>
				<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
					Monitor customer purchases, fulfill shipment states, and inspect order invoices.
				</p>
			</div>

			{isLoading ? (
				<div className="w-full h-[50vh] flex justify-center items-center">
					<div className="w-12 h-12 border-4 border-gray-300 border-t-accent rounded-full animate-spin"></div>
				</div>
			) : (
				<div className="space-y-4">
					{/* Search and Filters Top Bar */}
					<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
						{/* Status Filters */}
						<div className="flex flex-wrap gap-1.5">
							{["all", "pending", "completed", "cancelled", "returned"].map((status) => (
								<button
									key={status}
									onClick={() => setStatusFilter(status)}
									className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors duration-300 cursor-pointer ${
										statusFilter === status
											? "bg-accent text-white shadow-sm"
											: "bg-white dark:bg-[var(--color-dark-surface)] border border-pink-100/50 dark:border-[var(--color-dark-border)] text-gray-500 dark:text-gray-400 hover:bg-pink-50/20 dark:hover:bg-gray-800/10"
									}`}
								>
									{status}
								</button>
							))}
						</div>

						{/* Search Input */}
						<div className="relative w-full md:w-64">
							<Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-gray-400" />
							<input
								type="text"
								placeholder="Search orders..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-10 pr-4 py-2 w-full rounded-xl border border-pink-100 dark:border-[var(--color-dark-border)] bg-white dark:bg-[var(--color-dark-surface)] text-sm text-secondary dark:text-[var(--color-dark-text)] focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition duration-300"
							/>
						</div>
					</div>

					{/* Modal for order details */}
					<Modal
						isOpen={isModalOpen}
						onRequestClose={() => setIsModalOpen(false)}
						className="bg-white dark:bg-[var(--color-dark-surface)] rounded-3xl shadow-2xl max-w-3xl mx-auto my-10 p-6 outline-none border border-pink-100/50 dark:border-[var(--color-dark-border)] overflow-hidden"
						overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
					>
						{activeOrder && (
							<div className="space-y-6">
								{/* Modal Header */}
								<div className="flex justify-between items-center border-b border-pink-50/50 dark:border-[var(--color-dark-border)] pb-4">
									<div>
										<h2 className="text-xl font-bold font-heading text-secondary dark:text-[var(--color-dark-text)]">
											Order Specifications
										</h2>
										<p className="text-xs text-gray-400 dark:text-gray-500 font-mono mt-0.5">ID: {activeOrder.orderId}</p>
									</div>
									<button
										onClick={() => setIsModalOpen(false)}
										className="p-1.5 rounded-xl hover:bg-pink-50 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 transition cursor-pointer"
									>
										<X size={18} />
									</button>
								</div>

								{/* Customer & Shipping Information */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700 dark:text-gray-300">
									<div className="space-y-3 p-4 rounded-2xl bg-pink-50/10 dark:bg-[var(--color-dark-bg)] border border-pink-100/20 dark:border-[var(--color-dark-border)]/50">
										<h4 className="text-xs font-bold uppercase tracking-wider text-accent font-heading">Billing Details</h4>
										<p><span className="font-semibold text-gray-400 mr-1.5">Customer:</span>{activeOrder.name}</p>
										<p className="font-mono text-xs"><span className="font-semibold text-gray-400 mr-1.5">Email:</span>{activeOrder.email}</p>
										<p><span className="font-semibold text-gray-400 mr-1.5">Phone:</span>{activeOrder.phone}</p>
										<p><span className="font-semibold text-gray-400 mr-1.5">Address:</span>{activeOrder.address}</p>
									</div>
									<div className="space-y-3 p-4 rounded-2xl bg-pink-50/10 dark:bg-[var(--color-dark-bg)] border border-pink-100/20 dark:border-[var(--color-dark-border)]/50">
										<h4 className="text-xs font-bold uppercase tracking-wider text-accent font-heading">Order Info</h4>
										<div className="flex items-center gap-3">
											<span className="font-semibold text-gray-400">Status:</span>
											{getStatusPill(activeOrder.status)}
										</div>
										<div className="flex items-center gap-2">
											<span className="font-semibold text-gray-400 text-xs">Update Status:</span>
											<select
												className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-[var(--color-dark-surface)] border border-pink-100 dark:border-[var(--color-dark-border)] text-secondary dark:text-[var(--color-dark-text)] focus:outline-none focus:ring-2 focus:ring-accent/40 cursor-pointer"
												value={activeOrder.status}
												onChange={async (e) => {
													const updatedValue = e.target.value;
													try {
														const token = localStorage.getItem("token");
														await axios.put(
															import.meta.env.VITE_BACKEND_URL +
																"/api/orders/" +
																activeOrder.orderId +
																"/" +
																updatedValue,
															{},
															{
																headers: {
																	Authorization: "Bearer " + token,
																},
															}
														);
														
														setIsLoading(true);
														const updatedOrder = {...activeOrder};
														updatedOrder.status = updatedValue;
														setActiveOrder(updatedOrder);
														toast.success("Order status updated");
													} catch (err) {
														toast.error("Error updating order status");
														console.log(err);
													}
												}}
											>
												<option value="pending">Pending</option>
												<option value="completed">Completed</option>
												<option value="cancelled">Cancelled</option>
												<option value="returned">Returned</option>
											</select>
										</div>
										<p><span className="font-semibold text-gray-400 mr-1.5">Purchase Date:</span>{new Date(activeOrder.date).toLocaleDateString("en-GB")}</p>
										<p className="font-bold text-accent"><span className="font-semibold text-gray-400 mr-1.5 font-normal">Discounted Total:</span>Rs. {activeOrder.total.toLocaleString()}</p>
									</div>
								</div>

								{/* Order Items Table */}
								<div className="space-y-2">
									<h3 className="text-sm font-bold font-heading text-secondary dark:text-[var(--color-dark-text)]">Products List</h3>
									<div className="border border-pink-100/30 dark:border-[var(--color-dark-border)] rounded-2xl overflow-hidden">
										<table className="w-full text-sm text-left">
											<thead>
												<tr className="bg-pink-50/20 dark:bg-[var(--color-dark-bg)] text-gray-400 font-heading text-xs uppercase border-b border-pink-50/50 dark:border-[var(--color-dark-border)]">
													<th className="py-2.5 px-4 text-center">Image</th>
													<th className="py-2.5 px-4">Product Name</th>
													<th className="py-2.5 px-4 text-right">Price</th>
													<th className="py-2.5 px-4 text-center">Quantity</th>
													<th className="py-2.5 px-4 text-right">Subtotal</th>
												</tr>
											</thead>
											<tbody className="divide-y divide-pink-50/10 dark:divide-[var(--color-dark-border)] text-secondary dark:text-[var(--color-dark-text)]">
												{activeOrder.products.map((item, idx) => (
													<tr
														key={idx}
														className="hover:bg-pink-50/5 dark:hover:bg-gray-800/10"
													>
														<td className="py-2.5 px-4">
															<div className="flex justify-center">
																<img
																	src={item.productInfo.images[0]}
																	alt={item.productInfo.name}
																	className="w-10 h-10 object-cover rounded-xl border border-pink-100/50 dark:border-gray-800"
																/>
															</div>
														</td>
														<td className="py-2.5 px-4 font-semibold max-w-[200px] truncate">{item.productInfo.name}</td>
														<td className="py-2.5 px-4 text-right font-mono text-xs">
															Rs. {item.productInfo.price.toLocaleString()}
														</td>
														<td className="py-2.5 px-4 text-center font-medium">{item.quantity}</td>
														<td className="py-2.5 px-4 text-right font-bold text-accent font-mono text-xs">
															Rs. {(item.productInfo.price * item.quantity).toLocaleString()}
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>

								{/* Modal Footer Actions */}
								<div className="flex justify-end gap-3 pt-4 border-t border-pink-50/50 dark:border-[var(--color-dark-border)]">
									<button
										onClick={() => setIsModalOpen(false)}
										className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-secondary dark:text-[var(--color-dark-text)] rounded-xl transition duration-300 font-bold text-xs cursor-pointer"
									>
										Close
									</button>
									<button
										onClick={() => window.print()}
										className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-xl transition duration-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
									>
										<Printer size={14} />
										Print Invoice
									</button>
								</div>
							</div>
						)}
					</Modal>

					{/* Desktop Optimized Table Card */}
					<div className="bg-white dark:bg-[var(--color-dark-surface)] shadow-sm rounded-3xl border border-pink-100/40 dark:border-[var(--color-dark-border)] overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full text-sm text-left">
								<thead>
									<tr className="border-b border-pink-50/50 dark:border-[var(--color-dark-border)] text-gray-400 font-heading text-xs uppercase tracking-wider">
										<th className="py-4 px-6">Order ID</th>
										<th className="py-4 px-4">Customer</th>
										<th className="py-4 px-4">Email</th>
										<th className="py-4 px-4">Contact</th>
										<th className="py-4 px-4 text-right">Invoice Value</th>
										<th className="py-4 px-4">Date</th>
										<th className="py-4 px-4">Status</th>
										<th className="py-4 px-6 text-center">Inspect</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-pink-50/20 dark:divide-[var(--color-dark-border)] text-secondary dark:text-[var(--color-dark-text)]">
									{filteredOrders.length === 0 ? (
										<tr>
											<td colSpan={8} className="py-12 text-center text-gray-500 dark:text-gray-400">
												No orders found matching the filter options.
											</td>
										</tr>
									) : (
										filteredOrders.map((order, index) => (
											<tr
												key={index}
												className="hover:bg-pink-50/10 dark:hover:bg-gray-800/20 transition-colors duration-200"
											>
												<td className="py-4 px-6 font-semibold font-mono text-xs text-gray-400 dark:text-gray-500">
													{order.orderId}
												</td>
												<td className="py-4 px-4 font-bold">{order.name}</td>
												<td className="py-4 px-4 text-xs font-mono text-gray-500 dark:text-gray-400">
													{order.email}
												</td>
												<td className="py-4 px-4 font-medium text-xs">{order.phone}</td>
												<td className="py-4 px-4 text-right font-bold text-accent">
													Rs. {order.total.toLocaleString()}
												</td>
												<td className="py-4 px-4 text-xs text-gray-500 dark:text-gray-400">
													{new Date(order.date).toLocaleDateString("en-GB")}
												</td>
												<td className="py-4 px-4">
													{getStatusPill(order.status)}
												</td>
												<td className="py-4 px-6">
													<div className="flex justify-center">
														<button
															onClick={() => { setActiveOrder(order); setIsModalOpen(true); }}
															className="p-2 rounded-xl bg-pink-50/50 dark:bg-gray-800 hover:bg-accent/10 dark:hover:bg-accent/20 text-gray-500 hover:text-accent dark:text-gray-400 dark:hover:text-accent-rose transition-colors duration-200 cursor-pointer"
															title="Inspect details"
														>
															<Eye size={14} />
														</button>
													</div>
												</td>
											</tr>
										))
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

