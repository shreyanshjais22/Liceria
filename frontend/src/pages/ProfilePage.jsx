import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import AddAddress from "./AddAddress";
import MyOrders from "./MyOrders"
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { user, axios, setUser } = useAppContext();
  const [showaddressForm, setShowAddressForm] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?._id) return;
      try {
        const addressRes = await axios.get(`/api/address/get/${user._id}`);
        if (addressRes.data.success) setAddresses(addressRes.data.addresses);

        const orderRes = await axios.get(`/api/order/user/${user._id}`);
        if (orderRes.data.success) setOrders(orderRes.data.orders);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user,addresses]);

  // Delete address
  const handleDeleteAddress = async (id) => {
    try {
      const res = await axios.delete(`/api/address/${id}`);
      if (res.data.success) {
        setAddresses(addresses.filter((addr) => addr._id !== id));
        toast.success("Address deleted successfully!");
      }
    } catch (err) {
      console.error("Error deleting address:", err);
      toast.error("Failed to delete address");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-200/40">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl font-medium text-gray-700">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-gray-800 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your personal information and preferences</p>
        </div>

        {/* User Info Card */}
        <div className="bg-white shadow-xl rounded-3xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-500">
          <div className="flex items-start gap-6">
            <div className="relative group">
              <img
                src={assets.profile_icon}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-3 border-gray-300 group-hover:border-blue-300 transition-all duration-300"
              />
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-gray-600">👤</span>
                Personal Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-100 rounded-xl p-4 hover:bg-gray-150 transition-colors">
                  <label className="text-sm font-medium text-gray-600 block mb-1">Full Name</label>
                  <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                </div>
                <div className="bg-gray-100 rounded-xl p-4 hover:bg-gray-150 transition-colors">
                  <label className="text-sm font-medium text-gray-600 block mb-1">Email Address</label>
                  <p className="text-lg font-semibold text-gray-800">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Addresses Section */}
        <div className="bg-white shadow-xl rounded-3xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-500">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="text-gray-600">📍</span>
              Saved Addresses
              <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
                {addresses.length}
              </span>
            </h2>
            <button
              onClick={() => setShowAddressForm(!showaddressForm)}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.02] ${
                showaddressForm
                  ? "bg-red-200 hover:bg-red-300 text-red-700 shadow-md"
                  : "bg-gradient-to-r from-blue-200 to-indigo-200 hover:from-blue-300 hover:to-indigo-300 text-blue-800 shadow-md"
              }`}
            >
              {showaddressForm ? "✕ Cancel" : "+ Add New Address"}
            </button>
          </div>

          {/* Address Form */}
          {showaddressForm && (
            <div className="mb-8 p-6 rounded-2xl">
              <AddAddress onSuccess={() => setShowAddressForm(false)} />
            </div>
          )}

          {/* Address List */}
          {addresses.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-gray-400">📍</span>
              </div>
              <p className="text-gray-600 text-lg font-medium">No addresses saved yet</p>
              <p className="text-gray-500 text-sm mt-1">Add your first address to get started</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {addresses.map((addr, index) => (
                <div
                  key={addr._id}
                  className="group bg-gradient-to-br from-gray-100 to-blue-100 border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-0.5"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {addr.firstName[0]}{addr.lastName[0]}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">
                          {addr.firstName} {addr.lastName}
                        </h3>
                        <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                          Address {index + 1}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteAddress(addr._id)}
                      className="opacity-0 group-hover:opacity-100 px-3 py-1.5 bg-red-200 text-red-700 rounded-xl hover:bg-red-300 transition-all duration-300 text-sm font-semibold"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                  
                  <div className="space-y-2 text-gray-700">
                    <p className="flex items-start gap-2">
                      <span className="text-gray-500 mt-1">🏠</span>
                      <span>{addr.street}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-gray-500">🌍</span>
                      <span>{addr.city}, {addr.state} - {addr.zipcode}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-gray-500">🏳️</span>
                      <span>{addr.country}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-gray-500">📱</span>
                      <span className="font-semibold">{addr.phone}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Orders Section */}
        <div className="bg-white shadow-xl rounded-3xl border border-gray-200 overflow-hidden">
            <MyOrders />
        </div>
      </div>
    </div>
  );
}