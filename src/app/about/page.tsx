// src/app/about/page.tsx
import React from "react";

export const metadata = {
  title: "About This Site",
  description:
    "Learn about the ideas, design choices, and technology behind this portfolio.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About This Website</h1>

      <section className="mb-8">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          This portfolio is more than just a gallery of my photography — it’s
          also a personal sandbox for exploring modern web development. I
          designed it to be{" "}
          <span className="font-semibold">
            fast, lightweight, and interactive
          </span>
          , while also serving as a place to try out new technologies and design
          patterns.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🔧 Tech Stack</h2>
        <ul className="text-gray-600 dark:text-gray-400 list-disc list-inside space-y-2">
          <li>
            <span className="font-medium">Next.js App Router</span> – modern
            full-stack React framework
          </li>
          <li>
            <span className="font-medium">TypeScript</span> – type safety and
            maintainability
          </li>
          <li>
            <span className="font-medium">Tailwind CSS</span> – rapid styling
            and responsive design
          </li>
          <li>
            <span className="font-medium">Framer Motion</span> – smooth page
            transitions and animations
          </li>
          <li>
            <span className="font-medium">NextAuth</span> – secure
            authentication with guest accounts
          </li>
          <li>
            <span className="font-medium">Upstash / Redis</span> – lightweight
            user storage and persistence
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">✨ Features</h2>
        <ul className="text-gray-600 dark:text-gray-400 list-disc list-inside space-y-2">
          <li>Temporary guest login system for private slider tool access</li>
          <li>Gallery component, featuring my work in photography</li>
          <li>Dark/Light mode and responsive design</li>
          <li>Custom animations for a fluid browsing experience</li>
          <li>Hand-built components instead of relying on heavy templates</li>
          <li>Focus on performance and user experience</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Purpose</h2>
        <p className="text-gray-600 dark:text-gray-400">
          The purpose of this site is twofold:{" "}
          <span className="font-semibold">to showcase my photography</span> and{" "}
          <span className="font-semibold">
            to sharpen my development skills
          </span>
          . Instead of using pre-built templates, I built the majority of the
          interface myself. This gives me the freedom to experiment with
          architecture, learn best practices, and create something that feels
          personal and intentional.
        </p>
      </section>
    </main>
  );
}
