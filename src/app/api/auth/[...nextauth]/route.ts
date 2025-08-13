import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  addGuest,
  validateGuest,
  guestStorage,
  MAX_GUESTS,
} from "@/lib/guestStorage";

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
            if (guestStorage.size >= MAX_GUESTS) {
              throw new Error("Maximum number of guest users reached");
            }
            await addGuest(credentials.username, credentials.password);
            return { id: credentials.username, name: credentials.username };
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
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
