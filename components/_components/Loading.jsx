"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-95 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="text-center">
        {/* Spinner Animation */}
        <div className="inline-block relative w-20 h-20 mb-6">
          {/* Outer spinning ring */}
          <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-300 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-lime-600 border-t-transparent rounded-full animate-spin"></div>
          
          {/* Inner spinning ring */}
          <div className="absolute top-3 left-3 w-14 h-14 border-4 border-gray-200 rounded-full"></div>
          <div 
            className="absolute top-3 left-3 w-14 h-14 border-4 border-lime-400 border-b-transparent rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
          ></div>
          
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-lime-600 rounded-full"></div>
        </div>
        {/* Loading Text */}
        <p className="text-gray-600 text-lg font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
