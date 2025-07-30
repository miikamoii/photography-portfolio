"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggleButton from "../theme/ThemeToggleButton";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="relative w-full py-4 px-6 flex items-center border-b border-gray-200 dark:border-gray-800">
      <ul className="absolute left-1/2 -translate-x-1/2 flex gap-6 text-base font-medium">
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

      <div className="ml-auto">
        <ThemeToggleButton />
      </div>
    </nav>
  );
}
