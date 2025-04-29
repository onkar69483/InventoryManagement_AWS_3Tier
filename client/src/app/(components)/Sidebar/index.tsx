"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Package,
  PieChart,
  Settings,
  UserCircle,
  DollarSign,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
  isDarkMode: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
  isDarkMode,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center relative transition-all duration-300 group ${
          isCollapsed ? "justify-center py-4" : "px-5 py-3.5"
        } mx-3 my-1 rounded-xl`}
        style={{
          background: isActive
            ? "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)"
            : "transparent",
          boxShadow: isActive
            ? "0 8px 16px -4px rgba(79, 70, 229, 0.2)"
            : "none",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`rounded-lg p-2.5 transition-all duration-200 ${
            isActive
              ? "bg-white/20"
              : isDarkMode
              ? isHovered
                ? "bg-gray-800"
                : "bg-gray-900/40"
              : isHovered
              ? "bg-blue-50"
              : "bg-gray-100/50"
          }`}
        >
          <Icon
            className={`w-5 h-5 transition-colors duration-200 ${
              isActive
                ? "text-white"
                : isHovered
                ? isDarkMode
                  ? "text-blue-400"
                  : "text-blue-600"
                : isDarkMode
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          />
        </div>
        <span
          className={`${
            isCollapsed ? "hidden" : "block ml-3"
          } font-medium transition-all duration-300 ${
            isActive
              ? "text-white"
              : isHovered
              ? isDarkMode
                ? "text-gray-200"
                : "text-blue-600"
              : isDarkMode
              ? "text-gray-300"
              : "text-gray-700"
          }`}
        >
          {label}
        </span>
        {isActive && (
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1.5 h-8 bg-white rounded-l-full"></div>
        )}
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col transition-all duration-300 overflow-hidden h-full z-40 ${
    isSidebarCollapsed ? "w-24" : "w-72"
  } ${isDarkMode ? "bg-gray-900 border-r border-gray-800 shadow-gray-900/40" : "bg-white border-r border-gray-100/80 shadow-blue-900/5"} shadow-2xl`;

  return (
    <div className={sidebarClassNames}>
      {/* Logo Header */}
      <div
        className={`flex items-center pt-8 pb-8 ${
          isSidebarCollapsed ? "px-5 justify-center" : "px-6 justify-between"
        } border-b ${isDarkMode ? "border-gray-800" : "border-gray-100"}`}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-600 rounded-xl blur-md opacity-30"></div>
            <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg">
              <Image
                src="https://cl4-inventorymanagement.s3.ap-south-1.amazonaws.com/logo.png"
                alt="logo"
                width={24}
                height={24}
                className="rounded"
              />
            </div>
          </div>
          {!isSidebarCollapsed && (
            <h1 className="font-bold text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              InvenTrack
            </h1>
          )}
        </div>

        {!isSidebarCollapsed && (
          <button
            onClick={toggleSidebar}
            className={`items-center justify-center p-2 rounded-lg ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700 text-gray-400"
                : "bg-gray-100 hover:bg-blue-100 text-gray-500 hover:text-blue-600"
            } transition-all duration-200`}
          >
            <ChevronLeft size={18} />
          </button>
        )}
      </div>

      {/* Category Label */}
      {!isSidebarCollapsed && (
        <div className="px-7 mt-6 mb-2">
          <p
            className={`text-xs font-semibold uppercase tracking-wider ${
              isDarkMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Main Menu
          </p>
        </div>
      )}

      {/* Links */}
      <div className="flex-grow flex flex-col gap-1 px-2 mt-2">
        <SidebarLink
          href="/dashboard"
          icon={PieChart}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
          isDarkMode={isDarkMode}
        />
        <SidebarLink
          href="/inventory"
          icon={Package}
          label="Inventory"
          isCollapsed={isSidebarCollapsed}
          isDarkMode={isDarkMode}
        />
        <SidebarLink
          href="/products"
          icon={ClipboardList}
          label="Products"
          isCollapsed={isSidebarCollapsed}
          isDarkMode={isDarkMode}
        />
        {!isSidebarCollapsed && (
          <div className="px-5 mt-6 mb-2">
            <p
              className={`text-xs font-semibold uppercase tracking-wider ${
                isDarkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Management
            </p>
          </div>
        )}
        <SidebarLink
          href="/users"
          icon={UserCircle}
          label="Users"
          isCollapsed={isSidebarCollapsed}
          isDarkMode={isDarkMode}
        />
        <SidebarLink
          href="/expenses"
          icon={DollarSign}
          label="Expenses"
          isCollapsed={isSidebarCollapsed}
          isDarkMode={isDarkMode}
        />
        <SidebarLink
          href="/settings"
          icon={Settings}
          label="Settings"
          isCollapsed={isSidebarCollapsed}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Footer */}
      <div
        className={`mt-auto ${isSidebarCollapsed ? "px-0 py-8" : "px-6 py-6"}`}
      >
        <div
          className={`h-px w-full mb-6 ${
            isDarkMode ? "bg-gray-800" : "bg-gray-100"
          }`}
        ></div>

        <button
          onClick={toggleSidebar}
          className={`hidden md:flex mx-auto items-center justify-center p-2 rounded-lg transition-all duration-200 ${
            isDarkMode
              ? "bg-gray-800 hover:bg-gray-700"
              : "bg-gray-100 hover:bg-blue-100"
          } ${isSidebarCollapsed ? "w-12 h-12" : "w-full"}`}
        >
          {isSidebarCollapsed ? (
            <ChevronRight
              size={18}
              className={isDarkMode ? "text-gray-400" : "text-gray-500"}
            />
          ) : (
            <div className="flex items-center gap-2 text-gray-500">
              <ChevronLeft size={18} />
              <span
                className={`${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                } font-medium`}
              >
                Collapse
              </span>
            </div>
          )}
        </button>

        <p
          className={`text-center text-xs mt-4 ${
            isDarkMode ? "text-gray-500" : "text-gray-400"
          }`}
        >
          {isSidebarCollapsed ? "©25" : "© 2025 InvenTrack"}
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
