import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EduLinkApp() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Splash screen timer
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AnimatePresence>
        {/* Splash Screen */}
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-600 text-white"
          >
            <h1 className="text-5xl font-bold">EduLink</h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Screen */}
      {!showSplash && !isLoggedIn && (
        <motion.div
          key="login"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white p-8 rounded-2xl shadow-lg w-80"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Login
          </h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-3 p-2 border rounded-md"
          />
          <button
            onClick={() => setIsLoggedIn(true)}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </motion.div>
      )}

      {/* Home Screen */}
      {!showSplash && isLoggedIn && (
        <motion.div
          key="home"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            Welcome to EduLink 🎉
          </h1>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </motion.div>
      )}
    </div>
  );
}
