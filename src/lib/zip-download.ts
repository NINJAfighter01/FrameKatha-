import JSZip from "jszip";

export interface ZipDownloadOptions {
  urls: string[];
  zipFileName: string;
  onProgress?: (current: number, total: number, fileName: string) => void;
}

/**
 * Downloads a list of media URLs directly in the browser and packages them into a real,
 * standard PKZIP (.zip) archive using JSZip. Works on all mobile devices and desktops.
 */
export async function downloadFilesAsZip({
  urls,
  zipFileName,
  onProgress,
}: ZipDownloadOptions): Promise<{ success: boolean; count: number; error?: string }> {
  const validUrls = (urls || []).filter((u) => typeof u === "string" && u.trim().length > 0);
  if (validUrls.length === 0) {
    throw new Error("No photos or media selected to download.");
  }

  const zip = new JSZip();
  let count = 0;
  const total = validUrls.length;

  for (let i = 0; i < validUrls.length; i++) {
    const rawUrl = validUrls[i].trim();
    const fileIndex = i + 1;

    // Determine extension
    let ext = "jpg";
    const lower = rawUrl.toLowerCase();
    if (lower.includes(".png") || lower.includes("image/png")) ext = "png";
    else if (lower.includes(".webp") || lower.includes("image/webp")) ext = "webp";
    else if (lower.includes(".mp4") || lower.includes("video/mp4")) ext = "mp4";
    else if (lower.includes(".jpeg")) ext = "jpeg";

    const paddedIndex = String(fileIndex).padStart(2, "0");
    const fileName = `photo_${paddedIndex}.${ext}`;

    if (onProgress) {
      onProgress(fileIndex, total, fileName);
    }

    try {
      // 1. If base64 data url
      if (rawUrl.startsWith("data:")) {
        const parts = rawUrl.split(",");
        const b64Data = parts[1];
        zip.file(fileName, b64Data, { base64: true });
        count++;
        continue;
      }

      // 2. Try direct fetch as Blob
      const response = await fetch(rawUrl, { mode: "cors" });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const blob = await response.blob();
      if (blob.size > 0) {
        zip.file(fileName, blob);
        count++;
        continue;
      }
    } catch (fetchErr) {
      console.warn(`Direct fetch failed for ${rawUrl}, trying Image canvas fallback:`, fetchErr);

      // 3. Fallback for images via Canvas (handles some CORS scenarios)
      try {
        const blobFromCanvas = await fetchImageViaCanvas(rawUrl);
        if (blobFromCanvas && blobFromCanvas.size > 0) {
          zip.file(fileName, blobFromCanvas);
          count++;
          continue;
        }
      } catch (canvasErr) {
        console.error(`Failed to load image into zip: ${rawUrl}`, canvasErr);
      }
    }
  }

  if (count === 0) {
    throw new Error("Unable to download images into ZIP archive due to network or CORS restrictions.");
  }

  // Generate real PKZIP blob
  const zipBlob = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });

  // Trigger browser download
  const cleanName = zipFileName.endsWith(".zip") ? zipFileName : `${zipFileName}.zip`;
  triggerBlobDownload(zipBlob, cleanName);

  return { success: true, count };
}

function fetchImageViaCanvas(url: string): Promise<Blob | null> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(null);
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.95);
      } catch (e) {
        reject(e);
      }
    };
    img.onerror = (e) => reject(e);
    img.src = url;
  });
}

export function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    if (document.body.contains(link)) {
      document.body.removeChild(link);
    }
    URL.revokeObjectURL(url);
  }, 60000);
}
