import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";

export default function EditProductPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const productData = location.state || {};

  const [productId] = useState(productData.productId || ""); // keep readonly
  const [name, setName] = useState(productData.name || "");
  const [altNames, setAltNames] = useState(productData.altNames ? productData.altNames.join(",") : "");
  const [description, setDescription] = useState(productData.description || "");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState(productData.category || "skincare");
  const [labelledPrice, setLabelledPrice] = useState(productData.labelledPrice || 0);
  const [price, setPrice] = useState(productData.price || 0);
  const [stock, setStock] = useState(productData.stock || 0);

  useEffect(() => {
    if (!location.state) {
      toast.error("No product details found, redirecting...");
      navigate("/admin/products");
    }
  }, [location.state, navigate]);

  async function updateProduct(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    let imageUrls = location.state.images;
    if (images.length > 0) {
      const promisesArray = Array.from(images).map((img) => mediaUpload(img));
      imageUrls = await Promise.all(promisesArray);
    }

    const product = {
      productId,
      name,
      altNames: altNames.split(","),
      description,
      images: imageUrls,
      category, 
      labelledPrice: Number(labelledPrice),
      price: Number(price),
      stock: Number(stock),
    };

    try {
      await axios.put(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId, product, {
        headers: { Authorization: "Bearer " + token },
      });
      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (e) {
      toast.error(e.response?.data?.message || "Error updating product");
    }
  }

  return (
    <div className="flex justify-center items-center h-full p-6 font-[var(--font-main)] bg-gray-50">
      <form
        onSubmit={updateProduct}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4 border"
      >
        <h2 className="text-2xl font-bold text-center text-[var(--color-accent)]">
          Edit Product
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product ID (readonly) */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Product ID</label>
            <input
              type="text"
              disabled
              className="input input-bordered w-full border p-2 rounded-lg bg-gray-100 cursor-not-allowed"
              value={productId}
            />
          </div>

          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Name</label>
            <input
              type="text"
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
              className="input input-bordered w-full border p-2 rounded-lg"
              value={altNames}
              onChange={(e) => setAltNames(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 col-span-2">
            <label className="text-gray-700 font-medium">Description</label>
            <textarea
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
            className="w-1/2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}
