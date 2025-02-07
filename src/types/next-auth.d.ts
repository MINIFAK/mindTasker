import NextAuth, { DefaultSession, DefaultUser, JWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      subscription: string;
      image: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    subscription: string;
    image: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    subscription: string;
    image: string | null;
  }
}
