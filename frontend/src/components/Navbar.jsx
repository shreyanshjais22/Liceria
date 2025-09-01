import React from "react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";
import { assets } from "../assets/assets.js";
import toast from "react-hot-toast";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const { user, setUser, setIsLogin, navigate, setSearchQuery, getCartSize, axios } =
    useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout", {
        withCredentials: true,
      });

      if (data.success) {
        setOpen(false);
        toast.success(data.message);
        setUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Enhanced link styling with better hover effects
  const linkClass = ({ isActive }) =>
    `relative transition-all duration-300 ease-in-out font-medium ${
      isActive 
        ? "text-orange-600 font-semibold after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-orange-600 after:rounded-full" 
        : "text-gray-700 hover:text-orange-500 hover:scale-105 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-orange-500 after:rounded-full after:transition-all after:duration-300 hover:after:w-full"
    }`;

  return (
    <>
      {/* Backdrop for mobile menu */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-3 border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-sm transition-all">
        {/* Logo with hover effect */}
        <NavLink onClick={() => setOpen(false)} to="/" className="transition-transform hover:scale-105">
          <img src={assets.logo} alt="Logo" className="w-16 md:w-20 drop-shadow-sm" />
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={linkClass}>
            All Products
          </NavLink>
          <NavLink to="/orders" className={linkClass}>
            My Orders
          </NavLink>

          {/* Enhanced Search Bar */}
          <div className="hidden lg:flex items-center text-sm gap-3 border-2 border-gray-300 focus-within:border-orange-400 px-5 py-2.5 rounded-full w-64 lg:w-80 bg-gray-50 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none placeholder-gray-500 text-gray-700"
              type="text"
              placeholder="Search products..."
            />
            <img 
              src={assets.search_icon} 
              alt="Search Icon" 
              className="w-4 h-4 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
            />
          </div>

          {/* Enhanced Cart with better badge */}
          <div 
            onClick={() => navigate("/cart")} 
            className="relative cursor-pointer group"
          >
            <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <img 
                src={assets.cart_icon} 
                alt="Cart icon" 
                className="w-6 h-6 group-hover:scale-110 transition-transform"
              />
              {getCartSize() > 0 && (
                <span className="absolute -top-1 -right-1 text-xs text-white bg-gradient-to-r from-orange-500 to-red-500 min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-semibold shadow-lg animate-pulse">
                  {getCartSize()}
                </span>
              )}
            </div>
          </div>

          {/* Enhanced Profile / Login */}
          {user ? (
            <div className="relative group">
              <div 
                onClick={() => navigate("/profile")} 
                className="cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <img 
                  src={assets.profile_icon} 
                  alt="profile-icon" 
                  className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-orange-400 transition-all shadow-sm"
                />
              </div>
              
              {/* Enhanced dropdown */}
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute top-14 right-0 bg-white shadow-xl border border-gray-100 py-2 w-40 rounded-lg text-sm z-40 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-l border-t border-gray-100 transform rotate-45"></div>
                
                <div
                  onClick={() => {
                    navigate("/orders");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-4 py-2.5 hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition-colors flex items-center gap-2"
                >
                  <span className="text-gray-400">📦</span>
                  My Orders
                </div>
                
                <div
                  onClick={logout}
                  className="px-4 py-2.5 hover:bg-red-50 hover:text-red-600 cursor-pointer transition-colors flex items-center gap-2 border-t border-gray-100"
                >
                  <span className="text-gray-400">🚪</span>
                  Logout
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsLogin(false)}
              className="px-8 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Items */}
        <div className="flex sm:hidden items-center gap-4">
          {/* Mobile Cart */}
          <div 
            onClick={() => navigate("/cart")} 
            className="relative cursor-pointer p-2"
          >
            <img src={assets.cart_icon} alt="Cart icon" className="w-6 h-6" />
            {getCartSize() > 0 && (
              <span className="absolute -top-1 -right-1 text-xs text-white bg-gradient-to-r from-orange-500 to-red-500 min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-semibold shadow-lg">
                {getCartSize()}
              </span>
            )}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <button 
            onClick={() => setOpen(!open)} 
            aria-label="Menu"
            className={`p-2 rounded-lg transition-all duration-300 ${
              open ? 'bg-orange-100 rotate-90' : 'hover:bg-gray-100'
            }`}
          >
            <img 
              src={assets.menu_icon} 
              alt="Menu Icon" 
              className={`w-6 h-6 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        <div
          className={`absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-xl border-t border-gray-200 z-50 sm:hidden transition-all duration-300 ease-in-out ${
            open 
              ? "max-h-[400px] opacity-100 translate-y-0" 
              : "max-h-0 opacity-0 -translate-y-4 overflow-hidden"
          }`}
        >
          <div className="p-6 space-y-4">
            {/* Mobile Search */}
            <div className="flex items-center gap-3 border-2 border-gray-300 focus-within:border-orange-400 px-4 py-3 rounded-full bg-gray-50">
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none placeholder-gray-500 text-gray-700"
                type="text"
                placeholder="Search products..."
              />
              <img src={assets.search_icon} alt="Search Icon" className="w-4 h-4 opacity-60" />
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-3">
              <NavLink 
                to="/" 
                className="block py-3 px-4 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors font-medium"
                onClick={() => setOpen(false)}
              >
                🏠 Home
              </NavLink>
              
              <NavLink
                to="/products"
                className="block py-3 px-4 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors font-medium"
                onClick={() => setOpen(false)}
              >
                🛍️ All Products
              </NavLink>
              
              {user && (
                <NavLink
                  to="/orders"
                  className="block py-3 px-4 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors font-medium"
                  onClick={() => setOpen(false)}
                >
                  📦 My Orders
                </NavLink>
              )}
              
              <NavLink
                to="/contact"
                className="block py-3 px-4 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors font-medium"
                onClick={() => setOpen(false)}
              >
                📞 Contact
              </NavLink>
            </div>

            {/* Mobile Auth Button */}
            <div className="pt-4 border-t border-gray-200">
              {!user ? (
                <button
                  onClick={() => {
                    setOpen(false);
                    setIsLogin(false);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-medium transition-all duration-300 shadow-md"
                >
                  Login / Sign Up
                </button>
              ) : (
                <button
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                  className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium transition-all duration-300 shadow-md"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}