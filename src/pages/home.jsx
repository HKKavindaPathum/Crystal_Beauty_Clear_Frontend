import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./client/productPage";
import ProductOverviewPage from "./client/productOverview";
import CartPage from "./client/cart";
import CheckoutPage from "./client/checkOut";
import HomeContent from "../components/homeContent";
import AboutPage from "./client/about";
import ContactPage from "./client/contact";

export default function HomePage(){
    return(
        <div className="w-full min-h-screen flex flex-col items-center">
            <Header/>
            <div className="w-full flex-1 flex flex-col items-center">
                <Routes path="/*">
                    <Route path="/" element={<HomeContent />}/>
                    <Route path="/products" element={<ProductPage/>}/>
                    <Route path="/about" element={<AboutPage/>}/>
                    <Route path="/contact" element={<ContactPage/>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/checkout" element={<CheckoutPage/>}/>
                    <Route path="/overview/:id" element={<ProductOverviewPage/>}/>
                    <Route path="/products/:category" element={<ProductPage />} />
                    <Route path="/*" element={<h1>404 Not Found</h1>}/> 
                </Routes>
            </div>
        </div>
    )
}