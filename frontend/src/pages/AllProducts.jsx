import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import ProductCard from "../components/Productcard.jsx";

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div className="mt-16 flex flex-col">
      <div className="text-center mb-4">
          <h1 className=" text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            All Products
          </h1>
          <div className="w-40 h-0.5 bg-primary mx-auto rounded-full"></div>
        </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-6 mt-6">
        {filteredProducts
          .filter((product) => product.inStock)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default AllProducts;