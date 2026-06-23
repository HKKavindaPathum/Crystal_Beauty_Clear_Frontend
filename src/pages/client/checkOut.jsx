import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [cart, setCart] = useState(location.state?.cart || []);
    const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");

    useEffect(() => {
        if (!location.state || !location.state.cart || location.state.cart.length === 0) {
            toast.error("No checkout items found");
            navigate("/cart");
        }
    }, [location.state, navigate]);

    function getTotal() {
		let total = 0;
		cart.forEach((item) => {
			total += item.price * item.qty;
		});
		return total;
	}

	function removeFromCart(index) {
		const newCart = cart.filter((item, i) => i !== index);
		setCart(newCart);
	}

    function changeQty(index, qty) {
		const newQty = cart[index].qty + qty;
		if (newQty <= 0) {
			removeFromCart(index);
			return;
		} else {
			const newCart = [...cart];
			newCart[index].qty = newQty;
			setCart(newCart);
		}
	}

	async function placeOrder() {
		const token = localStorage.getItem("token");
		if (!token) {
			toast.error("Please login to place order");
			return;
		}

		if (cart.length === 0) {
			toast.error("Your cart is empty");
			return;
		}

		if (!phoneNumber.trim()) {
			toast.error("Phone number is required");
			return;
		}

		if (!address.trim()) {
			toast.error("Address is required");
			return;
		}

        const orderInformation = {
			products: [],
			phone: phoneNumber,
			address: address,
		};

		for (let i = 0; i < cart.length; i++) {
			const item = {
				productId: cart[i].productId,
				qty: cart[i].qty,
			};
			orderInformation.products[i] = item;
		}

		try {
			await axios.post(
				import.meta.env.VITE_BACKEND_URL + "/api/orders",
				orderInformation,
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			);
			toast.success("Order placed successfully");
			localStorage.setItem("cart", JSON.stringify([]));
			window.dispatchEvent(new Event("cartUpdated"));
			setCart([]);
			setTimeout(() => {
				navigate("/");
			}, 1500);
		} catch (err) {
			console.log(err);
			toast.error(err.response?.data?.message || "Error placing order");
		}
	}

	return (
		<div className="w-full min-h-screen bg-pink-50 dark:bg-[var(--color-dark-bg)] flex flex-col lg:flex-row gap-6 justify-center items-start pt-6 px-4 pb-20 relative transition-colors duration-300">
			{cart.length === 0 ? (
				<div className="flex flex-col items-center justify-center w-full mt-20 text-center gap-4">
					<h2 className="text-2xl font-bold text-pink-900 dark:text-[var(--color-dark-text)]">Your cart is empty</h2>
					<Link to="/products" className="bg-accent hover:bg-accent-hover text-white font-bold py-3 px-6 rounded-xl transition duration-300 shadow-md">
						Go Shop Products
					</Link>
				</div>
			) : (
				<>
					{/* Product List */}
					<div className="w-full lg:max-w-[600px] flex flex-col items-center gap-3">
						{cart.map((item, index) => {
							return (
								<div
									key={item.productId}
									className="w-full max-w-[600px] rounded-2xl bg-white dark:bg-[var(--color-dark-surface)] shadow-md flex flex-row items-center p-3 border border-pink-100/50 dark:border-[var(--color-dark-border)] gap-3 transition-colors duration-300"
								>
									<img
										src={item.image}
										alt={item.name}
										className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl border dark:border-gray-800"
									/>
									<div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
										<div>
											<h3 className="text-sm md:text-md text-secondary dark:text-[var(--color-dark-text)] font-bold truncate">
												{item.name}
											</h3>
											<p className="text-[10px] md:text-xs text-gray-400 font-semibold truncate">
												{item.productId}
											</p>
										</div>
										<div className="flex flex-row flex-wrap items-center justify-between mt-2 gap-2">
											{item.labelledPrice > item.price ? (
												<div className="flex items-center gap-1.5">
													<span className="text-xs text-gray-400 line-through">
														Rs. {item.labelledPrice.toFixed(2)}
													</span>
													<span className="text-xs md:text-sm font-bold text-accent">
														Rs. {item.price.toFixed(2)}
													</span>
												</div>
											) : (
												<span className="text-xs md:text-sm font-bold text-accent">
													Rs. {item.price.toFixed(2)}
												</span>
											)}
											
											{/* Quantity Controls & Delete */}
											<div className="flex items-center gap-2">
												<div className="flex flex-row justify-between items-center gap-2 bg-pink-50/50 dark:bg-[var(--color-dark-bg)] px-2 py-1 rounded-xl border dark:border-[var(--color-dark-border)]">
													<button
														className="text-gray-500 hover:text-accent font-bold cursor-pointer"
														onClick={() => {
															changeQty(index, -1);
														}}
													>
														<BiMinus size={14} />
													</button>
													<span className="text-sm text-secondary dark:text-[var(--color-dark-text)] font-bold w-4 text-center">
														{item.qty}
													</span>
													<button
														className="text-gray-500 hover:text-accent font-bold cursor-pointer"
														onClick={() => {
															changeQty(index, 1);
														}}
													>
														<BiPlus size={14} />
													</button>
												</div>
												<button
													className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 p-2 rounded-xl cursor-pointer transition flex items-center justify-center"
													onClick={() => {
														removeFromCart(index);
													}}
													aria-label="Remove item"
												>
													<BiTrash size={18} />
												</button>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					{/* Summary Form */}
					<div className="w-full max-w-[400px] mx-auto lg:mx-0 bg-white dark:bg-[var(--color-dark-surface)] shadow-xl rounded-3xl p-6 flex flex-col justify-center items-center gap-6 border border-pink-100/50 dark:border-[var(--color-dark-border)] lg:sticky lg:top-6 transition-colors duration-300">
						<p className="text-2xl text-secondary dark:text-[var(--color-dark-text)] font-bold">
							Total:
							<span className="text-accent font-extrabold mx-2">
								Rs. {getTotal().toFixed(2)}
							</span>
						</p>
						<div className="w-full flex flex-col gap-3">
							<input
								type="text"
								placeholder="Phone Number"
								className="w-full h-[45px] px-3 rounded-xl border border-gray-300 dark:border-[var(--color-dark-border)] bg-white dark:bg-[var(--color-dark-bg)] text-secondary dark:text-[var(--color-dark-text)] focus:outline-none focus:ring-2 focus:ring-accent"
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
							/>
							<textarea
								placeholder="Delivery Address"
								className="w-full h-[90px] p-3 rounded-xl border border-gray-300 dark:border-[var(--color-dark-border)] bg-white dark:bg-[var(--color-dark-bg)] text-secondary dark:text-[var(--color-dark-text)] focus:outline-none focus:ring-2 focus:ring-accent resize-none"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
						</div>
						<button
							className="w-full text-white bg-accent hover:bg-accent-hover py-3.5 rounded-xl font-bold shadow-md transition duration-300 cursor-pointer"
							onClick={placeOrder}
						>
							Place Order
						</button>
					</div>
				</>
			)}
		</div>
	);
}
