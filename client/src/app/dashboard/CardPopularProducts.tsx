import { useGetDashboardMetricsQuery } from "@/state/api";
import { ShoppingBag, Search, ArrowUpRight, Award, Bookmark, Star } from "lucide-react";
import React, { useState } from "react";
import Rating from "../(components)/Rating";
import Image from "next/image";

const CardPopularProducts = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter products based on search term
  const filteredProducts = dashboardMetrics?.popularProducts
    ? dashboardMetrics.popularProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-lg rounded-2xl flex flex-col border border-gray-100">
      {isLoading ? (
        <div className="flex items-center justify-center h-64 p-5">
          <div className="animate-pulse flex space-x-4 w-full">
            <div className="rounded-lg bg-gray-200 h-12 w-12"></div>
            <div className="flex-1 space-y-3 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Header with search */}
          <div className="px-6 pt-5 pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Award className="w-5 h-5 text-amber-500 mr-2" />
                <h3 className="text-lg font-bold text-gray-800">Popular Products</h3>
              </div>
              <span className="bg-amber-100 text-amber-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Top {filteredProducts.length}
              </span>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <hr className="border-gray-100" />
          
          {/* Products list */}
          <div className="overflow-auto flex-grow scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center h-64">
                <ShoppingBag className="w-12 h-12 text-gray-300 mb-2" />
                <p className="text-gray-500">No products found matching your search</p>
                {searchTerm && (
                  <button 
                    className="mt-4 text-sm text-blue-500 hover:underline"
                    onClick={() => setSearchTerm("")}
                  >
                    Clear search
                  </button>
                )}
              </div>
            ) : (
              filteredProducts.map((product, index) => (
                <div
                  key={product.productId}
                  className={`flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors ${
                    index !== filteredProducts.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Image
                        src={`https://cl4-inventorymanagement.s3.ap-south-1.amazonaws.com/product${
                          Math.floor(Math.random() * 3) + 1
                        }.png`}
                        alt={product.name}
                        width={52}
                        height={52}
                        className="rounded-lg object-cover"
                      />
                      {index < 3 && (
                        <div className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col">
                      <div className="font-medium text-gray-800 mb-1 flex items-center">
                        {product.name}
                        {product.rating && product.rating > 4 && (
                          <span className="ml-2 flex items-center bg-green-100 text-green-700 text-xs px-1.5 py-0.5 rounded">
                            <Star className="w-3 h-3 mr-0.5 fill-current" />
                            Best
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center">
                        <span className="font-bold text-blue-600 mr-3">
                          ${product.price.toFixed(2)}
                        </span>
                        <Rating rating={product.rating || 0} />
                        <span className="text-xs text-gray-500 ml-1">
                          ({product.rating ? product.rating.toFixed(1) : '0.0'})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="text-sm text-gray-600 mr-4">
                      <span className="font-medium">{(product.stockQuantity / 1000).toFixed(1)}k</span> sold
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors" title="Add to cart">
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors" title="Save for later">
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors" title="View details">
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center rounded-b-2xl">
            <button className="text-blue-600 font-medium text-sm hover:text-blue-700 flex items-center justify-center w-full">
              View All Products
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopularProducts;