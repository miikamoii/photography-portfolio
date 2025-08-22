import fs from "fs";
import path from "path";
import type { Photo } from "react-photo-album";

export interface ImageItem extends Photo {
  src: string;
  width: number;
  height: number;
  alt?: string;
  blurDataURL?: string;
}

const CACHE_FILE = path.join(
  process.cwd(),
  "public",
  "optimized",
  "gallery",
  "gallery-data.json"
);

export function getGalleryImages(): ImageItem[] {
  if (!fs.existsSync(CACHE_FILE)) return [];
  const data = fs.readFileSync(CACHE_FILE, "utf-8");
  return JSON.parse(data) as ImageItem[];
}
