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
		<div className="relative w-full h-full p-6 font-[var(--font-main)] bg-gray-50">
			{/* Add Product Floating Button */}
			<Link
				to="/admin/add-product"
				className="fixed bottom-6 right-6 bg-[var(--color-accent)] hover:bg-[var(--color-secondary)] text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300"
			>
				+ Add Product
			</Link>

			{/* Loader */}
			{isLoading ? (
				<div className="w-full h-[70vh] flex justify-center items-center">
					<div className="w-14 h-14 border-4 border-gray-300 border-t-[var(--color-accent)] rounded-full animate-spin"></div>
				</div>
			) : (
				<div className="overflow-x-auto shadow-md rounded-2xl bg-white">
					<table className="w-full text-sm text-gray-700">
						<thead className="bg-[var(--color-accent)] text-white text-base">
							<tr>
								<th className="py-4 px-3 text-left">Product ID</th>
								<th className="py-4 px-3 text-left">Name</th>
								<th className="py-4 px-3">Image</th>
								<th className="py-4 px-3 text-right">Labelled Price</th>
								<th className="py-4 px-3 text-right">Price</th>
								<th className="py-4 px-3 text-right">Stock</th>
								<th className="py-4 px-3">Actions</th>
							</tr>
						</thead>
						<tbody>
							{products.map((item, index) => (
								<tr
									key={index}
									className={`${
										index % 2 === 0 ? "bg-gray-50" : "bg-white"
									} border-b hover:bg-gray-100 transition`}
								>
									<td className="py-3 px-3 font-medium">{item.productId}</td>
									<td className="py-3 px-3">{item.name}</td>
									<td className="py-3 px-3 flex justify-center">
										<img
											src={item.images[0]}
											alt={item.name}
											className="w-14 h-14 object-cover rounded-lg shadow-sm"
										/>
									</td>
									<td className="py-3 px-3 text-gray-600 text-right">
										RS:{item.labelledPrice}
									</td>
									<td className="py-3 px-3 text-green-600 font-semibold text-right">
										RS:{item.price}
									</td>
									<td className="py-3 px-3 text-right">{item.stock}</td>
									<td className="py-3 px-3">
										<div className="flex justify-center gap-3">
											<button
												onClick={() => deleteProduct(item.productId)}
												className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition"
											>
												<FaTrash size={16} />
											</button>
											<button
												onClick={() =>
													navigate("/admin/edit-product", { state: item })
												}
												className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition"
											>
												<FaEdit size={16} />
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
