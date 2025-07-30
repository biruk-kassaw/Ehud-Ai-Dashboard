"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  // Sample user data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    username: 'johndoe_art',
    isPro: true,
    creditsRemaining: 1580,
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    profession: 'Digital Artist',
    country: 'United States',
    bio: 'Digital artist passionate about AI-generated art and creative technology.',
    stats: {
      imagesCreated: 1247,
      favorites: 156,
      collections: 23,
      memberSince: 'Jan 2024'
    },
    recentActivity: [
      { type: 'generated', item: 'Cyberpunk cityscape', time: '2 hours ago' },
      { type: 'created', item: 'new collection "Landscapes"', time: '5 hours ago' },
      { type: 'added', item: 'image to favorites', time: '1 day ago' },
      { type: 'generated', item: 'Abstract portrait', time: '2 days ago' },
    ]
  });

  return (
    <div className="space-y-8">
      {/* Header with user info */}
      

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile information */}
        <div className="lg:col-span-2 border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-medium mb-2">Profile Information</h2>
          <p className="text-sm text-gray-500 mb-6">Update your personal information and creative profile</p>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100">
              <Image 
                src="/images/avatar.jpg" 
                alt="Profile picture"
                width={80}
                height={80}
                className="object-cover"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/80';
                }}
              />
            </div>
            <div>
              <Button variant="outline" size="sm" className="mb-1">Change Photo</Button>
              <p className="text-xs text-gray-500">JPG, PNG or GIF. Max 2MB.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-200" 
                value={userData.firstName}
                onChange={(e) => setUserData({...userData, firstName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-200" 
                value={userData.lastName}
                onChange={(e) => setUserData({...userData, lastName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input 
                type="email" 
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-200" 
                value={userData.email}
                onChange={(e) => setUserData({...userData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-200" 
                value={userData.username}
                onChange={(e) => setUserData({...userData, username: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Profession</label>
              <div className="relative">
                <select className="w-full border border-gray-300 rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-200">
                  <option>Digital Artist</option>
                  <option>Photographer</option>
                  <option>Illustrator</option>
                  <option>Designer</option>
                  <option>Other</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Country</label>
              <div className="relative">
                <select className="w-full border border-gray-300 rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-200">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Australia</option>
                  <option>Germany</option>
                  <option>France</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea 
              className="w-full border border-gray-300 rounded-md py-2 px-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-gray-200"
              value={userData.bio}
              onChange={(e) => setUserData({...userData, bio: e.target.value})}
            />
          </div>

          <div className="mt-6">
            <Button className="bg-black text-white hover:bg-gray-800">Save Changes</Button>
          </div>
        </div>

        {/* Quick stats */}
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M9 8L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M9 12L15 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M9 16L13 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span className="text-sm">Images Created</span>
                </div>
                <span className="font-medium">{userData.stats.imagesCreated}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm">Favorites</span>
                </div>
                <span className="font-medium">{userData.stats.favorites}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" fill="currentColor"/>
                    <path d="M14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z" fill="currentColor"/>
                  </svg>
                  <span className="text-sm">Collections</span>
                </div>
                <span className="font-medium">{userData.stats.collections}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                    <path d="M12.5 7H11V13L16.2 16.2L17 14.9L12.5 12.2V7Z" fill="currentColor"/>
                  </svg>
                  <span className="text-sm">Member Since</span>
                </div>
                <span className="font-medium">{userData.stats.memberSince}</span>
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {userData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-black mt-2"></div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">{activity.type}</span> {activity.item}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
