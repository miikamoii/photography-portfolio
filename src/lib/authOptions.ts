import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { addGuest, validateGuest, getGuestByUsername } from "@/lib/guestStorage";

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

        if (credentials.mode === "register") {
          try {
            await addGuest(credentials.username, credentials.password);
            return { id: credentials.username, name: credentials.username };
          } catch {
            return null;
          }
        }

        if (credentials.mode === "login") {
          const validUser = await validateGuest(
            credentials.username,
            credentials.password
          );
          if (validUser) return { id: validUser.username, name: validUser.username };
        }

        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.name ?? undefined;
      }

      if (token.username) {
        const storedUser = getGuestByUsername(token.username);
        if (!storedUser) {
          return {};
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (!token.username) {
        session.user = { name: null, email: undefined, image: undefined};
      } else {
        session.user = {
          ...session.user,
          name: token.username,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
