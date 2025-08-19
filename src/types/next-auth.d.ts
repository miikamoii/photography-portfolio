// src/types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      removedOldest?: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    removedOldest?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string;
    removedOldest?: boolean;
  }
}
