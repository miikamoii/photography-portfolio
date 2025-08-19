"use client";

import { useState, useEffect, useRef } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox, { FullscreenRef } from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { FiHelpCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import "yet-another-react-lightbox/styles.css";
import "react-photo-album/styles.css";

interface ImageItem {
  src: string;
  width: number;
  height: number;
}

interface GalleryProps {
  images: ImageItem[];
}

function TipPopup({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div
        className="
          relative
          bg-white dark:bg-gray-800
          border border-gray-300 dark:border-gray-700
          rounded-md px-4 py-3 mb-6
          shadow-lg
          text-gray-700 dark:text-gray-300
          select-none
          w-fit max-w-full
        "
        role="dialog"
        aria-live="polite"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            <span className="font-semibold block mb-1">Gallery tips!</span>
            <span className="block">
              Click any photo to open it in fullscreen!
              <br />
              Doubleclick to zoom.
              <br />
              Arrow keys to navigate.
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close tip"
            className="
              text-gray-500 hover:text-gray-700 dark:hover:text-gray-300
              font-bold text-xl leading-none
              transition-colors
            "
          >
            &times;
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery({ images }: GalleryProps) {
  const [index, setIndex] = useState<number | null>(null);
  const [showTip, setShowTip] = useState(false);
  const fullscreenRef = useRef<FullscreenRef | null>(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  useEffect(() => {
    const tipClosed = localStorage.getItem("galleryTipClosed");
    if (!tipClosed) setShowTip(true);
  }, []);

  useEffect(() => {
    const imgs = document.querySelectorAll(".react-photo-album img");
    imgs.forEach((img) => {
      if (!img.getAttribute("loading")) {
        img.setAttribute("loading", "lazy");
      }
    });
  }, [images]);

  function closeTip() {
    setShowTip(false);
    localStorage.setItem("galleryTipClosed", "true");
  }

  useEffect(() => {
    if (index !== null && isMobile) {
      fullscreenRef.current?.enter();
      window.history.pushState({ lightbox: true }, "");
    }
  }, [index, isMobile]);

  useEffect(() => {
    function handlePopState() {
      if (index !== null) {
        setIndex(null);
        fullscreenRef.current?.exit();
      }
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [index]);

  return (
    <>
      <div className="mb-4 flex items-center justify-start gap-2">
        <button
          onClick={() => {
            if (showTip) {
              setShowTip(false);
              localStorage.setItem("galleryTipClosed", "true");
            } else {
              localStorage.removeItem("galleryTipClosed");
              setShowTip(true);
            }
          }}
          className="p-2 rounded-full bg-gray-50 text-black hover:text-white hover:bg-gray-700 transition dark:bg-gray-800 dark:hover:bg-gray-300 dark:text-white dark:hover:text-gray-900"
          aria-label="Toggle tip"
        >
          <motion.div
            key={showTip ? "shown" : "hidden"}
            initial={{ opacity: 0, rotate: 30 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FiHelpCircle className="h-5 w-5" />
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {showTip && <TipPopup onClose={closeTip} />}
      </AnimatePresence>

      <PhotoAlbum
        layout="masonry"
        photos={images}
        columns={(containerWidth) => {
          if (containerWidth < 280) return 1;
          if (containerWidth < 680) return 2;
          return 3;
        }}
        spacing={8}
        onClick={({ index }) => setIndex(index)}
      />

      <Lightbox
        open={index !== null}
        index={index ?? 0}
        close={() => setIndex(null)}
        slides={images.map(({ src }) => ({ src }))}
        plugins={[Fullscreen, Zoom]}
        fullscreen={{ ref: fullscreenRef, auto: false }}
        styles={
          isMobile
            ? {
                container: { backgroundColor: "black" },
                button: { display: "none" },
              }
            : {}
        }
      />
    </>
  );
}
