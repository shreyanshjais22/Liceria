import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer.jsx";
import { useAppContext } from "./context/AppContext.jsx";
import Login from "./components/Login.jsx";
import AllProducts from "./pages/AllProducts.jsx";
import ProductCategory from "./pages/ProductCategory.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import AddAddress from "./pages/AddAddress.jsx";
import SellerLogin from "./components/seller/SellerLogin.jsx";
import SellerLayout from "./components/seller/SellerLayout.jsx";
import AddProduct from "./components/seller/AddProduct.jsx";
import Orders from "./components/seller/Orders.jsx";
import ProductList from "./components/seller/ProductList.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import Loading from "./components/Loading.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

function App() {
  const [count, setCount] = useState(0);
  const isSellerPath = useLocation().pathname.includes("seller");
  const { isLogin, isSeller,loadingUser } = useAppContext();

  
  return loadingUser ? (
    <div>
      <Loading />
    </div>
  ) :(
    <>
      <div>
        {!isSellerPath && <Navbar />}
        {!isSellerPath && !isLogin ? <Login /> : null}
        <Toaster />
        <div
          className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"
            }`}
        >
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:category" element={<ProductCategory />} />
            <Route path="/products/:category/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/add-address" element={<AddAddress />} />
            <Route path="/orders" element={<MyOrders/>} />
            <Route path="/profile" element={<ProfilePage/>} />
            <Route path="/loader" element={<Loading />} />

            <Route path="/seller" element={isSeller ? <SellerLayout /> : <SellerLogin />}>
              <Route index element={isSeller ? <AddProduct /> : null} />
              <Route path="product-list" element={<ProductList />} />
              <Route path="orders" element={<Orders />} />
            </Route>
          </Routes>

        </div>
        {!isSellerPath && <Footer />}
      </div>
    </>
  );
}

export default App;
