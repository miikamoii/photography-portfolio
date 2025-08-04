// app/gallery/page.tsx
import fs from "fs";
import path from "path";
import sizeOf from "image-size";
import Gallery from "@/components/Gallery";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

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
    <main className="min-h-screen px-6 py-12 space-y-20">
      <section>
        <h1 className="text-4xl font-extrabold mb-4 text-center">My Gallery</h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl mx-auto">
          Welcome to my gallery. I&#39;m a developer and photographer passionate
          about creating beautiful, fast, and functional web experiences.
        </p>

        <Gallery images={images} />
      </section>

      <div className="border-t border-gray-200 dark:border-gray-800 my-20" />

      <section className="py-12 px-4 transition-colors duration-300">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Before/After Edits
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            I also specialize in post-processing and photo editing. Here&#39;s a
            look at some before-and-after comparisons to showcase my editing.
          </p>
        </div>

        <div className="space-y-12">
          <BeforeAfterSlider
            beforeSrc="/compare/before1.jpg"
            afterSrc="/compare/after1.jpg"
          />
          <BeforeAfterSlider
            beforeSrc="/compare/before2.jpg"
            afterSrc="/compare/after2.jpg"
          />
          <BeforeAfterSlider
            beforeSrc="/compare/before3.jpg"
            afterSrc="/compare/after3.jpg"
          />
        </div>
      </section>
    </main>
  );
}
