"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import ThemeToggleButton from "../theme/ThemeToggleButton";
import { motion, easeInOut } from "framer-motion";
import { useSession, signOut } from "next-auth/react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Now", href: "/now" },
  { label: "Me", href: "/me" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setShowNavbar(false);
        setIsMenuOpen(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleLoginClick() {
    sessionStorage.setItem("lastVisited", pathname);
    router.push("/login");
  }

  const isLoggedIn = !!session?.user?.name;

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: showNavbar ? 0 : -80 }}
        transition={{ duration: 0.3, ease: easeInOut }}
        className="w-full py-2 px-6 flex items-center justify-between 
  border-b border-purple-300 dark:border-purple-800 
  bg-white/70 dark:bg-[#191919]/70 backdrop-blur-md 
  shadow-[0_4px_12px_rgba(168,85,247,0.3)] dark:shadow-[0_4px_12px_rgba(107,33,168,0.4)]"
      >
        <div className="flex items-center">
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="text-gray-700 dark:text-gray-300"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            {isLoggedIn && (
              <span className="ml-2 text-gray-600 dark:text-gray-300 text-sm">
                {session?.user?.name}
              </span>
            )}
          </div>

          {isLoggedIn && (
            <span className="hidden sm:block text-gray-600 dark:text-gray-300 text-sm">
              {session?.user?.name}
            </span>
          )}
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

          {isLoggedIn ? (
            <li>
              <button
                onClick={() =>
                  signOut({ callbackUrl: window.location.pathname })
                }
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

        <div className="flex items-center">
          <ThemeToggleButton />
        </div>
      </motion.nav>

      <motion.div
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
        variants={{
          open: { height: "auto", opacity: 1 },
          closed: { height: 0, opacity: 0 },
        }}
        transition={{ duration: 0.3, ease: easeInOut }}
        className="sm:hidden overflow-hidden bg-white dark:bg-[#191919] border-b border-gray-200 dark:border-gray-800"
      >
        <ul className="flex flex-col items-center py-2">
          {navItems.map((item) => (
            <li key={item.href} className="w-full text-center">
              <Link
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 text-base font-medium transition-colors hover:text-black dark:hover:text-white ${
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
            <li className="w-full text-center">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  signOut({ callbackUrl: window.location.pathname });
                }}
                className="block w-full py-2 text-red-600 dark:text-red-400 font-semibold transition-colors hover:text-red-800 dark:hover:text-red-500"
              >
                Logout
              </button>
            </li>
          ) : (
            <li className="w-full text-center">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLoginClick();
                }}
                className="block w-full py-2 text-purple-600 dark:text-purple-400 font-semibold transition-colors hover:text-purple-800 dark:hover:text-purple-500"
              >
                Login
              </button>
            </li>
          )}
        </ul>
      </motion.div>
    </header>
  );
}
