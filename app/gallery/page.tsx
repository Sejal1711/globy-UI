import Results from "@/components/Results";
import { API_BASE } from "@/lib/api";

interface ResultImage {
  id: number;
  image_url: string;
  caption: string;
}

export default async function GalleryPage() {
  const res = await fetch(`${API_BASE}/gallery`, { cache: "no-store" });
  const images: ResultImage[] = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Gallery</h2>
      <Results images={images} />
    </div>
  );
}
