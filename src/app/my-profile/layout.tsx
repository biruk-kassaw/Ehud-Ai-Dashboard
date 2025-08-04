"use client";

import { ReactNode, useState } from 'react';
import {
  User,
  Settings,
  FileText,
  CreditCard,
  ShieldAlert,
  Sliders,
  Menu,
  X,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ icon, label, href, active = false, onClick }: SidebarItemProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
        active ? 'bg-gray-100' : 'hover:bg-gray-50'
      }`}
    >
      <div className="text-gray-500">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-6 px-4">
        {/* Header Profile Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
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
              <span className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-gray-70">
                23223 credits
              </span>
            </div>
          </div>
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 border rounded-md text-gray-700 cursor-pointer"
            onClick={toggleMenu}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar for Desktop */}
          <div className="hidden lg:block w-64 shrink-0">
            <div className="flex flex-col gap-1">
              <SidebarItem icon={<User size={20} />} label="Account Information" href="/my-profile" active={pathname === "/my-profile"} />
              <SidebarItem icon={<Settings size={20} />} label="AI Generation Settings" href="/my-profile/ai-settings" active={pathname === "/my-profile/ai-settings"} />
              <SidebarItem icon={<CreditCard size={20} />} label="Usage & Credits" href="/my-profile/usage" active={pathname === "/my-profile/usage"} />
              <SidebarItem icon={<FileText size={20} />} label="Billing & Plans" href="/my-profile/billing" active={pathname === "/my-profile/billing"} />
              <SidebarItem icon={<ShieldAlert size={20} />} label="Security Settings" href="/my-profile/security" active={pathname === "/my-profile/security"} />
              <SidebarItem icon={<Sliders size={20} />} label="General Settings" href="/my-profile/setting" active={pathname === "/my-profile/setting"} />
            </div>
          </div>

          {/* Sidebar for Mobile */}
          {menuOpen && (
            <div className="lg:hidden w-full bg-gray-50 border rounded-md p-4 shadow-lg">
              <div className="flex flex-col gap-1">
                <SidebarItem icon={<User size={20} />} label="Account Information" href="/my-profile" active={pathname === "/my-profile"} onClick={closeMenu} />
                <SidebarItem icon={<Settings size={20} />} label="AI Generation Settings" href="/my-profile/ai-settings" active={pathname === "/my-profile/ai-settings"} onClick={closeMenu} />
                <SidebarItem icon={<CreditCard size={20} />} label="Usage & Credits" href="/my-profile/usage" active={pathname === "/my-profile/usage"} onClick={closeMenu} />
                <SidebarItem icon={<FileText size={20} />} label="Billing & Plans" href="/my-profile/billing" active={pathname === "/my-profile/billing"} onClick={closeMenu} />
                <SidebarItem icon={<ShieldAlert size={20} />} label="Security Settings" href="/my-profile/security" active={pathname === "/my-profile/security"} onClick={closeMenu} />
                <SidebarItem icon={<Sliders size={20} />} label="General Settings" href="/my-profile/setting" active={pathname === "/my-profile/setting"} onClick={closeMenu} />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
