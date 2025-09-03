"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "./Navbar";
import { Session } from "next-auth";

interface NavbarWrapperProps {
  session: Session | null;
}

export default function NavbarWrapper({ session }: NavbarWrapperProps) {
  return (
    <SessionProvider session={session}>
      <Navbar />
    </SessionProvider>
  );
}
