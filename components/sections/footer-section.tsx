"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function FooterSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = sessionStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem("token")
    setIsLoggedIn(false)
    router.push("/")
  }

  return (
    <footer className="relative bg-background px-6 py-24 overflow-hidden">
      {/* Original Gradient Blob */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-300 via-purple-200 to-lime-200 opacity-40 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Logo */}
        <motion.h2
          className="text-6xl md:text-8xl font-serif text-foreground"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          GLOBY.
        </motion.h2>

        {/* Auth buttons */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="px-5 py-2.5 rounded-lg border border-border text-sm hover:bg-secondary transition"
                data-clickable
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="px-5 py-2.5 rounded-lg bg-foreground text-background text-sm hover:bg-foreground/90 transition"
                data-clickable
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 rounded-lg bg-foreground text-background text-sm hover:bg-foreground/90 transition"
              data-clickable
            >
              Logout
            </button>
          )}
        </motion.div>
      </div>
    </footer>
  )
}
