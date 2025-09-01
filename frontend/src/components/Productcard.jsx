import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Productcard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  if (!product) return null;

  const discount = product.price && product.offerPrice
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;

  const handleCardClick = () => {
    navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
    scrollTo(0, 0);
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary/30"
    >
      {/* Discount */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
          -{discount}%
        </div>
      )}

      {/* Image */}
      <div className="relative bg-gray-50 group-hover:bg-gray-100 transition">
        <div className="aspect-square relative overflow-hidden rounded-xl">
          {!imageLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl" />}
          <img
            src={product.image?.[0] || assets.placeholder_image}
            alt={product.name}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
            className={`w-full h-full object-contain transition duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"} ${hovered ? "scale-90" : "scale-100"}`}
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-3 space-y-2 m-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full inline-block max-w-[120px] truncate">
          {product.category}
          </span>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex">
              {Array(5).fill("").map((_, i) => (
                <svg key={i} className={`w-3 h-3 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500">(4.0)</span>
          </div>
        </div>

        <h3 className="text-gray-900 font-semibold min-h-[1rem]">{product.name}</h3>

        {/* Price */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">{currency}{product.offerPrice.toLocaleString()}</span>
            {product.price !== product.offerPrice && (
              <span className="text-sm text-gray-500 line-through">{currency}{product.price.toLocaleString()}</span>
            )}
          </div>
          {discount > 0 && (
            <p className="text-xs text-green-600 font-medium">
              Save {currency}{(product.price - product.offerPrice).toLocaleString()}
            </p>
          )}
        </div>

        {/* Cart Buttons */}
        <div>
          {!cartItems[product._id] ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                addToCart(product._id);
              }}
              disabled={!product.inStock}
              className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-300 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition"
            >
              Add to Cart
            </button>
          ) : (
            <div
              className="flex items-center justify-between bg-primary/10 rounded-xl p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  removeFromCart(product._id);
                }}
                className="w-8 h-8 bg-white hover:bg-gray-100 rounded-lg flex items-center justify-center text-primary font-bold shadow-sm"
              >-</button>
              <span className="font-semibold text-primary px-3">{cartItems[product._id]}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  addToCart(product._id);
                }}
                className="w-8 h-8 bg-white hover:bg-gray-100 rounded-lg flex items-center justify-center text-primary font-bold shadow-sm"
              >+</button>
            </div>
          )}
        </div>
      </div>

      {/* Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-2xl opacity-0 group-hover:opacity-20 transition -z-10"></div>
    </div>
  );
};

export default Productcard;
