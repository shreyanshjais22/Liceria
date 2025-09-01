import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets} from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    removeFromCart,
    getCartSize,
    updateCartItem,
    navigate,
    getTotalAmount,
    axios,
    user,
    setCartItems,
    setIsLogin
  } = useAppContext();

  const [showAddress, setShowAddress] = useState(false);
  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState();
  const [selectedAddress, setSelectedAddress] = useState();
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      if (product) {
        tempArray.push({ ...product, quantity: cartItems[key] });
      }
    }
    setCartArray(tempArray);
  };

  const getUserAddress = async () => {
    try {
      console.log("Fetching user addresses for userId:", user._id);
      const { data } = await axios.get(`/api/address/get/${user._id}`);
      console.log("User addresses fetched:", data);
      if (data.success) {
        setAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const placeOrder = async () => {
    try {
      if(!user){
        toast.error("Please Login first !");
        setIsLogin(false);
        return 
        
      }
      if (!selectedAddress) {
        return toast.error("Please select an Address !");
      }
      console.log("Placing order with details:")
      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", {
          userId: user._id,
          items: cartArray.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
        });
        console.log(data)
        console.log("Order placed response:", data);
        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/orders");
        } else {
          toast.error(data.message);
        }
      } else {
        // Online payment
        const { data } = await axios.post("/api/order/stripe", {
          userId: user._id,
          items: cartArray.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
        });
        if (data.success) {
          window.location.replace(data.url);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
const [subtotal, setSubtotal] = useState(0);

useEffect(() => {
  if (products.length > 0 && cartItems) {
    getCart();
    setSubtotal(getTotalAmount()); // ✅ updates state → UI re-renders
  }
}, [products, cartItems, getTotalAmount]);

  useEffect(() => {
    if (user) {
      getUserAddress();
    }
  }, [user]);

  console.log("Subtotal:", subtotal);
  const tax = Number(((subtotal * 2) / 100).toFixed(2));
  const finalAmount = Number((subtotal + tax).toFixed(2));

  return products.length > 0 && cartItems ? (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* CART ITEMS SECTION */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="bg-slate-900 px-8 py-4">
                <h1 className="text-2xl font-bold text-white">
                  Shopping Cart
                </h1>
                <p className="text-slate-300 mt-1">
                  <span className="font-semibold">{getCartSize()}</span> item{getCartSize() !== 1 ? 's' : ''} in your cart
                </p>
              </div>

              {/* Cart Items */}
              <div className="p-8">
                {/* Desktop Header */}
                <div className="hidden md:grid md:grid-cols-[3fr_1fr_1fr_auto] gap-6 text-sm font-semibold text-gray-600 uppercase tracking-wide pb-6 border-b border-gray-200">
                  <p>Product Details</p>
                  <p className="text-center">Subtotal</p>
                  <p className="text-center">Quantity</p>
                  <p className="text-center">Remove</p>
                </div>

                <div className="space-y-6 mt-6">
                  {cartArray.map((product, index) => (
                    <div
                      key={index}
                      className="group bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 p-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr_auto] gap-6 items-center">
                        {/* Product Info */}
                        <div className="flex items-center gap-4">
                          <div
                            onClick={() => {
                              navigate(
                                `/products/${product.category.toLowerCase()}/${product._id}`
                              );
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="cursor-pointer group/image relative"
                          >
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden group-hover/image:shadow-md transition-shadow">
                              <img
                                className="w-full h-full object-cover group-hover/image:scale-105 transition-transform duration-300"
                                src={product.image[0]}
                                alt={product.name}
                              />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-lg mb-2 truncate">
                              {product.name}
                            </h3>
                            <div className="space-y-1 text-sm text-gray-600">
                              <p className="flex items-center gap-2">
                                <span className="text-gray-500">Weight:</span>
                                <span className="font-medium">{product.weight || "N/A"}</span>
                              </p>
                              <p className="flex items-center gap-2">
                                <span className="text-gray-500">Price:</span>
                                <span className="font-semibold text-blue-600">
                                  {currency}{product.offerPrice}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Subtotal */}
                        <div className="text-center md:text-left">
                          <p className="text-lg font-bold text-gray-900">
                            {currency}{(product.offerPrice * product.quantity).toFixed(2)}
                          </p>
                        </div>

                        {/* Quantity */}
                        <div className="flex justify-center">
                          <div className="relative">
                            <select
                              onChange={(e) =>
                                updateCartItem(product._id, Number(e.target.value))
                              }
                              value={cartItems[product._id]}
                              className="appearance-none bg-white border-2 border-gray-300 rounded-lg px-4 py-2 pr-8 font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer hover:border-gray-400 transition-colors"
                            >
                              {Array.from(
                                { length: Math.max(9, cartItems[product._id]) },
                                (_, index) => (
                                  <option key={index} value={index + 1}>
                                    {index + 1}
                                  </option>
                                )
                              )}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <div className="flex justify-center">
                          <button
                            onClick={() => removeFromCart(product._id)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-200 group/remove"
                            title="Remove item"
                          >
                            <svg className="w-5 h-5 group-hover/remove:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Continue Shopping Button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      navigate(`/products`);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ORDER SUMMARY SECTION */}
          <div className="xl:w-96">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-8">
              {/* Header */}
              <div className="bg-emerald-600 px-6 py-6">
                <h2 className="text-2xl font-bold text-white">Order Summary</h2>
              </div>

              <div className="p-6 space-y-6">
                {/* Delivery Address */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
                    Delivery Address
                  </h3>
                  <div className="relative">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {selectedAddress
                          ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                          : "No address found"}
                      </p>
                      <button
                        onClick={() => setShowAddress(!showAddress)}
                        className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors"
                      >
                        Change Address
                      </button>
                    </div>
                    
                    {showAddress && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                        {addresses?.map((address, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setSelectedAddress(address);
                              setShowAddress(false);
                            }}
                            className="w-full text-left p-4 text-gray-700 text-sm hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                          >
                            {address.street}, {address.city}, {address.state}, {address.country}
                          </button>
                        ))}
                        <button
                          onClick={() => navigate("/add-address")}
                          className="w-full p-4 text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-sm font-semibold text-center transition-colors"
                        >
                          + Add New Address
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
                    Payment Method
                  </h3>
                  <div className="relative">
                    <select
                      onChange={(e) => setPaymentOption(e.target.value)}
                      value={paymentOption}
                      className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                    >
                      <option value="COD">Cash On Delivery</option>
                      <option value="Online">Online Payment</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium">{currency}{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="font-medium text-emerald-600">Free</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax (2%)</span>
                      <span className="font-medium">{currency}{tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-300 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">Total</span>
                        <span className="text-xl font-bold text-blue-600">
                          {currency}{finalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={placeOrder}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Cart;