import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { adminDb } from "./FirebaseAdminConnections";

export const AuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials!;

        const userRef = adminDb.collection("users").where("email", "==", email);

        const userDoc = await userRef.get();

        if (userDoc.empty) return null;

        const user = userDoc.docs[0].data();

        if (!("passwordHash" in user)) throw new Error("OtherProvider");

        const hashedPassword = await bcrypt.compare(
          password,
          user.passwordHash
        );

        if (!hashedPassword) return null;

        return {
          id: userDoc.docs[0].id,
          email: user.email,
          name: user.name,
          image: user.image,
          subscription: user.subscription,
        };

        return null;
      },
    }),
  ],
  adapter: FirestoreAdapter(adminDb),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.subscription = user.subscription;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.subscription = token.subscription;
      }
      return session;
    },
    async signIn({ user }) {
      if (user) {
        const userRef = await adminDb.collection("users").doc(user.id).get();

        const updateUse: {
          createdAt?: Date;
          subscription?: string;
        } = {};
        if (!userRef.data()?.createdAt) updateUse.createdAt = new Date();
        if (!userRef.data()?.subscription) updateUse.subscription = "free";

        if (updateUse.createdAt || updateUse.subscription) {
          await adminDb
            .collection("users")
            .doc(user.id)
            .update(updateUse)
            .catch((error) => {
              console.log("[FIREBASE ADMIN] Error updating user", error);
            });
        }

        return true;
      }
      return false;
    },
    redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
    error: "/login",
  },
};
