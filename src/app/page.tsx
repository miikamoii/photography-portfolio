"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

export default function Home() {
  const [hovered, setHovered] = useState(false);
  const waveControls = useAnimation();
  const [isWaving, setIsWaving] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  const triggerWave = () => {
    if (isWaving) return;
    setIsWaving(true);
    waveControls
      .start({
        rotate: [0, 20, -10, 20, -5, 0],
        transition: { duration: 1.2, ease: "easeInOut" },
      })
      .then(() => setIsWaving(false));
  };

  useEffect(() => {
    const handleLoad = () => setPageLoaded(true);

    if (document.readyState === "complete") {
      setPageLoaded(true);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  useEffect(() => {
    if (pageLoaded) {
      triggerWave();
    }
  }, [pageLoaded]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-white">
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

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20 min-h-screen">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight relative">
          <motion.span
            className="inline-block origin-[70%_70%] mr-2"
            animate={waveControls}
            onMouseEnter={triggerWave}
          >
            👋
          </motion.span>
          Hi, I’m{" "}
          <motion.span
            className="text-purple-400 relative cursor-default inline-block"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            initial={{ y: -150, opacity: 0 }}
            animate={pageLoaded ? { y: 0, opacity: 1 } : {}}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              mass: 1.2,
              delay: 0.5,
            }}
          >
            Miika
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, y: -100, scale: 0.9 }}
                  animate={{ opacity: 1, y: -210, scale: 1.8 }}
                  exit={{ opacity: 0, y: -100, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute left-1/2 -translate-x-1/2 mb-2"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden border-[1px] border-purple-400 shadow-lg animate-glow">
                    <Image
                      src="/pfp.png"
                      alt="Miika"
                      width={200}
                      height={200}
                      quality={100}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.span>
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
