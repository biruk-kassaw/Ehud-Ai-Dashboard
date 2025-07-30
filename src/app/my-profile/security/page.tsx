"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Password & Authentication */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-medium mb-1">Password & Authentication</h2>
          <p className="text-sm text-gray-500 mb-6">Manage your account security settings</p>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Change Password</h3>
                <p className="text-xs text-gray-500">Last updated 3 months ago</p>
              </div>
              <Button variant="outline" size="sm" className="h-8 px-3 text-xs">
                Change
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Two factor authentication</h3>
                <p className="text-xs text-gray-500">Add an extra layer of security</p>
              </div>
              <Switch />
            </div>
            
            <Button className="w-full bg-black text-white hover:bg-gray-800">
              Save Security Settings
            </Button>
          </div>
        </div>
        
        {/* Connected Devices */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-medium mb-1">Connected Devices</h2>
          <p className="text-sm text-gray-500 mb-6">Manage devices that have access to your account</p>
          
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">MacBook Pro</h3>
                  <p className="text-xs text-gray-500">San Francisco, CA • 2 minutes ago</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">Current</span>
                </div>
              </div>
            </div>
            
            <div className="border-b border-gray-100 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">MacBook Pro</h3>
                  <p className="text-xs text-gray-500">San Francisco, CA • 2 minutes ago</p>
                </div>
                <Button variant="outline" size="sm" className="h-7 px-3 text-xs">
                  Revoke
                </Button>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">MacBook Pro</h3>
                  <p className="text-xs text-gray-500">San Francisco, CA • 2 minutes ago</p>
                </div>
                <Button variant="outline" size="sm" className="h-7 px-3 text-xs">
                  Revoke
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
