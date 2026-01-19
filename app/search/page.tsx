import Results from "@/components/Results";

import { API_BASE } from "@/lib/api";
import { ImageItem } from "@/app/types/image";
import ClientSearch from "@/components/ClientSearch";

// Server-side fetch
async function getInitialResults(query: string) {
  try {
    const res = await fetch(`${API_BASE}/search?query=${encodeURIComponent(query)}`, {
      cache: "no-store", // always fresh
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.results as ImageItem[];
  } catch {
    return [];
  }
}

export default async function SearchPage() {
  // Optional: initial query
  const initialQuery = "diagram"; 
  const initialResults = await getInitialResults(initialQuery);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <ClientSearch initialResults={initialResults} initialQuery={initialQuery} />
    </div>
  );
}
