import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const InputField = ({ type, placeholder, name, handleChange, address }) => {
  return (
    <input
      className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      name={name}
      value={address[name]}
      required
    />
  );
};

// ✅ Accept `onSuccess` as a prop
const AddAddress = ({ onSuccess }) => {
  const { axios, user, navigate,setIsLogin  } = useAppContext();
  const [address, setAddress,] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((p) => ({
      ...p,
      [name]: value,
    }));
  };

  const urlLocater = useLocation();

  const onSubmitHandler = async (e) => {
  e.preventDefault(); 

  if (!user) {
    toast.error("Please Login First");
    setIsLogin(false);
    return;
  }
  try {
    const { data } = await axios.post("/api/address/add", {
      address,
      userId: user._id,
    });

    if (data.success) {
      toast.success(data.message);
      if (onSuccess) onSuccess();

      navigate(urlLocater.pathname === "/profile" ? "/profile" : "/cart");
    } else {
      toast.error(data.message || "Something went wrong");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};


  return (
    <div className="mt-8 pb-8">
       <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Add Shipping Address
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Please provide your complete shipping address to ensure accurate and timely delivery of your order.
          </p>
        </div>
      <div className="flex rounded-3xl p-8 shadow-2xl flex-col-reverse md:flex-row justify-center gap-22 mt-6">
        <div className="flex-1 max-w-md">
          <form className="space-y-3 mt-6 text-sm " onSubmit={onSubmitHandler}>
            <div className="grid grid-cols-2 gap-4">
              <InputField handleChange={handleChange} address={address} name="firstName" type="text" placeholder="First Name" />
              <InputField handleChange={handleChange} address={address} name="lastName" type="text" placeholder="Last Name" />
            </div>
            <InputField handleChange={handleChange} address={address} name="email" type="email" placeholder="Email Address" />
            <InputField handleChange={handleChange} address={address} name="street" type="text" placeholder="Street" />
            <div className="grid grid-cols-2 gap-4">
              <InputField handleChange={handleChange} address={address} name="city" type="text" placeholder="City" />
              <InputField handleChange={handleChange} address={address} name="state" type="text" placeholder="State" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField handleChange={handleChange} address={address} name="zipcode" type="number" placeholder="Zip code" />
              <InputField handleChange={handleChange} address={address} name="country" type="text" placeholder="Country" />
            </div>
            <InputField handleChange={handleChange} address={address} name="phone" type="text" placeholder="Phone" />
            
            <button className="w-full mt-6 bg-blue-400 rounded-2xl py-3 hover:bg-primary-dull transition cursor-pointer uppercase">
              Save Address
            </button>
          </form>
        </div>
        <img
          className="md:mr-16 mb-16 md:mt-0"
          src={assets.add_address_iamge}
          alt="Add Address"
        />
      </div>
    </div>
  );
};

export default AddAddress;
