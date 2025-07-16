'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  MessageSquare,
  ImageIcon,
  Video,
  FolderOpen,
  Edit2
} from 'lucide-react';

const routes = [
  {
    label: 'Explore',
    icon: FolderOpen,
    href: '/dashboard',
  },
  {
    label: 'Chat',
    icon: MessageSquare,
    href: '/dashboard/chat',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    href: '/dashboard/image',
  },
  {
    label: 'Edit Image',
    icon: Edit2,
    href: '/dashboard/edit-image',
  },
  {
    label: 'Video Generation',
    icon: Video,
    href: '/dashboard/video',
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-white text-black border-r border-black/10">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold">
            EHUD AI
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-black hover:bg-black/10 transition",
                pathname === route.href ? "text-black bg-black/10" : "text-gray-400",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className="h-5 w-5 mr-3 text-black" />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
