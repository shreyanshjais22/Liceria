import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();
  const [mode, setMode] = useState("login"); // login | register
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const endpoint = mode === "login" ? "/api/seller/login" : "/api/seller/register";
      const payload = mode === "login" ? { email, password } : { name, email, password };

      const { data } = await axios.post(endpoint, payload);

      if (data.success) {
        setIsSeller(true);
        toast.success(
          mode === "login" ? "Welcome back! Logging you in..." : "Account created successfully!"
        );
        setTimeout(() => {
          navigate("/seller");
        }, 1200);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller, navigate]);

  return (
    !isSeller && (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-2xl shadow-lg mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {mode === "login" ? "Seller Portal" : "Seller Registration"}
            </h1>
            <p className="text-gray-600">
              {mode === "login" ? "Welcome back! Please sign in" : "Create your seller account"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleOnSubmit} className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
            <div className="space-y-6">
              {mode === "register" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 bg-gray-50 focus:bg-white outline-none"
                    required
                  />
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 bg-gray-50 focus:bg-white outline-none"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 bg-gray-50 focus:bg-white outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold py-3 rounded-xl hover:from-orange-600 hover:to-yellow-500 transition disabled:opacity-50 shadow-lg"
              >
                {loading ? "Processing..." : mode === "login" ? "Sign In" : "Register"}
              </button>
            </div>

            {/* Switch mode */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {mode === "login" ? "New to our platform?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setMode(mode === "login" ? "register" : "login")}
                  className="text-orange-500 hover:text-orange-700 font-medium"
                >
                  {mode === "login" ? "Create an account" : "Login here"}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default SellerLogin;
