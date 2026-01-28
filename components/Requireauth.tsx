"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface RequireAuthProps {
  children: React.ReactNode
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter()

  useEffect(() => {
    const token = sessionStorage.getItem("token")
    if (!token) {
      router.push("/login") // redirect to login
    }
  }, [router])

  // Optionally, render nothing until the check is done
  const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : null
  if (!token) return null

  return <>{children}</>
}
