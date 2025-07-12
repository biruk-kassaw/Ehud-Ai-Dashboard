"use client"

import { useAuth } from "@/context/auth-context"

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="p-6 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Welcome back, {user?.firstName || 'User'}!
          </h1>
          <p className="text-gray-500">
            Here&apos;s an overview of your account and available credits.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-medium text-gray-900">Total Credits</h3>
            <p className="mt-2 text-2xl font-semibold">{user?.totalCredits || 0}</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-medium text-gray-900">Used Credits</h3>
            <p className="mt-2 text-2xl font-semibold">{user?.usedCredits || 0}</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-medium text-gray-900">Remaining Credits</h3>
            <p className="mt-2 text-2xl font-semibold">{user?.remainingCredits || 0}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
