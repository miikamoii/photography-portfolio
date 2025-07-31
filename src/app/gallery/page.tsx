// app/gallerypage.tsx
import fs from "fs";
import path from "path";
import sizeOf from "image-size";
import Gallery from "@/components/Gallery";

export const dynamic = "force-dynamic";

export default function GalleryPage() {
  const galleryDir = path.join(process.cwd(), "public/gallery");
  const files = fs.readdirSync(galleryDir);

  const images = files
    .filter((file) => /\.(jpe?g|png|webp|gif|avif)$/i.test(file))
    .map((file) => {
      const filePath = path.join(galleryDir, file);
      const dimensions = sizeOf(fs.readFileSync(filePath));

      return {
        src: `/gallery/${file}`,
        width: dimensions.width || 1,
        height: dimensions.height || 1,
      };
    });

  return (
    <main className="min-h-screen px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">My Gallery</h1>
      <p className="text-lg text-gray-600 mb-6">
        Welcome to my gallery. I&#39;m a developer and photographer passionate
        about creating beautiful, fast, and functional web experiences.
      </p>

      <Gallery images={images} />
    </main>
  );
}
