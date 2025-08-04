"use client";

import { useEffect } from "react";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";

export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  useEffect(() => {
    document.documentElement.classList.add("ready");
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
