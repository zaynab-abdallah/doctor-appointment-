"use client";

import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { Button } from "./button"
import { useRouter, usePathname } from 'next/navigation'
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import { FiMenu, FiX } from "react-icons/fi";


function Header  () {
  const {user} = useKindeBrowserClient()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    router.push('/login');
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
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-[100]">
            <button
              onClick={() => {
                router.push('/profile');
                setIsMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 transition-colors font-medium ${
                pathname === '/profile' 
                  ? 'bg-lime-100 text-gray-900' 
                  : 'hover:bg-lime-100 text-gray-700'
              }`}
            >
              My Profile
            </button>
            <button
              onClick={() => {
                router.push('/my-booking');
                setIsMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 transition-colors ${
                pathname === '/my-booking' 
                  ? 'bg-lime-100 text-gray-900 font-medium' 
                  : 'hover:bg-lime-100 text-gray-700'
              }`}
            >
              My Booking
            </button>
            <div className="border-t border-gray-200 my-1"></div>
            <LogoutLink className="block w-full text-left px-4 py-3 hover:bg-lime-100 text-gray-700 transition-colors">
              Logout
            </LogoutLink>
          </div>
        )}
      </div>
    ) : (
      <LoginLink><Button onClick={handleGetStarted}>Get Started</Button></LoginLink>
    )}

    


    </div>
  )
}

export default Header

