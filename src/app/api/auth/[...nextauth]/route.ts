// src\app\api\auth\[...nextauth]\route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { addGuest, validateGuest } from "@/lib/guestStorage";

declare module "next-auth" {
  interface Session {
    removedOldest?: boolean;
  }
  interface User {
    removedOldest?: boolean;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    removedOldest?: boolean;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Guest Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        mode: { label: "Mode", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        try {
          if (credentials.mode === "register") {
            const removedOldest = await addGuest(
              credentials.username,
              credentials.password
            );

            return {
              id: credentials.username,
              name: credentials.username,
              removedOldest,
            };
          }

          if (credentials.mode === "login") {
            const validUser = await validateGuest(
              credentials.username,
              credentials.password
            );
            if (validUser) {
              return { id: validUser.username, name: validUser.username };
            }
            return null;
          }
        } catch (err) {
          throw new Error(err instanceof Error ? err.message : "Error");
        }

        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.removedOldest = user.removedOldest ?? false;
      return token;
    },
    async session({ session, token }) {
      session.removedOldest = token.removedOldest ?? false;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
