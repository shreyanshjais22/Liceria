import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { categories } from "../assets/assets";
import ProductCard from "../components/Productcard";

const descriptions = {
  electronics: "Discover cutting-edge technology and innovative gadgets for your digital lifestyle.",
  clothing: "Explore our curated collection of fashion-forward apparel for every occasion.",
  books: "Immerse yourself in captivating stories and expand your knowledge with our book collection.",
  home: "Transform your living space with our stylish and functional home essentials.",
  sports: "Gear up for your active lifestyle with premium sports and fitness equipment.",
  beauty: "Enhance your natural beauty with our premium cosmetics and skincare products.",
};

const icons = {
  electronics: "📱",
  clothing: "👕",
  books: "📚",
  home: "🏠",
  sports: "⚽",
  beauty: "💄",
};

const ProductCategory = () => {
  const { products = [] } = useAppContext();
  const { category = "" } = useParams();
  const categoryParam = category.toLowerCase();
  const [sortBy, setSortBy] = useState("name");
  const [items, setItems] = useState([]);

  const searchCategory = categories.find(c => c.path.toLowerCase() === categoryParam);
  const filtered = products.filter(p => p.category.toLowerCase() === categoryParam && p.inStock);

  useEffect(() => {
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low": return (a.offerPrice || a.price) - (b.offerPrice || b.price);
        case "price-high": return (b.offerPrice || b.price) - (a.offerPrice || a.price);
        case "newest": return new Date(b.createdAt) - new Date(a.createdAt);
        default: return a.name.localeCompare(b.name);
      }
    });
    setItems(sorted);
  }, [filtered, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {searchCategory && (
          <>
            {/* Enhanced Header with Glass Effect */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-6 mb-5 shadow-2xl">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
              
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 text-6xl opacity-20 transform rotate-12">
                {icons[categoryParam] || "🛍️"}
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
                  {searchCategory.text}
                </h1>
                <p className="text-blue-100 text-lg mb-5 max-w-2xl leading-relaxed">
                  {descriptions[categoryParam] || "Browse our premium collection."}
                </p>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                  <span className="font-medium">{filtered.length} Products Available</span>
                </div>
              </div>
            </div>

            {/* Enhanced Sort Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/20">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium text-lg">
                    {items.length} result{items.length !== 1 ? 's' : ''}
                  </span>
                </div>
                
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Sort by
                  </label>
                  <select 
                    value={sortBy} 
                    onChange={e => setSortBy(e.target.value)} 
                    className="appearance-none bg-white/80 border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300 shadow-sm"
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-6">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Enhanced Products Grid */}
        {items.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {items.map((p, index) => (
              <div 
                key={p._id} 
                className="transform hover:scale-[1.02] transition-all duration-300"
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        ) : (
          /* Enhanced Empty State */
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30 scale-150"></div>
              <div className="relative text-8xl mb-4 animate-bounce">
                {icons[categoryParam] || "🛍️"}
              </div>
            </div>
            
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              No Products Found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md text-lg leading-relaxed">
              {searchCategory 
                ? `We're currently out of stock for ${searchCategory.text}. Check back soon for new arrivals!`
                : "This category doesn't exist or has no products available."
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => window.history.back()} 
                className="group relative px-6 py-3 bg-white border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Go Back
                </span>
              </button>
              
              <button 
                onClick={() => (window.location.href = "/products")} 
                className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-2">
                  Browse All Products
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Add some CSS animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .grid > div {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ProductCategory;