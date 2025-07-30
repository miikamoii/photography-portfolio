import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/IMG_1217.jpg"
          alt="Hero background"
          fill
          priority
          className="object-cover object-center brightness-75"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20 min-h-screen">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
          👋 Hi, I’m <span className="text-purple-400">Miika</span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-zinc-200 max-w-xl">
          I build web experiences and capture the world through my lens.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <a
            href="/gallery"
            className="bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-200 transition"
          >
            View Photography
          </a>
          <a
            href="/blog"
            className="border border-white text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-white hover:text-black transition"
          >
            Read the Blog
          </a>
        </div>
      </div>
    </main>
  );
}
