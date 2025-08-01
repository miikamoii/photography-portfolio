"use client";

import { useState, useEffect } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
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
    <div
      className="
        relative
        bg-white dark:bg-gray-800
        border border-gray-300 dark:border-gray-700
        rounded-md p-4 mb-6 max-w-md
        shadow-lg
        text-gray-700 dark:text-gray-300
        animate-fadeSlideDown
        select-none
      "
      role="dialog"
      aria-live="polite"
    >
      <div className="flex justify-between items-start">
        <div className="flex text-sm leading-relaxed text-gray-700 dark:text-gray-300 gap-1 flex-wrap">
          <span className="font-semibold">Gallery tips!</span>
          <span>
            Click on any photo to open it in fullscreen!
            <br />
            While fullscreen, doubleclick to zoom.
            <br />
            Use the arrow keys to navigate through the photos.
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close tip"
          className="
            ml-4
            text-gray-500 hover:text-gray-700 dark:hover:text-gray-300
            font-bold text-xl leading-none
            transition-colors
          "
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default function Gallery({ images }: GalleryProps) {
  const [index, setIndex] = useState<number | null>(null);
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    const tipClosed = localStorage.getItem("galleryTipClosed");
    if (!tipClosed) {
      setShowTip(true);
    }
  }, []);

  function closeTip() {
    setShowTip(false);
    localStorage.setItem("galleryTipClosed", "true");
  }

  function showTipAgain() {
    localStorage.removeItem("galleryTipClosed");
    setShowTip(true);
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-start gap-2">
        <button
          onClick={showTipAgain}
          className="p-2 rounded-full bg-gray-50 text-black hover:text-white hover:bg-gray-700 transition dark:bg-gray-800 dark:hover:bg-gray-300 dark:text-white dark:hover:text-gray-900"
          aria-label="Show tip"
        >
          <motion.div
            key={showTip ? "shown" : "hidden"}
            initial={{ opacity: 0, rotate: 30 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HelpCircle className="h-5 w-5" />
          </motion.div>
        </button>
      </div>

      {showTip && <TipPopup onClose={closeTip} />}

      <PhotoAlbum
        layout="masonry"
        photos={images}
        columns={(containerWidth) => {
          if (containerWidth < 640) return 1;
          if (containerWidth < 768) return 2;
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
      />
    </>
  );
}
