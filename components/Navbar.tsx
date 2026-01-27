"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { motion } from "framer-motion"

export function Navbar() {
  const router = useRouter()
  const [search, setSearch] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim() === "") return

    router.push(`/search?query=${encodeURIComponent(search.trim())}`)
    setSearch("")
  }

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-background/70 border-b border-border"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-serif text-foreground">
          GLOBY.
        </Link>

        {/* Links + Search */}
        <div className="flex items-center gap-6">
          <Link
            href="/upload"
            className="text-foreground hover:text-primary transition font-medium"
            data-clickable
          >
            Upload
          </Link>

          <Link
            href="/gallery"
            className="text-foreground hover:text-primary transition font-medium"
            data-clickable
          >
            Gallery
          </Link>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-lg border border-border bg-secondary/50 px-3 py-1 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition w-36 sm:w-48"
            />
          </form>
        </div>
      </div>
    </motion.nav>
  )
}
