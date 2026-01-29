"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Results from "@/components/Results"
import { SearchLoader } from "@/components/SearchLoader"
import { API_BASE } from "@/lib/api"
import { ImageItem } from "@/app/types/image"
import { useRouter } from "next/navigation"

export function Navbar() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [images, setImages] = useState<ImageItem[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  // 🔍 Search with cancellation
  const searchImages = async (q: string) => {
    if (!q.trim()) {
      setImages([])
      setLoading(false)
      return
    }

    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    try {
      const res = await fetch(`${API_BASE}/search?query=${encodeURIComponent(q)}`, {
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })

      if (!res.ok) {
        setImages([])
        setLoading(false)
        return
      }

      const data = await res.json()
      const mappedResults: ImageItem[] = (data.results ?? []).map((item: any) => ({
        uuid: item.id ?? item.uuid,
        image_url: item.image_url ?? item.imageUrl,
        caption: item.caption ?? "",
        tags: item.tags ?? [],
      }))

      setImages(mappedResults)
      setLoading(false)
    } catch (err: any) {
      if (err.name !== "AbortError") {
        console.error("Search error:", err)
        setImages([])
        setLoading(false)
      }
      // Don't set loading to false on AbortError - new search is coming
    }
  }

  // ⌨️ Handle typing
  const handleChange = (value: string) => {
    const token = sessionStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    setQuery(value)
    setOpen(true)

    // Show loading immediately when user types
    if (value.trim()) {
      setLoading(true)
    } else {
      setLoading(false)
      setImages([])
    }

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => searchImages(value), 300)
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      if (abortRef.current) abortRef.current.abort()
    }
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-background/70 border-b"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-2xl font-serif">GLOBY.</Link>

          <div className="flex items-center gap-6">
            <Link href="/upload">Upload</Link>
            <Link href="/gallery">Gallery</Link>

            <input
              value={query}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Search..."
              className="rounded-lg border px-3 py-1 w-40 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </motion.nav>

      {open && (
        <div className="fixed inset-0 top-16 z-40 bg-background overflow-y-auto px-6 pb-10">
          {/* ✅ Show loader when loading */}
          {loading && <SearchLoader />}
          
          {/* ✅ Show results when available and not loading */}
          {!loading && images.length > 0 && <Results images={images} />}

          {/* Show no results only when query is not empty, loading is false, and no images */}
          {!loading && query.trim() !== "" && images.length === 0 && (
            <p className="text-gray-500 mt-6 text-center">No results found.</p>
          )}
        </div>
      )}
    </>
  )
}