import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import Modal from "react-modal";
import toast from "react-hot-toast";

// Helper function to render modern status pill badges
function getStatusPill(status) {
  const normStatus = status.toLowerCase();
  let classes = "";
  switch(normStatus) {
    case "completed":
    case "delivered":
      classes = "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50";
      break;
    case "pending":
      classes = "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/50";
      break;
    case "cancelled":
      classes = "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/50";
      break;
    case "returned":
      classes = "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-900/50";
      break;
    default:
      classes = "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
  }
  return (
    <span className={`px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${classes}`}>
      {status}
    </span>
  );
}

export default function AdminOrdersPage() {
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [activeOrder, setActiveOrder] = useState(null);

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

	return (
		<div className="w-full h-full max-h-full overflow-y-auto p-4 font-[var(--font-main)]">
		 	{isLoading ? (
		 		<Loading />
		 	) : (
		 		<div className="overflow-x-auto space-y-4">
		 			{/* Modal for order details */}
		 			<Modal
		 				isOpen={isModalOpen}
		 				onRequestClose={() => setIsModalOpen(false)}
		 				className="bg-white dark:bg-[var(--color-dark-surface)] rounded-2xl shadow-2xl max-w-3xl mx-auto my-10 p-6 outline-none border dark:border-[var(--color-dark-border)] transition-colors duration-300"
		 				overlayClassName="fixed inset-0 bg-black/40 backdrop-blur-xs flex justify-center items-center z-50"
		 			>
		 				{activeOrder && (
		 					<div className="space-y-6">
		 						<h2 className="text-2xl font-bold font-heading text-secondary dark:text-[var(--color-dark-text)] border-b dark:border-[var(--color-dark-border)] pb-3">
		 							Order Details - {activeOrder.orderId}
		 						</h2>
		 						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
		 							<div className="space-y-2">
		 								<p>
		 									<span className="font-semibold text-gray-500">Name:</span>{" "}
		 									{activeOrder.name}
		 								</p>
		 								<p>
		 									<span className="font-semibold text-gray-500">Email:</span>{" "}
		 									{activeOrder.email}
		 								</p>
		 								<p>
		 									<span className="font-semibold text-gray-500">Phone:</span>{" "}
		 									{activeOrder.phone}
		 								</p>
		 								<p>
		 									<span className="font-semibold text-gray-500">Address:</span>{" "}
		 									{activeOrder.address}
		 								</p>
		 							</div>
		 							<div className="space-y-2">
		 								<div className="flex items-center gap-3">
		 									<span className="font-semibold text-gray-500">Status:</span>{" "}
		 									{getStatusPill(activeOrder.status)}
											<select
                        className="ml-2 select select-bordered border p-1 rounded-lg text-sm bg-white dark:bg-[var(--color-dark-bg)] text-secondary dark:text-[var(--color-dark-text)] dark:border-[var(--color-dark-border)] cursor-pointer"
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
												<option selected disabled>
													Change status
												</option>
												<option value="pending">Pending</option>
												<option value="completed">Completed</option>
												<option value="cancelled">Cancelled</option>
												<option value="returned">Returned</option>
											</select>
		 								</div>
		 								<p>
		 									<span className="font-semibold text-gray-500">Date:</span>{" "}
		 									{new Date(activeOrder.date).toLocaleDateString("en-GB")}
		 								</p>
		 								<p>
		 									<span className="font-semibold text-gray-500">Total:</span>{" "}
		 									{activeOrder.total.toLocaleString("en-LK", {
		 										style: "currency",
		 										currency: "LKR",
		 									})}
		 								</p>
		 								<p>
		 									<span className="font-semibold text-gray-500">Labelled Total:</span>{" "}
		 									{activeOrder.labelledTotal.toLocaleString("en-LK", {
		 										style: "currency",
		 										currency: "LKR",
		 									})}
		 								</p>
		 							</div>
		 						</div>

		 						<h3 className="text-lg font-bold font-heading text-secondary dark:text-[var(--color-dark-text)]">Products List</h3>
		 						<table className="w-full text-center border border-gray-100 dark:border-[var(--color-dark-border)] shadow-xs rounded-xl overflow-hidden">
		 							<thead className="bg-accent text-white">
		 								<tr>
		 									<th className="py-3 px-2">Image</th>
		 									<th className="py-3 px-2">Product</th>
		 									<th className="py-3 px-2">Price</th>
		 									<th className="py-3 px-2">Quantity</th>
		 									<th className="py-3 px-2">Subtotal</th>
		 								</tr>
		 							</thead>
		 							<tbody className="divide-y divide-gray-100 dark:divide-[var(--color-dark-border)] text-gray-700 dark:text-gray-300">
		 								{activeOrder.products.map((item, idx) => (
		 									<tr
		 										key={idx}
		 										className={`${
		 											idx % 2 === 0
		 												? "bg-pink-50/20 dark:bg-[var(--color-dark-bg)]"
		 												: "bg-white dark:bg-[var(--color-dark-surface)]"
		 										}`}
		 									>
		 										<td className="py-2 px-2 flex justify-center">
		 											<img
		 												src={item.productInfo.images[0]}
		 												alt={item.productInfo.name}
		 												className="w-10 h-10 object-cover rounded-lg border dark:border-gray-800"
		 											/>
		 										</td>
		 										<td className="py-2 px-2 font-medium">{item.productInfo.name}</td>
		 										<td className="py-2 px-2">
		 											{item.productInfo.price.toLocaleString("en-LK", {
		 												style: "currency",
		 												currency: "LKR",
		 											})}
		 										</td>
		 										<td className="py-2 px-2">{item.quantity}</td>
		 										<td className="py-2 px-2 font-semibold">
		 											{(
														item.productInfo.price * item.quantity
													).toLocaleString("en-LK", {
														style: "currency",
														currency: "LKR",
													})}
		 										</td>
		 									</tr>
		 								))}
		 							</tbody>
		 						</table>
		 						<div className="flex justify-end gap-3 pt-4 border-t dark:border-[var(--color-dark-border)]">
		 							<button
		 								onClick={() => setIsModalOpen(false)}
		 								className="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-secondary dark:text-[var(--color-dark-text)] rounded-xl transition font-semibold cursor-pointer"
		 							>
		 								Close
		 							</button>
                  <button
		 								onClick={() => window.print()}
		 								className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-xl transition font-semibold cursor-pointer"
		 							>
		 								Print Invoice
		 							</button>
		 						</div>
		 					</div>
		 				)}
		 			</Modal>

          <div className="bg-white dark:bg-[var(--color-dark-surface)] shadow-md rounded-2xl border border-pink-100/50 dark:border-[var(--color-dark-border)] overflow-hidden transition-colors duration-300">
            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
              <thead className="bg-accent text-white text-base">
              <tr>
                <th className="py-4 px-4">Order ID</th>
                <th className="py-4 px-4">Name</th>
                <th className="py-4 px-4">Email</th>
                <th className="py-4 px-4">Phone</th>
                <th className="py-4 px-4">Total</th>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-4">Status</th>
              </tr>
              </thead>
              <tbody className="divide-y divide-pink-50 dark:divide-[var(--color-dark-border)]">
              {orders.map((order, index) => (
                <tr
                key={index}
                onClick={() => { setActiveOrder(order); setIsModalOpen(true); }}
                className="cursor-pointer hover:bg-pink-50/20 dark:hover:bg-gray-800/40 transition"
                >
                <td className="py-3.5 px-4 font-semibold text-secondary dark:text-[var(--color-dark-text)]">{order.orderId}</td>
                <td className="py-3.5 px-4 font-medium">{order.name}</td>
                <td className="py-3.5 px-4 text-xs font-mono text-gray-500 dark:text-gray-400">{order.email}</td>
                <td className="py-3.5 px-4">{order.phone}</td>
                <td className="py-3.5 px-4 font-bold text-secondary dark:text-[var(--color-dark-text)]">
                  {order.total.toLocaleString("en-LK", { style: "currency", currency: "LKR" })}
                </td>
                <td className="py-3.5 px-4 text-xs text-gray-500 dark:text-gray-400">{new Date(order.date).toLocaleDateString("en-GB")}</td>
                <td className="py-3.5 px-4">
                  {getStatusPill(order.status)}
                </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
		 		</div>
		 	)}
		</div>
	);
}
