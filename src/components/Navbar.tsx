"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import ThemeToggleButton from "../theme/ThemeToggleButton";
import { motion, easeInOut } from "framer-motion";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Gallery", href: "/gallery" },
  { label: "Now", href: "/now" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const containerVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: easeInOut,
        when: "beforeChildren" as const,
        staggerChildren: 0.07,
      },
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: easeInOut,
        when: "afterChildren" as const,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const linkVariants = {
    open: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    closed: { opacity: 0, y: -10, transition: { duration: 0.2 } },
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
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
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

      <motion.div
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
        variants={containerVariants}
        className="sm:hidden absolute top-full left-0 w-full bg-white dark:bg-[#191919] border-b border-gray-200 dark:border-gray-800 overflow-hidden"
        style={{ pointerEvents: isMenuOpen ? "auto" : "none" }}
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
    </header>
  );
}
