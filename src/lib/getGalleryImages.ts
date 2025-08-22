import fs from "fs";
import path from "path";
import sizeOf from "image-size";
import type { Photo } from "react-photo-album";

export interface ImageItem extends Photo {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

const GALLERY_PATH = path.join(process.cwd(), "public", "optimized", "gallery");

export function getGalleryImages(): ImageItem[] {
  if (!fs.existsSync(GALLERY_PATH)) return [];

  const files = fs
    .readdirSync(GALLERY_PATH)
    .filter((file) => /\.(jpe?g|png|webp|avif)$/i.test(file));

  const images: ImageItem[] = files.map((file) => {
    const filePath = path.join(GALLERY_PATH, file);

    const buffer = fs.readFileSync(filePath);
    const dimensions = sizeOf(buffer);
    const width = dimensions.width ?? 1;
    const height = dimensions.height ?? 1;

    const alt = path.parse(file).name.replace(/[-_]/g, " ");
    return {
      src: `/optimized/gallery/${file}`,
      width,
      height,
      alt,
    };
  });

  return images;
}
