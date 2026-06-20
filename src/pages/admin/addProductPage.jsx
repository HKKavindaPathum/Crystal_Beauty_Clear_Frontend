import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";

export default function AddProductPage() {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("skincare");
  const [labelledPrice, setLabelledPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const navigate = useNavigate();

  async function AddProduct(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    if (images.length <= 0) {
      toast.error("Please select at least one image");
      return;
    }

    const promisesArray = [];
    for (let i = 0; i < images.length; i++) {
      promisesArray[i] = mediaUpload(images[i]);
    }

    try {
      const imageUrls = await Promise.all(promisesArray);

      const altNamesArray = altNames.split(",");

      const product = {
        productId,
        name,
        altNames: altNamesArray,
        description,
        images: imageUrls,
        category,
        labelledPrice: Number(labelledPrice),
        price: Number(price),
        stock: Number(stock),
      };

      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/products",
        product,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Product added successfully");
      navigate("/admin/products");
    } catch (e) {
      toast.error(e.response?.data?.message || "Error adding product");
    }
  }

  return (
    <div className="flex justify-center items-center h-full p-6 font-[var(--font-main)]">
      <form
        onSubmit={AddProduct}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4 border"
      >
        <h2 className="text-2xl font-bold text-center text-[var(--color-accent)]">
          Add New Product
        </h2>

		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			{/* Product ID */}
			<div className="flex flex-col gap-2">
				<label className="text-gray-700 font-medium">Product ID</label>
				<input
				type="text"
				placeholder="Enter product ID"
				className="input input-bordered w-full border p-2 rounded-lg"
				value={productId}
				onChange={(e) => setProductId(e.target.value)}
				/>
			</div>

			{/* Name */}
			<div className="flex flex-col gap-2">
				<label className="text-gray-700 font-medium">Name</label>
				<input
				type="text"
				placeholder="Enter product name"
				className="input input-bordered w-full border p-2 rounded-lg"
				value={name}
				onChange={(e) => setName(e.target.value)}
				/>
			</div>

			{/* Alt Names */}
			<div className="flex flex-col gap-2 col-span-2">
				<label className="text-gray-700 font-medium">Alternative Names</label>
				<input
				type="text"
				placeholder="Comma separated names"
				className="input input-bordered w-full border p-2 rounded-lg"
				value={altNames}
				onChange={(e) => setAltNames(e.target.value)}
				/>
			</div>

			{/* Description */}
			<div className="flex flex-col gap-2 col-span-2">
				<label className="text-gray-700 font-medium">Description</label>
				<textarea
				placeholder="Enter product description"
				className="textarea textarea-bordered w-full border p-2 rounded-lg"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				/>
			</div>

			{/* Images */}
			<div className="flex flex-col gap-2 col-span-2">
				<label className="text-gray-700 font-medium">Upload Images</label>
				<input
				type="file"
				multiple
				className="file-input file-input-bordered w-full border p-2 rounded-lg bg-gray-300 cursor-pointer"
				onChange={(e) => setImages(e.target.files)}
				/>
			</div>

			{/* Category */}
			<div className="flex flex-col gap-2">
			<label className="text-gray-700 font-medium">Category</label>
			<select
				className="select select-bordered w-full border p-2 rounded-lg"
				value={category}
				onChange={(e) => setCategory(e.target.value)}
			>
				<option value="skincare">Skincare</option>
				<option value="makeup">Makeup</option>
				<option value="haircare">Haircare</option>
			</select>
			</div>


			{/* Labelled Price */}
			<div className="flex flex-col gap-2">
				<label className="text-gray-700 font-medium">Labelled Price</label>
				<input
				type="number"
				placeholder="Enter original price"
				className="input input-bordered w-full border p-2 rounded-lg"
				value={labelledPrice}
				onChange={(e) => setLabelledPrice(e.target.value)}
				/>
			</div>

			{/* Selling Price */}
			<div className="flex flex-col gap-2">
				<label className="text-gray-700 font-medium">Selling Price</label>
				<input
				type="number"
				placeholder="Enter selling/discounted price"
				className="input input-bordered w-full border p-2 rounded-lg"
				value={price}
				onChange={(e) => setPrice(e.target.value)}
				/>
			</div>

			{/* Stock Quantity */}
			<div className="flex flex-col gap-2">
				<label className="text-gray-700 font-medium">Stock Quantity</label>
				<input
				type="number"
				placeholder="Enter stock count"
				className="input input-bordered w-full border p-2 rounded-lg"
				value={stock}
				onChange={(e) => setStock(e.target.value)}
				/>
			</div>
		</div>

        {/* Buttons */}
        <div className="flex justify-between gap-4">
          <Link
            to="/admin/products"
            className="w-1/2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition text-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="w-1/2 bg-[var(--color-accent)] hover:bg-[var(--color-secondary)] text-white font-bold py-2 px-4 rounded transition"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
