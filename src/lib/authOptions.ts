import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { addUser, validateUser, getUserOrExpire } from "@/lib/userStorage";
import type { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

interface MyJWT extends JWT {
  username?: string;
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

        if (credentials.mode === "register") {
          try {
            await addUser(credentials.username, credentials.password);
            return { id: credentials.username, username: credentials.username };
          } catch {
            return null;
          }
        }

        if (credentials.mode === "login") {
          const validUser = await validateUser(
            credentials.username,
            credentials.password
          );
          if (validUser)
            return { id: validUser.username, username: validUser.username };
        }

        return null;
      },
    }),
  ],

  session: { strategy: "jwt" },
  pages: { signIn: "/login" },

  callbacks: {
    async jwt({ token, user }: { token: MyJWT; user?: { username?: string } }) {
      if (user?.username) token.username = user.username;
      return token;
    },

    async session({ session, token }: { session: Session; token: MyJWT }) {
      if (!token.username) return session;

      const existingUser = await getUserOrExpire(token.username);
      if (!existingUser) {
        return {
          ...session,
          user: {
            ...session.user,
            username: null,
            name: null,
            expired: true,
          },
        };
      }

      return {
        ...session,
        user: {
          ...session.user,
          name: existingUser.username,
          username: existingUser.username,
        },
      };
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
