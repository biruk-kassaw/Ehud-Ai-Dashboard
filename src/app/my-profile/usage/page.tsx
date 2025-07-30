"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function UsagePage() {
  return (
    <div className="space-y-6">
      {/* Credit stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Credits Remaining */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-sm text-gray-500 mb-1">Credits Remaining</h2>
          <p className="text-3xl font-semibold">1590</p>
        </div>
        
        {/* This Month */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-sm text-gray-500 mb-1">This Month</h2>
          <p className="text-3xl font-semibold">342</p>
        </div>
      </div>
      
      {/* Credit Usage */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-medium mb-1">Credit Usage</h2>
        <p className="text-sm text-gray-500 mb-6">Monitor your monthly credit consumption</p>
        
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Credits Used This Month</span>
            <span className="text-sm font-medium">3420 / 5000</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div className="bg-black h-2.5 rounded-full" style={{ width: '68%' }}></div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h3 className="text-sm text-gray-500 mb-1">Collections</h3>
            <p className="text-2xl font-semibold">1590</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500 mb-1">Favorites</h3>
            <p className="text-2xl font-semibold">1590</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500 mb-1">Models Used</h3>
            <p className="text-2xl font-semibold">1590</p>
          </div>
        </div>
      </div>
      
      {/* Buy More Credits Button */}
      <div>
        <Button className="bg-black text-white hover:bg-gray-800 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Buy More Credits
        </Button>
      </div>
    </div>
  );
}
