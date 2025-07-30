"use client";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* General Preferences */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-medium mb-1">General Preferences</h2>
          <p className="text-sm text-gray-500 mb-6">Customize your app experience</p>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Dark Mode</h3>
                <p className="text-xs text-gray-500">Switch between light and dark themes</p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Email Notifications</h3>
                <p className="text-xs text-gray-500">Receive updates about your account</p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Push Notifications</h3>
                <p className="text-xs text-gray-500">Get notified on your devices</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
        
        {/* Danger Zone */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-medium mb-1">Danger Zone</h2>
          <p className="text-sm text-gray-500 mb-6">Irreversible actions for your account</p>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-1">Delete Account</h3>
              <p className="text-xs text-gray-500 mb-3">Permanently delete your account and all associated data</p>
              
              <Button variant="destructive" className="bg-red-500 hover:bg-red-600 text-white">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
