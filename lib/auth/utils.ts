import { db } from "@/lib/db";
import { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      key: string;
    };
  }
}

declare module "next-auth" {
  interface User {
    id: string;
    key: string;
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
          key: user.key,
        };
      };
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          key: token.key,
        }
      }
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      type: "credentials",
      credentials: {
        key: { label: "Key", type: "password", placeholder: "XXXX-XXXX-XXXX-XXXX" },
      },
      async authorize(credentials) {
        const user = await db.user.findUnique({
          where: { key: credentials?.key }
        })
        if (user) return user;
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 86400,
  },
  debug: process.env.NODE_ENV === "development",
};