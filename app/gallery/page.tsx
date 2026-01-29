import { CustomCursor } from "@/components/custom-cursor";
import { LenisProvider } from "@/components/lenis-provider";
import { Navbar } from "@/components/Navbar";
import Results from "@/components/Results";
import { API_BASE } from "@/lib/api";

// This matches the Results component's expected type
interface ImageItem {
  uuid: string;
  image_url: string;
  caption: string; // required
  tags: string[];
}

// API response type
interface ResultImage {
  uuid: string;
  image_url: string;
  caption?: string;
  tags?: string[];
}

export default async function GalleryPage() {
  let images: ImageItem[] = [];

  try {
    const res = await fetch(`${API_BASE}/gallery`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch gallery images");

    const data: ResultImage[] = await res.json();

    // ✅ Map API results to ImageItem with defaults
    images = data.map(img => ({
      uuid: img.uuid,
      image_url: img.image_url,
      caption: img.caption || "", // default to empty string
      tags: img.tags || [],       // default to empty array
    }));
  } catch (err) {
    console.error("Failed to fetch gallery images:", err);
    images = [];
  }

  return (
    <LenisProvider>
      <CustomCursor />
      <Navbar />

      <main className="max-w-7xl font-serif mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Gallery</h2>

        {images.length === 0 ? (
          <p className="text-gray-500">No images found.</p>
        ) : (
          <Results images={images} />
        )}
      </main>
    </LenisProvider>
  );
}
