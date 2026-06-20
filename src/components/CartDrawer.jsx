import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiMinus, BiPlus, BiTrash, BiX } from "react-icons/bi";
import { getCart, addToCart, removeFromCart, getTotal } from "../utils/cart";

export default function CartDrawer({ isOpen, onClose }) {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setCart(getCart());
    }
  }, [isOpen]);

  useEffect(() => {
    const handleCartUpdate = () => {
      setCart(getCart());
    };
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const handleQtyChange = (item, qty) => {
    addToCart(item, qty);
    setCart(getCart());
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
    setCart(getCart());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer Panel */}
      <div className="relative w-full max-w-md h-full bg-white dark:bg-[var(--color-dark-surface)] shadow-2xl flex flex-col z-10 border-l border-pink-100 dark:border-[var(--color-dark-border)]">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-pink-100 dark:border-[var(--color-dark-border)]">
          <h2 className="text-xl font-bold text-secondary dark:text-[var(--color-dark-text)] flex items-center gap-2">
            Shopping Cart 🛍️
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-pink-50 dark:hover:bg-pink-950/20 text-gray-500 hover:text-red-500 transition cursor-pointer"
          >
            <BiX size={24} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-2 text-gray-500">
              <span className="text-4xl">🛒</span>
              <p className="text-lg font-medium">Your cart is empty</p>
              <button 
                onClick={() => { onClose(); navigate("/products"); }}
                className="mt-2 text-sm text-accent hover:underline font-bold cursor-pointer"
              >
                Shop Beauty Products
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div 
                key={item.productId}
                className="flex flex-row items-center gap-3 p-3 bg-pink-50/50 dark:bg-[var(--color-dark-bg)] rounded-2xl border border-pink-100/50 dark:border-[var(--color-dark-border)] transition-colors duration-300"
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-16 h-16 object-cover rounded-xl border border-gray-200 dark:border-gray-700"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
                  <div>
                    <h3 className="font-bold text-secondary dark:text-[var(--color-dark-text)] truncate text-sm">
                      {item.name}
                    </h3>
                    <p className="text-[10px] text-gray-400 font-medium truncate">
                      {item.productId}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-accent mt-1">
                    Rs. {item.price.toFixed(2)}
                  </p>
                </div>
                
                {/* Right Action Column */}
                <div className="flex flex-col items-end justify-between self-stretch py-0.5 gap-2">
                  <button 
                    onClick={() => handleRemove(item.productId)}
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition cursor-pointer flex items-center justify-center"
                    aria-label="Remove item"
                  >
                    <BiTrash size={16} />
                  </button>
                  
                  {/* Quantity adjustments */}
                  <div className="flex items-center gap-1.5 bg-white dark:bg-[var(--color-dark-surface)] px-2 py-0.5 rounded-xl shadow-xs border border-gray-100 dark:border-[var(--color-dark-border)]">
                    <button 
                      onClick={() => handleQtyChange(item, -1)}
                      className="text-gray-500 hover:text-accent font-bold cursor-pointer"
                    >
                      <BiMinus size={12} />
                    </button>
                    <span className="text-xs font-bold text-secondary dark:text-[var(--color-dark-text)] w-4 text-center">
                      {item.qty}
                    </span>
                    <button 
                      onClick={() => handleQtyChange(item, 1)}
                      className="text-gray-500 hover:text-accent font-bold cursor-pointer"
                    >
                      <BiPlus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-pink-100 dark:border-[var(--color-dark-border)] bg-gray-50 dark:bg-[var(--color-dark-bg)] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400 font-medium">Subtotal</span>
              <span className="text-2xl font-bold text-secondary dark:text-[var(--color-dark-text)]">
                Rs. {getTotal().toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => {
                onClose();
                navigate("/checkout", { state: { cart } });
              }}
              className="w-full bg-accent hover:bg-accent-hover text-white py-3 rounded-xl font-bold shadow-md transition duration-300 text-center block cursor-pointer"
            >
              Checkout Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
