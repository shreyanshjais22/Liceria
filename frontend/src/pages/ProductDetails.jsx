import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/Productcard";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const product = products.find((item) => item._id === id);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => {
        return item.category === product.category;
      });
      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products]);

  useEffect(() => {
    setThumbnail(product?.image[0] ? product.image[0] : null);
  }, [product]);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    await addToCart(product._id);
    setIsAddingToCart(false);
  };

  const handleBuyNow = async () => {
    setIsAddingToCart(true);
    await addToCart(product._id);
    navigate("/cart");
  };

  const calculateDiscount = () => {
    if (product.price && product.offerPrice) {
      return Math.round(((product.price - product.offerPrice) / product.price) * 100);
    }
    return 0;
  };

  return (
    product && (
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center space-x-2 text-sm font-bold text-gray-600 mb-8">
            <Link to={"/"} className="hover:text-primary  transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to={"/products"} className="hover:text-primary transition-colors">
              Products
            </Link>
            <span>/</span>
            <Link 
              to={`/products/${product.category.toLowerCase()}`}
              className="hover:text-primary transition-colors"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-primary font-medium">{product.name}</span>
          </nav>

          <div className="bg-white rounded-2xl shadow-xl  border border-gray-200 flex justify-center overflow-hidden">
            <div className="flex gap-20 p-6 lg:p-8">
              <div className="space-y-4">
                <div className="relative overflow-hidden border-none border-gray-200">
                  <img 
                    src={thumbnail} 
                    alt="Selected product" 
                    className="w-full h-full md:h-110 md:w-110 object-cover rounded-2xl"
                  />
                  {calculateDiscount() > 0 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {calculateDiscount()}% OFF
                    </div>
                  )}
                </div>

                {/* Thumbnail Images */}
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.image.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setThumbnail(image)}
                      className={`flex-shrink-0 w-15 h-15 rounded-lg overflow-hidden border-2 transition-all ${
                        thumbnail === image 
                          ? 'border-primary shadow-md' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`Thumbnail ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {product.name}
                  </h1>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {Array(5).fill("").map((_, i) => (
                        <img
                          key={i}
                          className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                          src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                        >
                          </img>
                      ))}
                    </div>
                    <span className="text-gray-600 font-medium">(4.0)</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center gap-4 mb-1">
                    <span className="text-3xl lg:text-4xl font-bold text-gray-900">
                      {currency}{product.offerPrice}
                    </span>
                    {product.price !== product.offerPrice && (
                      <span className="text-xl text-gray-500 line-through">
                        {currency}{product.price}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    (Inclusive of all taxes)
                  </p>
                  {calculateDiscount() > 0 && (
                    <p className="text-sm text-green-600 font-semibold mt-1">
                      You save {currency}{product.price - product.offerPrice} ({calculateDiscount()}%)
                    </p>
                  )}
                </div>

                {/* Product Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    About This Product
                  </h3>
                  <div className="rounded-xl p-2">
                    <ul className="space-y-1">
                      {product.description.map((desc, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className="flex-1 py-4 px-6 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition-colors disabled:opacity-50"
                  >
                    {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                  </button>
                  <button
                    onClick={handleBuyNow}
                    disabled={isAddingToCart}
                    className="flex-1 py-4 px-6 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
                  >
                    Buy Now
                  </button>
                </div>

                {/* Product Features */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">In Stock</p>
                      <p className="text-sm text-gray-600">Ready to ship</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Fast Delivery</p>
                      <p className="text-sm text-gray-600">2-3 business days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Related Products
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            </div>

            {relatedProducts.filter(product => product.inStock).length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                  {relatedProducts
                    .filter((product) => product.inStock)
                    .map((product, index) => (
                      <ProductCard key={index} product={product} />
                    ))}
                </div>
                
                <div className="text-center mt-12">
                  <button
                    onClick={() => {
                      navigate(`/products/${product.category.toLowerCase()}`);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-xl font-semibold transition-all duration-200"
                  >
                    View All {product.category} Products
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No related products available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default ProductDetails;