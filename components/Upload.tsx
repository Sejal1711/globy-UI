"use client";

import { useState } from "react";
import { UploadCloud, X, Check, AlertCircle } from "lucide-react";
import { UploadButton } from "@/components/upload-button"; // ✅ use our reusable button
import { API_BASE } from "@/lib/api";

interface UploadResult {
  image_url: string;
  caption?: string;
}

export default function Upload() {
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUploadComplete = async (res: any[]) => {
    const file = res[0];
    setPreview(file.ufsUrl);

    try {
      const backendRes = await fetch(`${API_BASE}/photos/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url: file.ufsUrl,
        
        }),
      });

      if (!backendRes.ok) {
        const err = await backendRes.json();
        throw new Error(err.detail || "Backend processing failed");
      }

      const data = await backendRes.json();
      setResult({ image_url: file.ufsUrl, caption: data.caption });
    } catch (err: any) {
      setError(err.message || "An error occurred");
    }
  };

  const clearUpload = () => {
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Upload Image</h2>

      {!preview && (
        <div className="border-2 border-dashed rounded-lg p-8 text-center border-gray-300 hover:border-gray-400 transition-colors">
          <UploadCloud className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-2">
            Drag and drop an image here, or click to select
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Supports JPG, PNG, GIF (max 16MB)
          </p>

          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={handleUploadComplete}
            onUploadError={(error) => setError(error.message)}
            appearance={{
              button:
                "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
            }}
          />
        </div>
      )}

      {preview && (
        <div className="space-y-4">
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg"
            />
            <button
              onClick={clearUpload}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {result && (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-green-800 mb-1">
                    Upload Successful
                  </h3>
                  {result.caption && (
                    <p className="text-sm text-green-700 mt-1">
                      <span className="font-medium">Caption:</span> {result.caption}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-red-800 mb-1">Upload Failed</h3>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
