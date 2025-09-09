"use client";

import Image from "next/image";
import pfp from "/public/optimized/pfp/pfp.png";
import pfpData from "../../public/optimized/pfp/pfp-data.json";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const [hovered, setHovered] = useState(false);
  const waveControls = useAnimation();
  const [isWaving, setIsWaving] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [showAnnotation, setShowAnnotation] = useState(false);
  const [annotationVisible, setAnnotationVisible] = useState(false);
  const [annotationFullyAppeared, setAnnotationFullyAppeared] = useState(false);

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

      const timeout = setTimeout(() => {
        setShowAnnotation(true);
        setAnnotationVisible(true);
      }, 800);

      return () => clearTimeout(timeout);
    }
  }, [pageLoaded]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/optimized/hero/IMG_1217.webp"
          alt="Hero background"
          fill
          priority
          className="object-cover object-center brightness-75"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20 min-h-screen">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight relative inline-block">
          <motion.span
            className="inline-block origin-[70%_70%] mr-2"
            animate={waveControls}
            onMouseEnter={triggerWave}
          >
            👋
          </motion.span>
          Hi, I&#39;m{" "}
          <Link href="/me" passHref>
            <motion.span
              className="text-purple-400 hover:text-purple-300 relative cursor-pointer inline-block transition-colors"
              onMouseEnter={() => {
                setHovered(true);
                if (annotationFullyAppeared) setAnnotationVisible(false);
              }}
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
                {showAnnotation && annotationVisible && (
                  <motion.div
                    initial={{ opacity: 0, x: -10, y: 10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 3, duration: 1, ease: "easeOut" }}
                    onAnimationComplete={() => setAnnotationFullyAppeared(true)}
                    className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 flex items-center gap-1 select-none pointer-events-none"
                    aria-hidden="true"
                  >
                    <span
                      className="text-sm text-purple-300"
                      style={{ transform: "rotate(35deg)" }}
                    >
                      Hover over me!
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
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
                        src={pfp}
                        alt="Miika"
                        width={200}
                        height={200}
                        quality={90}
                        priority
                        className="object-cover w-full h-full transition-opacity duration-500"
                        placeholder="blur"
                        blurDataURL={pfpData.blurDataURL}
                        style={{ transition: "opacity 0.5s" }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.span>
          </Link>
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
            href="/now"
            className="border border-white text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-white hover:text-black transition"
          >
            What I&#39;m doing now
          </a>
        </div>
      </div>
    </main>
  );
}
