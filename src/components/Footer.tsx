import React from "react";
import { SiGithub, SiLinkedin, SiInstagram } from "react-icons/si";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer
      className="w-full py-6 px-8 mt-12 border-t border-purple-300 dark:border-purple-800 
             text-center text-sm text-gray-600 dark:text-gray-400 
             shadow-[0_-4px_12px_rgba(168,85,247,0.3)] dark:shadow-[0_-4px_12px_rgba(107,33,168,0.4)]"
    >
      <div className="flex justify-center space-x-4 mb-2 text-xl">
        <a
          href="https://github.com/miikamoii"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black dark:hover:text-white transition-colors"
          aria-label="GitHub"
        >
          <SiGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/miika-moilanen-97517b252"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          aria-label="LinkedIn"
        >
          <SiLinkedin />
        </a>
        <a
          href="mailto:miimoi@hotmail.com"
          className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
          aria-label="Email"
        >
          <MdEmail />
        </a>
        <a
          href="https://www.instagram.com/miikamoi"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
          aria-label="Instagram"
        >
          <SiInstagram />
        </a>
      </div>

      <div>
        &copy; {new Date().getFullYear()} Miika Moilanen. All rights reserved.
      </div>
    </footer>
  );
}
