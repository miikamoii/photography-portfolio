"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import ThemeToggleButton from "../theme/ThemeToggleButton";
import { motion, easeInOut } from "framer-motion";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

interface NavbarProps {
  session: Session | null;
}

const navItems = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Gallery", href: "/gallery" },
  { label: "Now", href: "/now" },
  { label: "About", href: "/about" },
];

export default function Navbar({ session }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const containerVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: easeInOut,
        when: "beforeChildren",
        staggerChildren: 0.07,
      },
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: easeInOut,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const linkVariants = {
    open: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    closed: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  function handleLoginClick() {
    sessionStorage.setItem("lastVisited", pathname);
    router.push("/login");
  }

  const isLoggedIn = !!session?.user?.name;

  return (
    <header className="relative z-50">
      <div className="fixed top-2.5 right-4 z-50">
        <ThemeToggleButton />
      </div>

      <nav className="w-full py-4 px-6 flex items-center justify-between border-b border-purple-300 dark:border-purple-800 relative">
        {isLoggedIn && (
          <span className="hidden sm:block absolute left-6 text-gray-600 dark:text-gray-300 text-sm">
            {session?.user?.name}
          </span>
        )}

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

          {isLoggedIn ? (
            <li>
              <button
                onClick={() => signOut({ callbackUrl: window.location.href })}
                className="text-red-600 dark:text-red-400 font-semibold transition-colors hover:text-red-800 dark:hover:text-red-500 cursor-pointer"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <button
                onClick={handleLoginClick}
                className="text-purple-600 dark:text-purple-400 font-semibold transition-colors hover:text-purple-800 dark:hover:text-purple-500 cursor-pointer"
              >
                Login
              </button>
            </li>
          )}
        </ul>

        <div className="flex sm:hidden items-center space-x-2">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="text-gray-700 dark:text-gray-300"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {isLoggedIn && (
            <span className="text-gray-600 dark:text-gray-300 text-sm ml-2">
              {session?.user?.name}
            </span>
          )}
        </div>
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

        <motion.div
          variants={linkVariants}
          className="w-full flex justify-center"
        >
          {isLoggedIn ? (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                signOut({ callbackUrl: window.location.href });
              }}
              className="block py-2 text-red-600 dark:text-red-400 font-semibold transition-colors hover:text-red-800 dark:hover:text-red-500 cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleLoginClick();
              }}
              className="block py-2 text-purple-600 dark:text-purple-400 font-semibold transition-colors hover:text-purple-800 dark:hover:text-purple-300 cursor-pointer"
            >
              Login
            </button>
          )}
        </motion.div>
      </motion.div>
    </header>
  );
}
