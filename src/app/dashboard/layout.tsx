"use client"

import { Sidebar } from "@/components/layout/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="relative min-h-screen">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-black">
        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="flex-1">
            <Sidebar />
          </div>
        </div>
      </div>
      <main className="md:pl-72">
        {children}
      </main>
    </div>
  )
}
