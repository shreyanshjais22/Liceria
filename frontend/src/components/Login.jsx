import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

function Login() {
  const { setIsLogin, setUser, axios, navigate } = useAppContext();
  const [state, setState] = useState("login");
  const [name, setName] = useState(""), [email, setEmail] = useState(""), [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false), [showPassword, setShowPassword] = useState(false), [isVisible, setIsVisible] = useState(false);

  useEffect(() => setIsVisible(true), []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/user/${state}`, { name, email, password });
      if (data.success) {
        setUser(data.user); setIsLogin(true); toast.success(data.message);
        navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" });
        location.reload();
      } else toast.error(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally { setIsLoading(false); }
  };

  const handleStateChange = (s) => { setState(s); setName(""); setEmail(""); setPassword(""); };

  return (
    <div onClick={() => setIsLogin(true)}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-blue-600/20 animate-pulse"></div>

      <form onClick={(e) => e.stopPropagation()} onSubmit={submitHandler}
        className={`relative flex flex-col gap-6 p-8 w-full max-w-md bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 transform transition-all duration-500 ${isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"}`}>

        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            {state === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-gray-500 text-sm">{state === "login" ? "Sign in to access your account" : "Join us for an amazing experience"}</p>
        </div>

        {/* Inputs */}
        <div className="space-y-5">
          {state === "register" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"> <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> </svg> Full Name </label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" required />
            </div>
            
            
          )}
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"> <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /> </svg> Email Address </label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" type="email" className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" required />
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Password
            </label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type={showPassword ? "text" : "password"} className="w-full px-4 py-3 pr-12 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 translate-y-1/2 text-gray-400 hover:text-gray-600">{showPassword ? "🙈" : "👁️"}</button>
          </div>
        </div>

        {/* Toggle */}
        <p className="text-gray-600 text-sm text-center">
          {state === "register" ? "Already have an account? " : "Don't have an account? "}
          <button type="button" onClick={() => handleStateChange(state === "register" ? "login" : "register")} className="font-semibold text-blue-600 hover:underline">{state === "register" ? "Sign In" : "Sign Up"}</button>
        </p>

        {/* Submit */}
        <button type="submit" disabled={isLoading}
          className={`w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg transition-all ${isLoading ? "opacity-80 cursor-not-allowed" : "hover:from-blue-700 hover:to-cyan-700"}`}>
          {isLoading ? "Processing..." : state === "register" ? "Create Account →" : "Sign In →"}
        </button>

        {state === "login" && <button type="button" className="text-sm text-gray-500 hover:text-blue-600">Forgot your password?</button>}

        {/* Close */}
        <button type="button" onClick={() => setIsLogin(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✖</button>
      </form>
    </div>
  );
}

export default Login;

