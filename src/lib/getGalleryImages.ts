// lib/getGalleryImages.ts
import fs from "fs";
import path from "path";
import sizeOf from "image-size";

export interface ImageItem {
  src: string;
  width: number;
  height: number;
}

export function getGalleryImages(): ImageItem[] {
  const galleryDir = path.join(process.cwd(), "public/optimized/gallery");
  const files = fs.readdirSync(galleryDir).sort();

  return files
    .filter((file) => /\.(jpe?g|png|webp|gif|avif)$/i.test(file))
    .map((file) => {
      const filePath = path.join(galleryDir, file);
      const dimensions = sizeOf(fs.readFileSync(filePath));

      return {
        src: `/optimized/gallery/${file}`,
        width: dimensions.width || 1,
        height: dimensions.height || 1,
      };
    });
}
