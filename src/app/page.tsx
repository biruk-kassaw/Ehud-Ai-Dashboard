"use client"

import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const { isLoggedIn, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // if (!loading) {
    //   if (isLoggedIn) {
    //     router.push("/dashboard")
    //   } else {
    //     router.push("/login")
    //   }
    // }
    router.push("/home")
  }, [isLoggedIn, loading, router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
    </div>
  )
}
