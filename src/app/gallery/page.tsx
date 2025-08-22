// app/gallery/page.tsx
import { getGalleryImages } from "@/lib/getGalleryImages";
import Gallery from "@/components/Gallery";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import TipButton from "@/components/TipButton";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const images = await getGalleryImages();
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen px-6 py-12 space-y-20 relative">
      <section>
        <h1 className="text-4xl font-extrabold mb-4 text-center dark:text-white">
          My Gallery
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-center max-w-2xl mx-auto">
          Welcome to my gallery. I&#39;m a developer and photographer passionate
          about creating beautiful, fast, and functional web experiences.
        </p>

        <TipButton />

        <Gallery images={images} />
      </section>

      <div className="border-t border-purple-300 dark:border-purple-800  my-20" />

      <section className="py-12 px-4 transition-colors duration-300">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4 text-center dark:text-white">
            Before/After Edits
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            I also specialize in post-processing and photo editing. Here&#39;s a
            look at some before-and-after comparisons to showcase my editing.
          </p>
        </div>

        <div className="space-y-12">
          <BeforeAfterSlider
            beforeSrc="/optimized/compare/before1.webp"
            afterSrc="/optimized/compare/after1.webp"
            session={session}
            locked
          />
          <BeforeAfterSlider
            beforeSrc="/optimized/compare/before2.webp"
            afterSrc="/optimized/compare/after2.webp"
            session={session}
            locked
          />
          <BeforeAfterSlider
            beforeSrc="/optimized/compare/before3.webp"
            afterSrc="/optimized/compare/after3.webp"
            session={session}
            locked
          />
        </div>
      </section>

      <ScrollToTopButton />
    </main>
  );
}
