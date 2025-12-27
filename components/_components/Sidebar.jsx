"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { categories } from "@/data/categories";

export default function Sidebar({ isOpen, onClose }) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Extract current specialty from pathname
  const currentSpecialty = pathname?.split("/").pop() || "";

  const handleCategoryClick = (catName) => {
    router.push(`/search/${encodeURIComponent(catName)}`);
    // Close sidebar on mobile after clicking
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 p-6 border-r border-lime-200 min-h-screen
        bg-white/1
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <h2 className="text-xl font-bold text-gray-800 mb-6">Specialties</h2>

        <ul className="space-y-2">
          {categories.map((cat) => {
            const isActive = decodeURIComponent(currentSpecialty) === cat.name;
            return (
              <li key={cat.id}>
                <button
                  onClick={() => handleCategoryClick(cat.name)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                    isActive
                      ? "bg-lime-600 text-white shadow-md"
                      : "bg-white hover:bg-lime-100 text-gray-700 border border-lime-200"
                  }`}
                >
                  {cat.icon && (
                    <img 
                      src={cat.icon} 
                      alt={cat.name}
                      className="w-5 h-5 object-contain"
                    />
                  )}
                  <span className="font-medium">{cat.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}
