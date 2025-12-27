"use client";

import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { Button } from "./button"
import { useRouter, usePathname } from 'next/navigation'
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import { FiMenu, FiX } from "react-icons/fi";
import LoginDialog from "./LoginDialog";
import { categories } from "@/data/categories";


function Header  () {
  const {user} = useKindeBrowserClient()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          !event.target.closest('[data-mobile-menu-button]')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMenuOpen || isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, isMobileMenuOpen]);






  const router = useRouter();
  const pathname = usePathname();

  const handleGetStarted = () => {
    setIsLoginDialogOpen(true);
  };
const Menu =[
    {
        id:1,
        name:"Home",
        path:"/"
    },
    {
        id:2,
        name:"Explore",
        path:"/explore"
    },
    {
        id:3,
        name:"Contact us",
        path:"/contact"
    }
]



  const handleMenuClick = (path) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className='flex items-center mb-10 justify-between p-3 shadow-sm relative'>
    <div className='flex items-center gap-10' >
        {/* Hamburger Menu Button - Mobile Only */}
        <button
          data-mobile-menu-button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:text-lime-600 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <FiX className="w-6 h-6" />
          ) : (
            <FiMenu className="w-6 h-6" />
          )}
        </button>

        <div 
          onClick={() => router.push('/')}
          className="cursor-pointer hover:opacity-80 transition-opacity"
        >
          <Image
            src="/assets/img/logo.png"
            alt="Appointment App Logo"
            width={100}
            height={100}
          />
        </div>

      <ul className='md:flex gap-8 hidden'>
        {Menu.map((item, index) => (
  <li
    key={index}
    onClick={() => router.push(item.path)}
    className={`hover:text-lime-600 cursor-pointer hover:scale-105 transition-all ${
      pathname === item.path ? 'text-lime-600 font-semibold' : ''
    }`}
  >
    {item.name}
  </li>
))}

      </ul>
    </div>

    {/* Mobile Menu */}
    {isMobileMenuOpen && (
      <>
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Mobile Menu Sidebar */}
        <div 
          ref={mobileMenuRef}
          className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-gray-800">Menu</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-700 hover:text-lime-600"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            
            <ul className="space-y-2">
              {Menu.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleMenuClick(item.path)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                      pathname === item.path
                        ? "bg-lime-600 text-white shadow-md font-medium"
                        : "bg-white hover:bg-lime-100 text-gray-700 border border-lime-200"
                    }`}
                  >
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    )}
    {user ? (
      <div className="relative" ref={menuRef}>
        {/* User Avatar */}
        <button
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-lime-600 hover:border-lime-700 transition-all cursor-pointer bg-pink-500"
>
  <span className="text-white font-bold text-lg uppercase">
    {(user?.given_name?.charAt(0) ||
      user?.family_name?.charAt(0) ||
      user?.email?.charAt(0) ||
      "U")}
  </span>
</button>




        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 py-4 z-[100] max-h-[600px] overflow-y-auto custom-scrollbar">
            {/* My Profile Section */}
            <div className="px-4 pb-4 border-b border-gray-200 mb-3">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">My Profile</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 bg-lime-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-lime-600 flex items-center justify-center text-white font-bold">
                    {(user?.given_name?.charAt(0) ||
                      user?.family_name?.charAt(0) ||
                      user?.email?.charAt(0) ||
                      "U")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {user?.given_name && user?.family_name 
                        ? `${user.given_name} ${user.family_name}`
                        : user?.given_name || user?.family_name || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                </div>
                {user?.given_name && (
                  <p className="text-xs text-gray-600 px-2">
                    <span className="font-semibold">First Name:</span> {user.given_name}
                  </p>
                )}
                {user?.family_name && (
                  <p className="text-xs text-gray-600 px-2">
                    <span className="font-semibold">Last Name:</span> {user.family_name}
                  </p>
                )}
              </div>
            </div>

           

            {/* Menu Items */}
            <div className="px-4 ">
             
              <button
                onClick={() => {
                  router.push('/my-booking');
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-4  rounded-lg transition-colors mb-2 ${
                  pathname === '/my-booking' 
                    ? 'bg-lime-400 text-white font-medium' 
                    : 'hover:bg-lime-400 text-gray-700'
                }`}
              >
                My Booking
              </button>
            </div>

            {/* Logout */}
            <div className="border-t border-gray-200 mt-3 pt-3 px-4">
              <LogoutLink className="block w-full text-left px-4 py-2.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors font-medium">
                Logout
              </LogoutLink>
            </div>
          </div>
        )}
      </div>
    ) : (
      <Button onClick={handleGetStarted} className="bg-gradient-to-r from-lime-600 to-lime-700 hover:from-lime-700 hover:to-lime-800 text-white">
        Get Started
      </Button>
    )}

    {/* Login Dialog */}
    <LoginDialog isOpen={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen} />

    </div>
  )
}

export default Header

