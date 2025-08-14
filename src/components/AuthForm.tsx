"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AuthForm() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fading, setFading] = useState(false);
  const [callbackUrl, setCallbackUrl] = useState("/");

  useEffect(() => {
    const lastVisited = sessionStorage.getItem("lastVisited");
    if (lastVisited) setCallbackUrl(lastVisited);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      username,
      password,
      mode,
      redirect: true,
      callbackUrl,
    });

    if (res?.error) {
      setError(res.error);
    }
  }

  function handleToggle() {
    if (fading) return;
    setFading(true);

    const fadeOutMs = 180;
    const totalMs = 360;

    setTimeout(() => {
      setMode((m) => (m === "login" ? "register" : "login"));
    }, fadeOutMs);

    setTimeout(() => setFading(false), totalMs);
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={false}
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.18, ease: "easeInOut" }}
      className="
        bg-gray-50 dark:bg-gray-800 
        border border-gray-200 dark:border-gray-700
        shadow-lg 
        rounded-xl 
        p-8 
        max-w-md 
        w-full 
        transition-colors duration-300
      "
      style={{ willChange: "opacity" }}
    >
      <h1 className="text-3xl font-extrabold mb-6 text-purple-600 dark:text-purple-400 text-center">
        {mode === "login" ? "Guest Login" : "Register Guest Account"}
      </h1>

      <div className={fading ? "pointer-events-none" : ""}>
        <input
          type="text"
          placeholder="Username"
          className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-3 w-full mb-5 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          disabled={fading}
        />

        <input
          type="password"
          placeholder="Password"
          className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-3 w-full mb-5 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          disabled={fading}
        />

        {error && (
          <p className="text-red-500 mb-5 font-semibold text-center">{error}</p>
        )}

        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold py-3 rounded-md w-full mb-6 shadow-md"
          disabled={fading}
        >
          {mode === "login" ? "Login" : "Register"}
        </button>

        <p className="text-center text-gray-600 dark:text-gray-400">
          {mode === "login" ? "No account?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="text-purple-600 dark:text-purple-400 underline hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
            onClick={handleToggle}
            disabled={fading}
          >
            {mode === "login" ? "Register here" : "Login here"}
          </button>
        </p>
      </div>
    </motion.form>
  );
}
