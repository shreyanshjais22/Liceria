import React, { useState } from "react";
import toast from "react-hot-toast";
import emailjs from '@emailjs/browser';

export default function NewsBox() {
  const [email, setEmail] = useState("");

  const serviceID = import.meta.env.VITE_SERVICE_ID;
  const templateID = import.meta.env.VITE_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_PUBLIC_ID;

  const handleSubscribe = () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    emailjs.send(serviceID, templateID, { user_email: email }, publicKey)
      .then(() => {
        toast.success("Thank you for subscribing!");
        setEmail(""); // clear input
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to subscribe. Try again later.");
      });
  };

  return (
    <div className="flex items-center border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500 rounded-full shadow-sm bg-white max-w-md w-full h-14 overflow-hidden">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 h-full px-4 bg-transparent text-gray-800 placeholder-gray-400 outline-none text-sm md:text-base"
        placeholder="Enter your email address"    
      />
      <button
        onClick={handleSubscribe}
        className="bg-orange-600 hover:bg-orange-700 active:scale-95 transition text-white font-medium rounded-full h-11 mr-2 px-6 md:px-8 flex items-center justify-center shadow-md"
      >
        Subscribe
      </button>
    </div>
  );
}
