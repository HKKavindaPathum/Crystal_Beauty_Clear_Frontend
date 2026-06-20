import { useState } from "react";
import { addToCart, getCart, getTotal, removeFromCart } from "../../utils/cart";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState(getCart());

  return (
    <div className="w-full min-h-screen bg-pink-50 dark:bg-[var(--color-dark-bg)] pt-4 pb-24 px-4 flex flex-col items-center relative transition-colors duration-300">
      
      {/* Desktop Total Box */}
      {cart.length > 0 && (
        <div className="z-20 hidden md:flex w-full max-w-[600px] h-[80px] shadow-lg rounded-2xl bg-white dark:bg-[var(--color-dark-surface)] border border-pink-100 dark:border-[var(--color-dark-border)] flex-row justify-between items-center px-6 mb-4">
          <p className="text-xl text-secondary dark:text-[var(--color-dark-text)] font-bold">
            Total: 
            <span className="text-accent font-extrabold mx-2">
              Rs. {getTotal().toFixed(2)}
            </span>
          </p>
          <Link 
            to="/checkout" 
            state={{ cart }} 
            className="text-white bg-accent hover:bg-accent-hover px-6 py-2.5 rounded-xl font-bold shadow-md transition duration-300 cursor-pointer"
          >
            Checkout
          </Link>
        </div>
      )}

      {/* Cart Items */}
      {cart.length === 0 ? (
        <div className="flex flex-col items-center gap-4 mt-20 px-4 text-center">
          <p className="text-2xl text-gray-500 font-semibold dark:text-gray-400">Your cart is empty 🛍️</p>
          <Link 
            to="/products" 
            className="text-white bg-accent hover:bg-accent-hover px-6 py-3 rounded-xl font-bold transition duration-300 shadow-md cursor-pointer"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="w-full max-w-[600px] flex flex-col gap-4">
          {cart.map((item) => (
            <div 
              key={item.productId} 
              className="w-full rounded-2xl bg-white dark:bg-[var(--color-dark-surface)] border border-pink-100/50 dark:border-[var(--color-dark-border)] shadow-md flex flex-row items-center p-3 gap-4 transition-colors duration-300"
            >
              <img 
                src={item.image} 
                alt={item.name}
                className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl border dark:border-gray-800"
              />
              
              <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
                <div>
                  <h3 className="text-sm md:text-md font-bold text-secondary dark:text-[var(--color-dark-text)] truncate">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium truncate">
                    {item.productId}
                  </p>
                </div>
                
                <div className="flex flex-row flex-wrap items-center justify-between mt-2 gap-2">
                  {item.labelledPrice > item.price ? (
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-gray-400 line-through">
                        Rs. {item.labelledPrice.toFixed(2)}
                      </span>
                      <span className="text-sm font-bold text-accent">
                        Rs. {item.price.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm font-bold text-accent">
                      Rs. {item.price.toFixed(2)}
                    </span>
                  )}

                  {/* Quantity Controls & Delete */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-pink-50/55 dark:bg-[var(--color-dark-bg)] px-2 py-1 rounded-xl border dark:border-[var(--color-dark-border)]">
                      <button 
                        className="text-gray-500 hover:text-accent font-bold cursor-pointer"
                        onClick={() => {
                          addToCart(item, -1);
                          setCart(getCart());
                        }}
                      >
                        <BiMinus size={14} />
                      </button>
                      <span className="text-sm font-bold text-secondary dark:text-[var(--color-dark-text)] w-4 text-center">
                        {item.qty}
                      </span>
                      <button 
                        className="text-gray-500 hover:text-accent font-bold cursor-pointer"
                        onClick={() => {
                          addToCart(item, 1);
                          setCart(getCart());
                        }}
                      >
                        <BiPlus size={14} />
                      </button>
                    </div>
                    
                    <button 
                      className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 p-2 rounded-xl cursor-pointer transition flex items-center justify-center" 
                      onClick={() => {
                        removeFromCart(item.productId);
                        setCart(getCart());
                      }}
                      aria-label="Remove item"
                    >
                      <BiTrash size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile Sticky Total Box */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden flex w-full h-[80px] shadow-2xl bg-white dark:bg-[var(--color-dark-surface)] border-t border-pink-100 dark:border-[var(--color-dark-border)] flex-row justify-between items-center px-6 transition-colors duration-300">
          <p className="text-lg text-secondary dark:text-[var(--color-dark-text)] font-bold">
            Total: 
            <span className="text-accent font-extrabold mx-1">
              Rs. {getTotal().toFixed(2)}
            </span>
          </p>
          <Link 
            to="/checkout" 
            state={{ cart }} 
            className="text-white bg-accent hover:bg-accent-hover px-5 py-2 rounded-xl font-bold shadow-md transition duration-300 cursor-pointer"
          >
            Checkout
          </Link>
        </div>
      )}
    </div>
  );
}