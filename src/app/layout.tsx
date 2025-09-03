import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import ThemeProvider from "@/theme/ThemeProvider";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "photoCode_Portfolio",
  description: "Photography/coding portfolio created by Moilanen Miika",
  authors: [{ name: "Moilanen Miika" }],
  keywords: [
    "portfolio",
    "photoCode",
    "photography",
    "creative coding",
    "fullstack development",
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#ffffffcf]`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavbarWrapper session={session} />
          <main className="px-4 sm:px-8 max-w-5xl mx-auto">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
