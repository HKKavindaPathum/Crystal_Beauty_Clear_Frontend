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
			const res = await axios.post(
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
		<div className="w-full min-h-screen bg-pink-50 flex flex-col lg:flex-row gap-6 justify-center items-start pt-6 px-4 pb-20 relative">
			{cart.length === 0 ? (
				<div className="flex flex-col items-center justify-center w-full mt-20 text-center gap-4">
					<h2 className="text-2xl font-bold text-pink-900">Your cart is empty</h2>
					<Link to="/products" className="bg-accent hover:bg-secondary text-white font-bold py-3 px-6 rounded-xl transition duration-300">
						Go Shop Products
					</Link>
				</div>
			) : (
				<>
					{/* Product List */}
					<div className="w-full lg:max-w-[600px] flex flex-col items-center">
						{cart.map((item, index) => {
							return (
								<div
									key={item.productId}
									className="w-full max-w-[600px] my-3 h-[120px] md:h-[100px] rounded-3xl bg-white shadow-lg flex flex-row relative justify-between items-center p-2 border border-pink-100"
								>
									<img
										src={item.image}
										className="w-[80px] h-[80px] object-cover rounded-2xl ml-2"
									/>
									<div className="flex-1 min-w-0 flex flex-col justify-center items-start pl-4 pr-2">
										<h1 className="text-lg text-secondary font-bold truncate w-full">
											{item.name}
										</h1>
										<h1 className="text-sm text-gray-500 font-semibold truncate w-full">
											{item.productId}
										</h1>
										{item.labelledPrice > item.price ? (
											<div className="flex items-center gap-1">
												<span className="text-sm text-gray-400 line-through">
													{item.labelledPrice.toFixed(2)}
												</span>
												<span className="text-sm font-bold text-accent">
													{item.price.toFixed(2)}
												</span>
											</div>
										) : (
											<span className="text-sm font-bold text-accent">
												{item.price.toFixed(2)}
											</span>
										)}
									</div>
									<div className="w-[90px] flex flex-row justify-evenly items-center mr-8">
										<button
											className="text-white font-bold rounded-lg hover:bg-secondary p-1 text-sm cursor-pointer aspect-square bg-accent"
											onClick={() => {
												changeQty(index, -1);
											}}
										>
											<BiMinus />
										</button>
										<h1 className="text-md text-secondary font-bold">
											{item.qty}
										</h1>
										<button
											className="text-white font-bold rounded-lg hover:bg-secondary p-1 text-sm cursor-pointer aspect-square bg-accent"
											onClick={() => {
												changeQty(index, 1);
											}}
										>
											<BiPlus />
										</button>
									</div>
									<button
										className="absolute text-red-600 cursor-pointer hover:bg-red-600 hover:text-white rounded-full p-2 right-2 top-2 md:top-auto"
										onClick={() => {
											removeFromCart(index);
										}}
									>
										<BiTrash />
									</button>
								</div>
							);
						})}
					</div>

					{/* Summary Form */}
					<div className="w-full max-w-[400px] bg-white shadow-xl rounded-3xl p-6 flex flex-col justify-center items-center gap-6 border border-pink-100 lg:sticky lg:top-6">
						<p className="text-2xl text-secondary font-bold">
							Total:
							<span className="text-accent font-bold mx-2">
								{getTotal().toFixed(2)}
							</span>
						</p>
						<div className="w-full flex flex-col gap-3">
							<input
								type="text"
								placeholder="Phone Number"
								className="w-full h-[45px] px-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
							/>
							<textarea
								placeholder="Delivery Address"
								className="w-full h-[80px] p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
						</div>
						<button
							className="w-full text-white bg-accent py-3 rounded-xl font-bold hover:bg-secondary transition-all duration-300 shadow-md cursor-pointer"
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
