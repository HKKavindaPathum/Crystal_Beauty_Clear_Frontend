import axios from "axios"; 
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import Loading from "../../components/loading";
import { addToCart } from "../../utils/cart";
import ProductReviews from "../../components/ProductReviews";//see

export default function ProductOverviewPage() {
	const params = useParams();
	const productId = params.id;
	const [status, setStatus] = useState("loading"); //loading , success , error
	const [product, setProduct] = useState(null);
    const navigate = useNavigate();

	useEffect(() => {
		setStatus("loading");
		axios
			.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
			.then((response) => {
				console.log(response.data);
				setProduct(response.data);
				setStatus("success");
			})
			.catch((error) => {
				console.log(error);
				setStatus("error");
				toast.error("Error fetching product details");
			});
	}, [productId]);

	useEffect(() => {
		if (status === "success") {
			window.scrollTo(0, 0);
		}
	}, [status, productId]);
	return (
		<div className="w-full min-h-screen bg-pink-50 dark:bg-[var(--color-dark-bg)] transition-colors duration-300">
			{status === "success" && (
				<div className="w-full h-full flex flex-col md:flex-row pt-8 px-4 max-w-7xl mx-auto gap-8">
					{/* Mobile Title */}
					<h1 className="w-full md:hidden block text-center text-3xl font-fancy text-secondary dark:text-[var(--color-dark-text)] font-semibold mb-4">
						{product.name}
						{product.altNames?.filter(altName => altName && altName.trim() !== "").map((altName, idx) => (
							<span key={idx} className="text-2xl text-gray-500 dark:text-gray-400 font-normal">
								{" | " + altName}
							</span>
						))}
					</h1>

					{/* Left Image Slider */}
					<div className="w-full md:w-[50%] flex justify-center items-start">
						<ImageSlider images={product.images} />
					</div>

					{/* Right Product Details */}
					<div className="w-full md:w-[50%] flex flex-col items-center md:items-start pl-0 md:pl-8 pb-20">
						{/* Desktop Title */}
						<h1 className="hidden md:block text-left text-4xl font-fancy text-secondary dark:text-[var(--color-dark-text)] font-bold mb-4">
							{product.name}
							{product.altNames?.filter(altName => altName && altName.trim() !== "").map((altName, idx) => (
								<span key={idx} className="text-3xl text-gray-500 dark:text-gray-400 font-normal">
									{" | " + altName}
								</span>
							))}
						</h1>
						
						<p className="text-sm text-accent dark:text-[var(--color-accent)] font-semibold tracking-wider mb-2">
							PRODUCT ID: {product.productId}
						</p>
						
						<p className="text-md text-gray-600 dark:text-gray-300 mb-6 text-center md:text-left leading-relaxed">
							{product.description}
						</p>

						{/* Pricing */}
						<div className="mb-6">
							{product.labelledPrice > product.price ? (
								<div className="flex items-center gap-4">
									<span className="text-3xl text-gray-400 line-through">
										Rs. {product.labelledPrice.toFixed(2)}
									</span>
									<span className="text-4xl font-extrabold text-accent">
										Rs. {product.price.toFixed(2)}
									</span>
								</div>
							) : (
								<span className="text-4xl font-extrabold text-accent">
									Rs. {product.price.toFixed(2)}
								</span>
							)}
						</div>

						{/* Action Buttons */}
						<div className="w-full flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center mb-8">
							<button
								className="w-full sm:w-[200px] h-[50px] cursor-pointer bg-accent hover:bg-accent-hover text-white rounded-2xl shadow-md transition-all duration-300 font-bold"
								onClick={() => {
									addToCart(product, 1);
									toast.success("Product added to cart");
								}}
							>
								Add to Cart
							</button>
							<button
								className="w-full sm:w-[200px] h-[50px] cursor-pointer bg-secondary text-white dark:bg-[var(--color-dark-surface)] dark:border dark:border-[var(--color-dark-border)] rounded-2xl hover:bg-opacity-90 shadow-md transition-all duration-300 font-bold"
								onClick={() => {
									navigate("/checkout", {
										state: {
											cart: [
												{
													productId: product.productId,
													name: product.name,
													image: product.images[0],
													price: product.price,
													labelledPrice: product.labelledPrice,
													qty: 1,
												},
											],
										},
									});
								}}
							>
								Buy Now
							</button>
						</div>

						{/* Reviews */}
						<div className="w-full border-t border-pink-100 dark:border-[var(--color-dark-border)] pt-6 mt-4">
							<ProductReviews productId={productId} />
						</div>
					</div>
				</div>
			)}
			{status === "loading" && <Loading />}
		</div>
	);
}