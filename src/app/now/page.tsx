// src/app/now/page.tsx
import React from "react";

export const metadata = {
  title: "Now – Miika Moilanen",
  description: "What I'm currently focused on.",
};

export default function NowPage() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
        What I&#39;m Doing Now
      </h1>

      <p className="text-gray-700 dark:text-gray-300 mb-6">
        This page is inspired by{" "}
        <a
          href="https://nownownow.com/about"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-black dark:hover:text-white"
        >
          nownownow.com
        </a>
        — a public declaration of what I&#39;m focused on at this moment.
      </p>

      <div className="space-y-6 leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold mb-1">👨‍💻 Coding Focus</h2>
          <ul className="text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1">
            <li>
              Building out portfolio features (auth, tagging, lightbox, etc.)
            </li>
            <li>Practicing TypeScript and React component architecture</li>
            <li>Learning backend logic with Next.js server actions & APIs</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-1">📚 Currently Learning</h2>
          <ul className="text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1">
            <li>Next.js 14 full-stack features</li>
            <li>Design patterns & testing best practices</li>
            <li>Authentication and secure API design</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-1">📸 Photography</h2>
          <ul className="text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1">
            <li>Going through the pictures of my last trip to Japan</li>
            <li>Exploring auto-tagging + AI sorting tools</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-1">💪 Personal Goals</h2>
          <ul className=" text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1">
            <li>Polishing this portfolio for developer job applications</li>
            <li>Staying consistent with daily focused learning</li>
            <li>Finding inspiration through building, not just consuming</li>
          </ul>
        </div>
      </div>

      <p className="text-sm mt-10 text-gray-500">Last updated: August 2025</p>
    </section>
  );
}
