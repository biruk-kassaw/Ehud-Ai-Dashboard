"use client";


import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Image from "next/image";

export default function BillingPage() {
  // State will be used for invoice selection functionality in the future
  
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
      
      {/* Subscription Info */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-medium mb-1">Credit Usage</h2>
        <p className="text-sm text-gray-500 mb-6">Monitor your monthly credit consumption</p>
        
        {/* Current Plan */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
            <div>
              <h3 className="text-base font-medium">Pro Plan</h3>
              <p className="text-sm text-gray-500">5,000 credits/month • Renews Feb 15, 2024</p>
            </div>
            <span className="px-3 py-1 bg-black text-white text-xs rounded-full">Active</span>
          </div>
        </div>
        
        {/* Payment Method */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-4">Payment amount</h3>
          <div className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-gray-500" />
              <span className="text-sm">•••• •••• •••• 4242</span>
              <span className="text-xs text-gray-500">Expires 12/26</span>
            </div>
            <Button variant="outline" size="sm" className="bg-black text-white hover:bg-gray-800 rounded-md px-4 py-1 text-xs">
              Update
            </Button>
          </div>
        </div>
        
        {/* Change Plan Button */}
        <Button variant="outline" className="border-2 border-black text-black hover:bg-gray-100 rounded-md px-4 py-2 flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border-2 border-black"></div>
          Change Plan
        </Button>
      </div>
      
      {/* Billing History */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-medium mb-1">Billing History</h2>
            <p className="text-sm text-gray-500">View and download your past invoices</p>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image 
              src="/images/avatar.jpg" 
              alt="Avatar"
              width={40}
              height={40}
              className="object-cover"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/40';
              }}
            />
          </div>
        </div>
        
        {/* Invoices Table */}
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="p-4 text-left w-6">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="p-4 text-left">Invoice</th>
                <th className="p-4 text-left">Date <span className="text-xs">↓</span></th>
                <th className="p-4 text-left">Amount <span className="text-xs">↓</span></th>
                <th className="p-4 text-left">Status <span className="text-xs">↓</span></th>
                <th className="p-4 text-left">Actions <span className="text-xs">↓</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="p-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="p-4">INV-001</td>
                <td className="p-4">2024-01-15</td>
                <td className="p-4">$49.99</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-gray-800 text-white text-xs rounded-full">Paid</span>
                </td>
                <td className="p-4">
                  <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                    <span className="text-lg">+</span> View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="p-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="p-4">TASK-7878</td>
                <td className="p-4">2024-01-15</td>
                <td className="p-4">$49.99</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-gray-800 text-white text-xs rounded-full">Paid</span>
                </td>
                <td className="p-4">
                  <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                    <span className="text-lg">+</span> View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="p-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="p-4">TASK-7839</td>
                <td className="p-4">2024-01-15</td>
                <td className="p-4">$49.99</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-gray-800 text-white text-xs rounded-full">Paid</span>
                </td>
                <td className="p-4">
                  <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                    <span className="text-lg">+</span> View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm">
          <span className="text-gray-500">1 of 100 row(s) selected.</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Rows per page</span>
              <select className="border border-gray-200 rounded p-1">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
            <div className="text-gray-500">
              Page 1 of 10
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
