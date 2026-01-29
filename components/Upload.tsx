"use client"

import { useState } from "react"
import { UploadCloud, X, Check, AlertCircle, Tag } from "lucide-react"
import { UploadButton } from "@/components/upload-button"
import { API_BASE } from "@/lib/api"

import { CustomCursor } from "@/components/custom-cursor"
import { LenisProvider } from "@/components/lenis-provider"
import { Navbar } from "./Navbar"
import RequireAuth from "./Requireauth"
import { FooterSection } from "./sections/footer-section"

interface UploadResult {
  image_url: string
  caption?: string
  tags?: string[]
}

export default function UploadPage() {
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<UploadResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleUploadComplete = async (res: any[]) => {
    const file = res[0]
    setPreview(file.ufsUrl)

    try {
      const backendRes = await fetch(`${API_BASE}/photos/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url: file.ufsUrl,
        }),
      })

      if (!backendRes.ok) {
        const err = await backendRes.json()
        throw new Error(err.detail || "Backend processing failed")
      }

      const data = await backendRes.json()
      setResult({ image_url: file.ufsUrl, caption: data.caption, tags: data.tags })
    } catch (err: any) {
      setError(err.message || "An error occurred")
    }
  }

  const clearUpload = () => {
    setPreview(null)
    setResult(null)
    setError(null)
  }

  return (
    <LenisProvider>
      <CustomCursor />
      <RequireAuth>
        <div className="relative min-h-screen bg-background overflow-hidden">
          <Navbar />

          {/* Soft Globy gradient blob */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[700px] h-[500px] bg-gradient-to-tr from-primary/30 via-primary/20 to-transparent blur-3xl rounded-full" />
          </div>

          {/* Content */}
          <div className="relative pt-24 max-w-3xl mx-auto px-6 pb-12">
            <div className="bg-background/80 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-xl space-y-6">
              <h2 className="text-3xl font-serif text-foreground font-bold text-center">
                Upload Image
              </h2>

              {!preview && (
                <div className="border-2 border-dashed rounded-xl p-10 text-center border-border/50 hover:border-border transition-colors bg-surface/40">
                  <UploadCloud className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-2">
                    Drag and drop an image here, or click to select
                  </p>
                  <p className="text-sm text-muted-foreground/70 mb-6">
                    Supports JPG, PNG, GIF (max 16MB)
                  </p>

                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={handleUploadComplete}
                    onUploadError={(error) => setError(error.message)}
                    appearance={{
                      container: "mx-auto",
                      button:
                        "px-8 py-3 rounded-xl font-medium bg-foreground text-background shadow hover:bg-foreground/90 transition-all",
                    }}
                    content={{
                      button: () => <span>Upload</span>,
                    }}
                  />
                </div>
              )}

              {preview && (
                <div className="space-y-5">
                  <div className="relative group">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-72 object-cover rounded-xl border border-border shadow-md"
                    />
                    <button
                      onClick={clearUpload}
                      className="absolute top-3 right-3 p-2 bg-background/90 backdrop-blur rounded-full shadow hover:bg-background transition"
                      data-clickable
                    >
                      <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>

                  {result && (
                    <div className="p-6 bg-secondary rounded-xl border border-border shadow-sm space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/20 rounded-full">
                          <Check className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground text-lg">
                          Upload Successful
                        </h3>
                      </div>

                      {result.caption && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          <span className="font-medium text-foreground">Caption:</span>{" "}
                          {result.caption}
                        </p>
                      )}

                      {result.tags && result.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {result.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium
                              bg-primary/15 text-foreground border border-border shadow-sm hover:bg-primary/20 transition"
                            >
                              <Tag className="w-3.5 h-3.5" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {error && (
                    <div className="p-6 bg-destructive/10 rounded-xl border border-destructive/20 shadow-sm space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-destructive/20 rounded-full">
                          <AlertCircle className="w-5 h-5 text-destructive" />
                        </div>
                        <h3 className="font-semibold text-destructive text-lg">
                          Upload Failed
                        </h3>
                      </div>
                      <p className="text-sm text-destructive/80">{error}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </RequireAuth>
      <FooterSection />
    </LenisProvider>
  )
}
