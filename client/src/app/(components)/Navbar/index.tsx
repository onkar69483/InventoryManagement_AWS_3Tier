"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import { Menu, Moon, Search, Settings, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  return (
    <div className={`flex justify-between items-center w-full py-3 px-4 mb-7 rounded-xl transition-all duration-300 ${isDarkMode ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white' : 'bg-gradient-to-r from-white to-blue-50 shadow-lg'}`}>
      {/* LEFT SIDE */}
      <div className="flex items-center">
        <div className="flex items-center gap-3">
          <button
            className={`p-2 rounded-lg transition-all duration-200 ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-blue-400' 
                : 'bg-white hover:bg-blue-100 text-blue-600 shadow-sm'
            }`}
            onClick={toggleSidebar}
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="hidden md:block">
            <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Dashboard<span className="text-blue-500">.</span>
            </h1>
          </div>
        </div>
      </div>

      {/* CENTER - SEARCH */}
      <div className="flex-1 flex justify-center px-4">
        <div className={`relative w-full max-w-md transition-all duration-300`}>
          <input
            type="search"
            placeholder="Search..."
            className={`pl-10 pr-4 py-2 w-full rounded-full transition-all duration-200 focus:outline-none focus:ring-2 ${
              isDarkMode 
                ? 'bg-gray-800 border-none text-white placeholder-gray-400 focus:ring-blue-500/30' 
                : 'bg-white border-none shadow-sm focus:ring-blue-500/20'
            }`}
          />

          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={18} />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-4">
        <button 
          onClick={toggleDarkMode}
          className={`p-2 rounded-full transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800 hover:bg-gray-700 text-amber-300' 
              : 'bg-white hover:bg-blue-100 text-blue-600 shadow-sm'
          }`}
        >
          {isDarkMode ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>
        
        <Link href="/settings">
          <button className={`p-2 rounded-full transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800 hover:bg-gray-700 text-blue-400' 
              : 'bg-white hover:bg-blue-100 text-blue-600 shadow-sm'
          }`}>
            <Settings size={20} />
          </button>
        </Link>
        
        <div className="hidden md:flex items-center gap-3 cursor-pointer group transition-all duration-200">
          <div className={`overflow-hidden rounded-full ring-2 ${
            isDarkMode 
              ? 'ring-blue-600/30 group-hover:ring-blue-500' 
              : 'ring-blue-100 group-hover:ring-blue-300'
          } transition-all duration-200`}>
            <Image
              src="https://cl4-inventorymanagement.s3.ap-south-1.amazonaws.com/profile.jpg"
              alt="Profile"
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
          </div>
          <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} group-hover:text-blue-600 transition-colors duration-200`}>
            Sachin
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;