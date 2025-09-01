import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import axios from "axios";


axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URI;


export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const currency = import.meta.env.VITE_CURRENCY;
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({});


    const fetchSeller = async () => {
        try {
            const { data } = await axios.get("/api/seller/is-auth", { withCredentials: true });

            if (data.success) {
                setIsSeller(true);
            } else {
                setIsSeller(false);
            }
        } catch (err) {
            console.log(err);
            setIsSeller(false);
        }
    };

    const fetchUser = async () => {
        try {
            setIsLogin(true);
            const { data } = await axios.get("/api/user/is-auth");

            if (data.success) {
                setUser(data.user);
                setCartItems(data.user.cartItems || []);
                
            } else {
                setUser(null);
                console.log("error")
            }
        } catch (error) {
            console.error("Failed to fetch user:");
            setUser(null);
            if (error.response?.status === 401) {
                console.log("User is not authenticated");
            }
        }finally {
            setIsLogin(true);
        }
    };


    const fetchProducts = async () => {
        try {
            const { data } = await axios.get("/api/product/list");
            if (data.success) {
                setProducts(data.products);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error("Failed to load products");
        }
    };

    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = (cartData[itemId] || 0) + 1;
        setCartItems(cartData);
        if (cartData[itemId] === 1) toast.success("Added To Cart");
    };

    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        if (quantity <= 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData);
        toast.success("Cart Updated");
    };

    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] <= 0) {
                delete cartData[itemId];
            }
            setCartItems(cartData);
            toast.success("Removed From Cart");
        }
    };

    //get cart item size
    const getCartSize = () => {
        let size = 0;
        for (let key in cartItems) {
            size += cartItems[key];
        }
        return size;
    }

    //get total amt
    const getTotalAmount = () => {
        let total = 0;
        for (let itemId in cartItems) {
            const product = products.find((product) => product._id === itemId);
            if (cartItems[itemId] > 0 && product) {
                total += product.offerPrice * cartItems[itemId];
            }
        }
        return Number(total.toFixed(2));
    };

    useEffect(() => {
        const updatCart = async () => {
            try {
                const { data } = await axios.post("/api/cart/update", {
                    userId: user._id,
                    cartItems,
                });
                if (!data.success) {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
        if (user) updatCart();
    }, [cartItems]);

    useEffect(() => {
        fetchUser();
        fetchProducts();
        fetchSeller();
    }, []);

    const value = {

        navigate,
        isSeller,
        user,
        setUser,
        setIsSeller,
        isLogin,
        setIsLogin,
        products,
        currency,
        addToCart,
        updateCartItem,
        removeFromCart,
        cartItems,
        searchQuery,
        setSearchQuery, getCartSize,
        getTotalAmount,
        setCartItems,
        axios,
        fetchProducts
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
