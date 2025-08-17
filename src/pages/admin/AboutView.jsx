import React from "react";
import { motion } from "framer-motion";

function AboutView() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-10">
      
      {/* Animated heading */}
      <motion.h1
        className="text-4xl font-bold text-blue-600 mb-6"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        About Us
      </motion.h1>

      {/* Animated card */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-8 max-w-lg text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        <p className="text-gray-700 text-lg leading-relaxed">
          Welcome to our Smart Society Management System project! 🚀  
          Our goal is to make society management easier with features like complaint categorization, visitor verification, utility monitoring, QR guest entry, and more.  
        </p>
        <motion.button
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </motion.button>
      </motion.div>
    </div>
  );
}

export default AboutView;
