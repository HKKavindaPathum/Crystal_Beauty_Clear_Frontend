import { useEffect, useState } from "react";
import { sampleProducts } from "../../assets/sampleData";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Search, Plus } from "lucide-react";
import toast from "react-hot-toast";

export default function ProductsPage() {
	const [products, setProducts] = useState(sampleProducts);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
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

	const filteredProducts = products.filter((item) => {
		const query = searchQuery.toLowerCase();
		return (
			item.name?.toLowerCase().includes(query) ||
			item.productId?.toLowerCase().includes(query) ||
			item.category?.toLowerCase().includes(query)
		);
	});

	return (
		<div className="space-y-6 font-[var(--font-main)]">
			{/* Top Panel Actions */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div>
					<h1 className="text-2xl font-bold font-heading text-secondary dark:text-[var(--color-dark-text)]">
						Products Catalog
					</h1>
					<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
						Manage and update product items, stock levels, and price tags.
					</p>
				</div>
				<div className="flex items-center gap-3 w-full sm:w-auto">
					<div className="relative flex-grow sm:flex-grow-0 w-full sm:w-64">
						<Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-gray-400" />
						<input
							type="text"
							placeholder="Search products..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-10 pr-4 py-2 w-full rounded-xl border border-pink-100 dark:border-[var(--color-dark-border)] bg-white dark:bg-[var(--color-dark-surface)] text-sm text-secondary dark:text-[var(--color-dark-text)] focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition duration-300"
						/>
					</div>
					<Link
						to="/admin/add-product"
						className="bg-accent hover:bg-accent-hover text-white font-bold py-2 px-4 rounded-xl shadow-sm transition duration-300 text-sm flex items-center gap-2 whitespace-nowrap cursor-pointer"
					>
						<Plus size={16} />
						Add Product
					</Link>
				</div>
			</div>

			{/* Loader */}
			{isLoading ? (
				<div className="w-full h-[50vh] flex justify-center items-center">
					<div className="w-12 h-12 border-4 border-gray-300 border-t-accent rounded-full animate-spin"></div>
				</div>
			) : (
				<div className="bg-white dark:bg-[var(--color-dark-surface)] rounded-3xl border border-pink-100/40 dark:border-[var(--color-dark-border)] overflow-hidden shadow-sm">
					<div className="overflow-x-auto">
						<table className="w-full text-sm text-left">
							<thead>
								<tr className="border-b border-pink-50/50 dark:border-[var(--color-dark-border)] text-gray-400 font-heading text-xs uppercase tracking-wider">
									<th className="py-4 px-6">Product ID</th>
									<th className="py-4 px-4">Image</th>
									<th className="py-4 px-4">Name</th>
									<th className="py-4 px-4">Category</th>
									<th className="py-4 px-4 text-right">Labelled Price</th>
									<th className="py-4 px-4 text-right">Selling Price</th>
									<th className="py-4 px-4 text-right">Stock Status</th>
									<th className="py-4 px-6 text-center">Actions</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-pink-50/20 dark:divide-[var(--color-dark-border)] text-secondary dark:text-[var(--color-dark-text)]">
								{filteredProducts.length === 0 ? (
									<tr>
										<td colSpan={8} className="py-12 text-center text-gray-500 dark:text-gray-400">
											No products found matching "{searchQuery}"
										</td>
									</tr>
								) : (
									filteredProducts.map((item, index) => (
										<tr
											key={index}
											className="hover:bg-pink-50/10 dark:hover:bg-gray-800/20 transition-colors duration-200"
										>
											<td className="py-4 px-6 font-semibold text-gray-400 dark:text-gray-500 text-xs">
												{item.productId}
											</td>
											<td className="py-4 px-4">
												<img
													src={item.images[0]}
													alt={item.name}
													className="w-11 h-11 object-cover rounded-xl shadow-sm border border-pink-100/50 dark:border-gray-800"
												/>
											</td>
											<td className="py-4 px-4 font-bold max-w-[200px] truncate">
												{item.name}
											</td>
											<td className="py-4 px-4">
												<span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
													item.category === "skincare"
														? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400"
														: item.category === "makeup"
														? "bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400"
														: item.category === "haircare"
														? "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400"
														: "bg-gray-50 dark:bg-gray-800 text-gray-500"
												}`}>
													{item.category || "skincare"}
												</span>
											</td>
											<td className="py-4 px-4 text-right text-gray-400 dark:text-gray-500 line-through text-xs">
												Rs. {item.labelledPrice.toLocaleString()}
											</td>
											<td className="py-4 px-4 text-right text-accent font-bold">
												Rs. {item.price.toLocaleString()}
											</td>
											<td className="py-4 px-4 text-right font-medium">
												{item.stock === 0 ? (
													<span className="text-red-500 font-bold text-xs bg-red-50 dark:bg-red-950/20 px-2 py-0.5 rounded-md">
														Out of Stock
													</span>
												) : item.stock <= 5 ? (
													<span className="text-amber-500 font-bold text-xs bg-amber-50 dark:bg-amber-950/20 px-2 py-0.5 rounded-md">
														Low Stock ({item.stock})
													</span>
												) : (
													<span className="text-gray-600 dark:text-gray-400 text-xs">
														{item.stock} units
													</span>
												)}
											</td>
											<td className="py-4 px-6">
												<div className="flex justify-center gap-2.5">
													<button
														onClick={() =>
															navigate("/admin/edit-product", { state: item })
														}
														className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 transition-colors duration-200 cursor-pointer"
														title="Edit Product"
													>
														<FaEdit size={14} />
													</button>
													<button
														onClick={() => deleteProduct(item.productId)}
														className="p-2 rounded-xl bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 transition-colors duration-200 cursor-pointer"
														title="Delete Product"
													>
														<FaTrash size={14} />
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
			)}
		</div>
	);
}

