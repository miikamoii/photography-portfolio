"use client";

import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      initial={false}
      animate={{
        opacity: show ? 1 : 0,
        y: show ? 0 : 20,
        pointerEvents: show ? "auto" : "none",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ willChange: "transform, opacity" }}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="
        fixed bottom-6 right-6
        p-3 rounded-full shadow-md z-50
        bg-gray-50 text-black hover:text-white hover:bg-gray-700
        dark:bg-gray-800 dark:hover:bg-gray-300
        dark:text-white dark:hover:text-gray-900
      "
    >
      <FiArrowUp className="h-5 w-5" />
    </motion.button>
  );
}
