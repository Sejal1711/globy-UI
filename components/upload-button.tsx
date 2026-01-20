"use client";

import { UploadButton as UTUploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

// ✅ Correctly typed wrapper
export const UploadButton = (props: Parameters<typeof UTUploadButton<OurFileRouter, "imageUploader">>[0]) => (
  <UTUploadButton<OurFileRouter, "imageUploader"> {...props} />
);
