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
        className="w-full max-w-lg bg-white dark:bg-[var(--color-dark-surface)] shadow-xl rounded-2xl p-6 space-y-6 border border-pink-100/50 dark:border-[var(--color-dark-border)] transition-colors duration-300"
      >
        <h2 className="text-2xl font-bold font-heading text-center text-accent dark:text-[var(--color-accent)]">
          Add New Product
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-secondary dark:text-[var(--color-dark-text)]">
          {/* Product ID */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 dark:text-gray-300 font-medium text-sm">Product ID</label>
            <input
              type="text"
              required
              placeholder="Enter product ID"
              className="w-full border border-pink-100 dark:border-[var(--color-dark-border)] p-2.5 rounded-xl bg-pink-50/10 dark:bg-[var(--color-dark-bg)] text-secondary dark:text-[var(--color-dark-text)] focus:ring-2 focus:ring-accent focus:outline-none transition"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
          </div>

          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 dark:text-gray-300 font-medium text-sm">Name</label>
            <input
              type="text"
              required
              placeholder="Enter product name"
              className="w-full border border-pink-100 dark:border-[var(--color-dark-border)] p-2.5 rounded-xl bg-pink-50/10 dark:bg-[var(--color-dark-bg)] text-secondary dark:text-[var(--color-dark-text)] focus:ring-2 focus:ring-accent focus:outline-none transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Alt Names */}
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label className="text-gray-700 dark:text-gray-300 font-medium text-sm">Alternative Names</label>
            <input
              type="text"
              placeholder="Comma separated names (e.g. Cleanser, Face wash)"
              className="w-full border border-pink-100 dark:border-[var(--color-dark-border)] p-2.5 rounded-xl bg-pink-50/10 dark:bg-[var(--color-dark-bg)] text-secondary dark:text-[var(--color-dark-text)] focus:ring-2 focus:ring-accent focus:outline-none transition"
              value={altNames}
              onChange={(e) => setAltNames(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label className="text-gray-700 dark:text-gray-300 font-medium text-sm">Description</label>
            <textarea
              required
              placeholder="Enter product description"
              rows="3"
              className="w-full border border-pink-100 dark:border-[var(--color-dark-border)] p-2.5 rounded-xl bg-pink-50/10 dark:bg-[var(--color-dark-bg)] text-secondary dark:text-[var(--color-dark-text)] focus:ring-2 focus:ring-accent focus:outline-none transition resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Images Drag-and-Drop Selector */}
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label className="text-gray-700 dark:text-gray-300 font-medium text-sm">Upload Images</label>
            <div className="border-2 border-dashed border-pink-200 dark:border-[var(--color-dark-border)] rounded-2xl p-6 flex flex-col items-center justify-center bg-pink-50/20 dark:bg-[var(--color-dark-bg)] text-center relative hover:bg-pink-50/50 dark:hover:bg-gray-800/20 transition cursor-pointer">
              <input
                type="file"
                multiple
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                onChange={(e) => setImages(e.target.files)}
              />
              <svg className="w-10 h-10 text-accent mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-sm font-semibold text-secondary dark:text-[var(--color-dark-text)]">
                {images && images.length > 0 ? `${images.length} files selected` : "Drag and drop or click to upload"}
              </p>
              <p className="text-xs text-gray-400 mt-1">Supports multiple PNG, JPG, JPEG files</p>
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 dark:text-gray-300 font-medium text-sm">Category</label>
            <select
              className="w-full border border-pink-100 dark:border-[var(--color-dark-border)] p-2.5 rounded-xl bg-pink-50/10 dark:bg-[var(--color-dark-bg)] text-secondary dark:text-[var(--color-dark-text)] focus:ring-2 focus:ring-accent focus:outline-none transition cursor-pointer"
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
            <label className="text-gray-700 dark:text-gray-300 font-medium text-sm">Labelled Price</label>
            <input
              type="number"
              required
              placeholder="Enter original price"
              className="w-full border border-pink-100 dark:border-[var(--color-dark-border)] p-2.5 rounded-xl bg-pink-50/10 dark:bg-[var(--color-dark-bg)] text-secondary dark:text-[var(--color-dark-text)] focus:ring-2 focus:ring-accent focus:outline-none transition"
              value={labelledPrice}
              onChange={(e) => setLabelledPrice(e.target.value)}
            />
          </div>

          {/* Selling Price */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 dark:text-gray-300 font-medium text-sm">Selling Price</label>
            <input
              type="number"
              required
              placeholder="Enter selling price"
              className="w-full border border-pink-100 dark:border-[var(--color-dark-border)] p-2.5 rounded-xl bg-pink-50/10 dark:bg-[var(--color-dark-bg)] text-secondary dark:text-[var(--color-dark-text)] focus:ring-2 focus:ring-accent focus:outline-none transition"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Stock Quantity */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 dark:text-gray-300 font-medium text-sm">Stock Quantity</label>
            <input
              type="number"
              required
              placeholder="Enter stock count"
              className="w-full border border-pink-100 dark:border-[var(--color-dark-border)] p-2.5 rounded-xl bg-pink-50/10 dark:bg-[var(--color-dark-bg)] text-secondary dark:text-[var(--color-dark-text)] focus:ring-2 focus:ring-accent focus:outline-none transition"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4 pt-4">
          <Link
            to="/admin/products"
            className="w-1/2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl transition text-center shadow-md cursor-pointer"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="w-1/2 bg-accent hover:bg-accent-hover text-white font-bold py-3 px-4 rounded-xl transition shadow-md cursor-pointer"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
