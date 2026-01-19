"use client";

import { useState } from "react";
import { Download, Maximize2, X, Image } from "lucide-react";
import { ImageItem } from "@/app/types/image";

interface ResultsProps {
  images: ImageItem[];
}

export default function Results({ images }: ResultsProps) {
  const [selectedImage, setSelectedImage] = useState<{ url: string; index: number } | null>(null);
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});
  const [errorImages, setErrorImages] = useState<{ [key: number]: boolean }>({});

  const handleImageLoad = (index: number) => setLoadedImages(prev => ({ ...prev, [index]: true }));
  const handleImageError = (index: number) => setErrorImages(prev => ({ ...prev, [index]: true }));

  const handleDownload = async (url: string, index: number) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `image-${index + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  const openLightbox = (url: string, index: number) => setSelectedImage({ url, index });
  const closeLightbox = () => setSelectedImage(null);

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-xl mt-6">
        <Image className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500 text-lg">No images found</p>
        <p className="text-gray-400 text-sm mt-2">Try uploading some images or adjusting your search</p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((item, i) => (
          <div
            key={item.uuid || i}
            className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            {!loadedImages[i] && !errorImages[i] && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
            
            {errorImages[i] ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <Image className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                  <p className="text-xs text-gray-400">Failed to load</p>
                </div>
              </div>
            ) : (
              <>
                <img
                  src={item.image_url}
                  alt={item.caption}
                  className="w-full h-full object-cover cursor-pointer group-hover:scale-110 transition-transform duration-300"
                  onLoad={() => handleImageLoad(i)}
                  onError={() => handleImageError(i)}
                  onClick={() => openLightbox(item.image_url, i)}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={(e) => { e.stopPropagation(); openLightbox(item.image_url, i); }}
                    className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Maximize2 className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDownload(item.image_url, i); }}
                    className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Download className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
          tabIndex={0}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <img
            src={selectedImage.url}
            alt={`Image ${selectedImage.index + 1}`}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
