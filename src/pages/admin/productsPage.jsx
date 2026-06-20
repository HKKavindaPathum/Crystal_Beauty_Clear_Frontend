import { useEffect, useState } from "react";
import { sampleProducts } from "../../assets/sampleData";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ProductsPage() {
	const [products, setProducts] = useState(sampleProducts);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoading) {
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/api/products")
				.then((res) => {
					setProducts(res.data);
					setIsLoading(false);
				})
				.catch(() => {
					toast.error("Failed to load products");
					setIsLoading(false);
				});
		}
	}, [isLoading]);

	function deleteProduct(productId) {
		if (!window.confirm("Are you sure you want to delete this Product?")) return;
		const token = localStorage.getItem("token");
		if (!token) {
			toast.error("Please login first");
			return;
		}
		axios
			.delete(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId, {
				headers: { Authorization: "Bearer " + token },
			})
			.then(() => {
				toast.success("Product deleted successfully");
				setIsLoading(true);
			})
			.catch((e) => {
				toast.error(e.response?.data?.message || "Failed to delete product");
			});
	}

	return (
		<div className="relative w-full h-full p-4 font-[var(--font-main)] bg-pink-50/10 dark:bg-[var(--color-dark-bg)] transition-colors duration-300">
			{/* Add Product Floating Button */}
			<Link
				to="/admin/add-product"
				className="fixed bottom-6 right-6 bg-accent hover:bg-accent-hover text-white font-bold py-3.5 px-6 rounded-full shadow-lg transition duration-300 z-10 cursor-pointer"
			>
				+ Add Product
			</Link>

			{/* Loader */}
			{isLoading ? (
				<div className="w-full h-[70vh] flex justify-center items-center">
					<div className="w-14 h-14 border-4 border-gray-300 border-t-accent rounded-full animate-spin"></div>
				</div>
			) : (
				<div className="overflow-x-auto shadow-md rounded-2xl bg-white dark:bg-[var(--color-dark-surface)] border border-pink-100/50 dark:border-[var(--color-dark-border)]">
					<table className="w-full text-sm text-gray-700 dark:text-gray-300">
						<thead className="bg-accent text-white text-base">
							<tr>
								<th className="py-4 px-4 text-left">Product ID</th>
								<th className="py-4 px-4 text-left">Name</th>
								<th className="py-4 px-4 text-center">Image</th>
								<th className="py-4 px-4 text-right">Labelled Price</th>
								<th className="py-4 px-4 text-right">Price</th>
								<th className="py-4 px-4 text-right">Stock</th>
								<th className="py-4 px-4 text-center">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-pink-50 dark:divide-[var(--color-dark-border)]">
							{products.map((item, index) => (
								<tr
									key={index}
									className={`${
										index % 2 === 0 ? "bg-gray-50/30 dark:bg-gray-900/10" : "bg-white dark:bg-[var(--color-dark-surface)]"
									} hover:bg-pink-50/20 dark:hover:bg-gray-800/40 transition`}
								>
									<td className="py-3.5 px-4 font-semibold text-secondary dark:text-[var(--color-dark-text)]">{item.productId}</td>
									<td className="py-3.5 px-4 font-medium">{item.name}</td>
									<td className="py-3.5 px-4 flex justify-center">
										<img
											src={item.images[0]}
											alt={item.name}
											className="w-12 h-12 object-cover rounded-lg shadow-sm border dark:border-gray-800"
										/>
									</td>
									<td className="py-3.5 px-4 text-gray-500 dark:text-gray-400 text-right">
										RS.{item.labelledPrice.toFixed(2)}
									</td>
									<td className="py-3.5 px-4 text-accent font-bold text-right">
										RS.{item.price.toFixed(2)}
									</td>
									<td className="py-3.5 px-4 text-right font-medium">{item.stock}</td>
									<td className="py-3.5 px-4">
										<div className="flex justify-center gap-3">
											<button
												onClick={() => deleteProduct(item.productId)}
												className="p-2 rounded-xl bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/45 text-red-600 dark:text-red-400 transition cursor-pointer"
											>
												<FaTrash size={14} />
											</button>
											<button
												onClick={() =>
													navigate("/admin/edit-product", { state: item })
												}
												className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/20 hover:bg-blue-100 dark:hover:bg-blue-900/45 text-blue-600 dark:text-blue-400 transition cursor-pointer"
											>
												<FaEdit size={14} />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
