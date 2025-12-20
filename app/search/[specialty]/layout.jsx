"use client";

import { useState } from "react";
import Sidebar from "../../../components/_components/Sidebar";
import { FiMenu, FiX } from "react-icons/fi";

export default function SearchLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen relative ">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      
      <main className="flex-1 p-6 w-full lg:ml-0">
        {/* Hamburger Menu Button - Mobile Only */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden    left-4 z-50 p-2 bg-lime-600 text-white rounded-lg shadow-lg hover:bg-lime-700 transition-all"
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? (
            <FiX className="w-6 h-6" />
          ) : (
            <FiMenu className="w-6 h-6" />
          )}
        </button>

        <div className="mt-12 lg:mt-0">
          {children}
        </div>
      </main>
    </div>
  );
}
