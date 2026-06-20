import { useState } from "react"
import { addToCart, getCart, getTotal, removeFromCart } from "../../utils/cart"
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi"
import { Link } from "react-router-dom"

export default function CartPage(){
    const [cart,setCart] = useState(getCart())

    return(
        <div className="w-full max-w-full h-full flex flex-col items-center pt-4 relative">
            {cart.length > 0 && (
                <div className="z-50 hidden w-[400px] h-[80px] shadow-2xl absolute bottom-1 md:top-1 right-1 md:flex flex-col justify-center items-center bg-white rounded-lg border">
                    <p className="text-2xl text-secondary font-bold">Total: 
                        <span className="text-accent font-bold mx-2">
                            {getTotal().toFixed(2)}
                        </span>
                    </p>
                    <Link to="/checkout" state={
                        {
                            cart: cart
                        }
                    } className="text-white bg-accent px-4 py-2 rounded-lg font-bold hover:bg-secondary transition-all duration-300">
                        Checkout
                    </Link>
                </div>
            )}
            {cart.length === 0 ? (
                <div className="flex flex-col items-center gap-4 mt-20 px-4 text-center">
                    <p className="text-2xl text-gray-500 font-semibold">Your cart is empty 🛍️</p>
                    <Link to="/products" className="text-white bg-accent px-6 py-3 rounded-xl font-bold hover:bg-secondary transition-all duration-300 shadow-md">
                        Shop Products
                    </Link>
                </div>
            ) : (
                cart.map(
                    (item)=>{
                        return(
                            <div key={item.productId} className="w-[90%] md:w-[600px] my-4 md:h-[100px] rounded-tl-3xl rounded-bl-3xl bg-primary shadow-2xl flex flex-col md:flex-row relative justify-center items-center p-2 md:pt-0">
                                <img src={item.image} className="w-[100px] h-[100px] object-cover rounded-3xl"/>
                                <div className="w-[250px] h-full flex flex-col justify-center  items-center md:items-start pl-4">
                                    <h1 className="text-xl text-secondary font-semibold">{item.name}</h1>
                                    <h1 className="text-md text-gray-600 font-semibold">{item.productId}</h1>
                                    {
                                        item.labelledPrice > item.price ?
                                        <div>
                                            <span className="text-md mx-1 text-gray-500 line-through">{item.labelledPrice.toFixed(2)}</span>
                                            <span className="text-md mx-1 font-bold text-accent">{item.price.toFixed(2)}</span>
                                        </div>
                                        :<span className="text-md mx-1 font-bold text-accent">{item.price.toFixed(2)}</span>
                                    }
                                </div>
                                <div className="max-w-[100px] w-[100px]  h-full flex flex-row justify-evenly items-center">                                    
                                    <button className="text-white font-bold rounded-xl hover:bg-secondary p-2 text-xl cursor-pointer aspect-square bg-accent"
                                    onClick={
                                        ()=>{
                                            addToCart(item, -1)
                                            setCart(getCart())
                                        }}>
                                        <BiMinus/>
                                    </button>
                                    <h1 className="text-xl text-secondary font-semibold h-full flex items-center">{item.qty}</h1>
                                    <button className="text-white font-bold rounded-xl hover:bg-secondary p-2 text-xl cursor-pointer  aspect-square bg-accent" 
                                    onClick={
                                        ()=>{
                                            addToCart(item , 1)
                                            setCart(getCart())
                                        }}>
                                        <BiPlus/>
                                    </button>                                
                                </div>
                                {/* total */}
                                <div className="w-[200px] h-full flex flex-col justify-center items-center md:items-end pr-4">
                                    <h1 className="text-2xl text-secondary font-semibold">Rs. {(item.price*item.qty).toFixed(2)}</h1>
                                </div>
                                <button className="absolute text-red-600 cursor-pointer hover:bg-red-600 hover:text-white rounded-full p-2 right-[10px] md:right-[-35px]" 
                                onClick={
                                    ()=>{
                                        removeFromCart(item.productId)
                                        setCart(getCart())
                                    }}>
                                    <BiTrash/>
                                </button>
                            </div> 
                        )
                    }
                )
            )}
            {cart.length > 0 && (
                <div className="z-50 md:hidden flex w-full h-[100px] shadow-2xl flex-col justify-center items-center bg-white p-2 border-t mt-auto">
                    <p className="text-2xl text-secondary font-bold">Total: 
                        <span className="text-accent font-bold mx-2">
                            {getTotal().toFixed(2)}
                        </span>
                    </p>
                    <Link to="/checkout" state={
                        {
                            cart: cart
                        }
                    } className="text-white bg-accent px-4 py-2 rounded-lg font-bold hover:bg-secondary transition-all duration-300">
                        Checkout
                    </Link>
                </div>
            )}
        </div>
    );
}