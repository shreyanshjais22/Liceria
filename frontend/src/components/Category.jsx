import React, { useState, useEffect } from "react";
import { assets, categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

function Category() {
  const { navigate } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/products/${category.path.toLowerCase()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="mt-20 relative">
      {/* Background Decorative Elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -left-10 w-24 h-24 bg-cyan-200/20 rounded-full blur-2xl"></div>
      
      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 
        gap-4 md:gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`group cursor-pointer relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl
              transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] 
              border border-white/50 backdrop-blur-sm
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ 
              backgroundColor: category.bgColor,
              animationDelay: `${index * 100}ms`,
              background: `linear-gradient(135deg, ${category.bgColor} 0%, ${category.bgColor}CC 100%)`
            }}
            onClick={() => handleCategoryClick(category)}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
              transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            {/* Content Container */}
            <div className="relative z-10 p-4 md:p-6 flex flex-col justify-center items-center gap-3 min-h-[140px]">
              
              {/* Category Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-150 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src={category.image}
                  alt={category.text}
                  className="relative z-10 max-w-16 md:max-w-20 h-auto object-contain 
                    group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 
                    filter group-hover:drop-shadow-lg"
                />
              </div>
              
              {/* Category Name */}
              <div className="text-center">
                <h3 className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-gray-900 
                  transition-colors duration-300 leading-tight">
                  {category.text}
                </h3>
                
                {/* Hover Arrow */}
                <div className="mt-2 opacity-0 group-hover:opacity-100 transform translate-y-2 
                  group-hover:translate-y-0 transition-all duration-300">
                  <svg className="w-4 h-4 mx-auto text-gray-600 animate-bounce" fill="none" 
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Ripple Effect */}
            <div className="absolute inset-0 bg-white/10 rounded-2xl scale-0 group-active:scale-100 
              transition-transform duration-200"></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Category;