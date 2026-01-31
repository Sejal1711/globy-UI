"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { API_BASE } from "@/lib/api"
import { CustomCursor } from "@/components/custom-cursor"
import { LenisProvider } from "@/components/lenis-provider"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setMessageType("")

    try {
      const res = await fetch(`${API_BASE}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok && data.access_token) {
        console.log("Token from server:", data.access_token)

        sessionStorage.setItem("token", data.access_token)

        // show immediately
        setMessage("Login successful. Redirecting…")
        setMessageType("success")

        // redirect after user sees it
        setTimeout(() => {
          router.push("/")
        }, 1000)
      } else {
        setMessage(data.detail || "Invalid credentials")
        setMessageType("error")
      }
    } catch {
      setMessage("Network error. Try again.")
      setMessageType("error")
    }
  }

  return (
    <LenisProvider>
      <CustomCursor />

      <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden px-6">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[500px] bg-gradient-to-tr from-purple-300 via-purple-200 to-lime-200 opacity-40 blur-3xl rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-md bg-background/80 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-lg"
        >
          <h1 className="text-4xl font-serif text-foreground mb-2">
            Welcome back
          </h1>
          <p className="text-muted-foreground mb-6">
            Sign in to continue to GLOBY
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-secondary rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-secondary rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <button
              type="submit"
              className="w-full mt-2 bg-foreground text-background py-3 rounded-lg font-medium hover:bg-foreground/90 transition"
              data-clickable
            >
              Login
            </button>
          </form>

          {message && (
            <p
              className={`mt-4 text-sm text-center ${
                messageType === "success"
                  ? "text-foreground"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <div className="mt-6 flex justify-between items-center text-sm">
            <Link
              href="/signup"
              className="text-muted-foreground hover:text-foreground transition"
            >
              Create an account
            </Link>

            <Link
              href="/forgot-password"
              className="text-muted-foreground hover:text-foreground transition"
            >
              Forgot password?
            </Link>
          </div>
        </motion.div>
      </div>
    </LenisProvider>
  )
}
