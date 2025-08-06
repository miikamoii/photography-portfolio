"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggleButton from "../theme/ThemeToggleButton";
import { motion, AnimatePresence, Variants, easeInOut } from "framer-motion";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuVariants: Variants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: easeInOut,
        when: "beforeChildren",
        staggerChildren: 0.07,
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: easeInOut,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <header className="relative z-50">
      <div className="fixed top-2.5 right-4 z-50">
        <ThemeToggleButton />
      </div>

      <nav className="w-full py-4 px-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
        <div className="sm:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="text-gray-700 dark:text-gray-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <ul className="hidden sm:flex gap-6 text-base font-medium mx-auto">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`transition-colors hover:text-black dark:hover:text-white ${
                  pathname === item.href
                    ? "text-black dark:text-white font-semibold"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobileMenu"
            className="sm:hidden px-6 pt-2 pb-4 bg-white dark:bg-[#191919] border-b border-gray-200 dark:border-gray-800 overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            {navItems.map((item) => (
              <motion.div
                key={item.href}
                variants={linkVariants}
                className="w-full flex justify-center"
              >
                <Link
                  href={item.href}
                  className={`block py-2 text-base font-medium transition-colors hover:text-black dark:hover:text-white ${
                    pathname === item.href
                      ? "text-black dark:text-white font-semibold"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
