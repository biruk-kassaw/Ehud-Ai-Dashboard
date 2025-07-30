"use client";

import { ReactNode } from 'react';
import { User, Settings, FileText, CreditCard, ShieldAlert, Sliders } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem = ({ icon, label, href, active = false }: SidebarItemProps) => {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${active ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
    >
      <div className="text-gray-500">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-8">
        <div className="flex items-center gap-4 mb-8">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image 
                    src="/images/avatar.jpg" 
                    alt="Profile picture"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">John Doe</h1>
                  <p className="text-sm text-gray-500">@johndoe • Pro Member</p>
                  <span className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-gray-70">{23223} credits</span>

                </div>
              </div>
        <div className="flex gap-8">
          {/* Left sidebar */}
          <div className="w-64 shrink-0">
            <div className="flex flex-col gap-1">
              <SidebarItem 
                icon={<User size={20} />} 
                label="Account Information" 
                href="/my-profile"
                active={pathname === "/my-profile"}
              />
              <SidebarItem 
                icon={<Settings size={20} />} 
                label="AI Generation Settings" 
                href="/my-profile/ai-settings"
                active={pathname === "/my-profile/ai-settings"}
              />
              <SidebarItem 
                icon={<CreditCard size={20} />} 
                label="Usage & Credits" 
                href="/my-profile/usage"
                active={pathname === "/my-profile/usage"}
              />
              <SidebarItem 
                icon={<FileText size={20} />} 
                label="Billing & Plans" 
                href="/my-profile/billing"
                active={pathname === "/my-profile/billing"}
              />
              <SidebarItem 
                icon={<ShieldAlert size={20} />} 
                label="Security Settings" 
                href="/my-profile/security"
                active={pathname === "/my-profile/security"}
              />
              <SidebarItem 
                icon={<Sliders size={20} />} 
                label="General Settings" 
                href="/my-profile/setting"
                active={pathname === "/my-profile/setting"}
              />
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
