import React, { useState } from "react";
import { assets, categories } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const { axios } = useAppContext();

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      
      const productdata = {
        name,
        description: description.split("\n"),
        category,
        price,
        offerPrice,
      }
      
      if(!category || !name || !price || !offerPrice || files.length === 0) {
        setLoading(false);
        return toast.error("Please fill all the fields and upload at least one image");
      }
      
      const formData = new FormData();
      formData.append("productdata", JSON.stringify(productdata));

      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }

      const { data } = await axios.post("/api/product/add", formData);       
      if (data.success) {
        toast.success(data.message);
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index) => {
    const updatedFiles = [...files];
    updatedFiles[index] = null;
    setFiles(updatedFiles);
  };

  return (
    <div className="max-h-full">
      <div className=" p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
          <p className="text-gray-600">Fill in the details below to add a new product to your store</p>
        </div>

        <form onSubmit={onSubmitHandler} className="bg-white rounded-xl p-8">
          <div className="space-y-8 pr-10">
            {/* Product Images Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Images</h3>
              <p className="text-sm text-gray-600 mb-4">Upload up to 4 high-quality images of your product</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array(4).fill("").map((_, index) => (
                  <div key={index} className="relative group">
                    <label 
                      htmlFor={`image${index}`}
                      className="block aspect-square border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer overflow-hidden"
                    >
                      <input
                        onChange={(e) => {
                          const updatedFiles = [...files];
                          updatedFiles[index] = e.target.files[0];
                          setFiles(updatedFiles);
                        }}
                        accept="image/*"
                        type="file"
                        id={`image${index}`}
                        hidden
                      />
                      
                      {files[index] ? (
                        <div className="relative w-full h-full">
                          <img
                            className="w-full h-full object-cover"
                            src={URL.createObjectURL(files[index])}
                            alt={`Upload ${index + 1}`}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  removeImage(index);
                                }}
                                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 21 21">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 p-4">
                          <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                          </svg>
                          <span className="text-xs text-center">Add Image</span>
                        </div>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Product Details</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Product Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="product-name">
                    Product Name *
                  </label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    id="product-name"
                    type="text"
                    placeholder="Enter product name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>

                {/* Product Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="product-description">
                    Product Description *
                  </label>
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    id="product-description"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all"
                    placeholder="Describe your product features, benefits, and specifications..."
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate lines will be treated as bullet points</p>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="category">
                    Category *
                  </label>
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    id="category"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((item, index) => (
                      <option key={index} value={item.path}>
                        {item.path}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Empty div for spacing */}
                <div></div>

                {/* Product Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="product-price">
                    Original Price *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                      id="product-price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Offer Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="offer-price">
                    Sale Price *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      onChange={(e) => setOfferPrice(e.target.value)}
                      value={offerPrice}
                      id="offer-price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      required
                    />
                  </div>
                  {price && offerPrice && parseFloat(price) > parseFloat(offerPrice) && (
                    <p className="text-sm text-green-600 mt-1">
                      Discount: {Math.round(((price - offerPrice) / price) * 100)}% off
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button 
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 min-w-[120px] justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Add Product
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;