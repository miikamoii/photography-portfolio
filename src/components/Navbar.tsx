"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <nav className="w-full py-6 flex justify-center border-b border-gray-200 dark:border-gray-800">
      <ul className="flex gap-8 text-lg font-medium">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`transition-colors hover:text-black dark:hover:text-white ${
                pathname === item.href
                  ? "text-black dark:text-white font-semibold"
                  : "text-gray-500"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
