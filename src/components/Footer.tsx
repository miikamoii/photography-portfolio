import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-4 px-8 text-center border-t border-gray-200 dark:border-gray-800 mt-8">
      <span>
        &copy; {new Date().getFullYear()} Photography Portfolio. All rights
        reserved.
      </span>
    </footer>
  );
}
