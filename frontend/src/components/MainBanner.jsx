import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import { Link } from "react-router-dom";

function MainBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-hidden group mt-5">
      {/* Background with Overlay */}
      <div className="relative transition-transform duration-700 group-hover:scale-105">
        <img src={assets.main_banner_bg} alt="banner" className="hidden md:block w-full object-cover" />
        <img src={assets.main_banner_bg_sm} alt="banner" className="md:hidden w-full object-cover" />
      </div>

      {/* Content */}
      <div className={`absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-20 md:pb-0 px-6 md:px-12 lg:px-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h1 className={`text-2xl sm:text-3xl flex flex-col md:text-4xl lg:text-5xl font-bold text-white text-center md:text-left leading-tight  transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="relative text-black mb-3">
            Freshness You Can Trust,
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transform origin-left transition-transform duration-1000 delay-700 scale-x-0 group-hover:scale-x-100" />
          </span>
          <span className="text-orange-500 ">
            Savings You Will Love!
            <div className="absolute -top-1 -right-2 w-3 h-3 bg-blue-300 rounded-full animate-ping" />
          </span>
        </h1>

        <p className={`text-gray-600 flex text-center md:text-left font-bold md:text-lg mt-3 max-w-md leading-relaxed  transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Discover premium quality products at unbeatable prices
        </p>

        {/* Buttons */}
        <div className={`flex flex-col sm:flex-row items-center gap-3 mt-6 font-medium transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {/* Primary CTA */}
          <Link
            to="/products"
            className="group relative flex items-center gap-2 px-6 md:px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full text-white shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-105 active:scale-95 border-2 border-none transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10 font-semibold">Shop Now</span>
            <img className="md:hidden relative z-10 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" src={assets.white_arrow_icon} alt="arrow" />
            <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-100 transition-transform duration-200" />
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className={`sm:flex items-center gap-4 mt-4 text-black text-xs transition-all duration-1000 delay-900 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {[
            { color: "bg-green-700", text: "Free Delivery" },
            { color: "bg-blue-700", text: "24/7 Support" },
            { color: "bg-purple-700", text: "Quality Guaranteed" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-2 h-2 ${item.color} rounded-full animate-pulse`} />
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce md:hidden">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default MainBanner;
