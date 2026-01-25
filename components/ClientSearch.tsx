"use client";

import { useState, useRef, useEffect } from "react";
import { SearchIcon, Loader2, XCircle, Tag } from "lucide-react";
import Results from "./Results";
import { API_BASE } from "@/lib/api";
import { ImageItem } from "@/app/types/image";

interface Props {
  initialResults?: ImageItem[];
  initialQuery?: string;
}

export default function ClientSearch({ initialResults = [], initialQuery = "" }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [images, setImages] = useState<ImageItem[]>(initialResults);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const abortController = useRef<AbortController | null>(null);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setImages([]);
      setError(null);
      return;
    }

    if (abortController.current) abortController.current.abort();
    abortController.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/search?query=${encodeURIComponent(searchQuery)}`, {
        signal: abortController.current.signal,
      });
      if (!res.ok) throw new Error("Search failed");

      const data = await res.json();
      setImages(data.results);
    } catch (err: any) {
      if (err.name !== "AbortError") setError(err.message || "Failed to search images");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => performSearch(value), 400);
  };

  const handleClear = () => {
    setQuery("");
    setImages([]);
    setError(null);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    if (abortController.current) abortController.current.abort();
  };

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      if (abortController.current) abortController.current.abort();
    };
  }, []);

  return (
    <>
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by people, places, objects..."
          value={query}
          onChange={handleInputChange}
          className="w-full pl-10 pr-10 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          disabled={loading}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {loading ? (
            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
          ) : query ? (
            <button onClick={handleClear}>
              <XCircle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
          ) : null}
        </div>
      </div>

      {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}
      <Results images={images} />
    </>
  );
}
