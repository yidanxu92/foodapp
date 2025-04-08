// app/lib/auth.ts

import { NextAuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
import { User } from "@/app/models/User";
import bcryptjs from 'bcryptjs';
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/libs/mongoConnect";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { randomUUID } from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";

const adapter = MongoDBAdapter(clientPromise);
const session = {
  strategy: "jwt" as SessionStrategy,
  maxAge: 30 * 24 * 60 * 60
};

export default function getAuthConfig() {
  return {
    secret: process.env.SECRET,
    adapter: adapter,
    session: session,
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      CredentialsProvider({
        name: 'Credentials',
        id: 'credentials',
        credentials: {
          email: { label: "Email", type: "email", placeholder: "test@example.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          try {
            const email = credentials!.email;
            const password = credentials!.password;

            mongoose.connect(process.env.MONGODB_URI!);
            const user = await User.findOne({ email });

            if (!user) {
              throw new Error('User not found');
            }

            const passwordOk = user && bcryptjs.compareSync(password, user.password);
            if (!passwordOk) {
              throw new Error('Incorrect password');
            }
            return user;
          } catch (error) {
            console.error('Authorization error:', error);
            return null;
          }
        }
      })
    ],
    callbacks: {
      async jwt({ token, trigger, session, user }: any) {
        if (trigger === "update" && session.user.name) {
          token.name = session.user.name
        }
        if (trigger === "update" && session.user.image) {
          token.picture = session.user.image
        }
        return token
      },
      async session({ session, token }: any) {
        session.user = { name: token.name, email: token.email, image: token.picture };
        return session;
      },
      async signIn({ user, account }: any) {
        // Manually create session for credentials login user
        if (account.provider === "credentials") {
          if (user && "id" in user && adapter?.createSession) {
            const sessionToken = randomUUID();
            const sessionExpiry = new Date(Date.now() + session.maxAge * 1000);

            await adapter.createSession({
              sessionToken: sessionToken,
              userId: user.id,
              expires: sessionExpiry
            });
          }
        }
        return true;
      }
    }
  };
}

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) return false;
  const user = await User.findOne({ email: userEmail });
  if (!user) return false;
  return user.isAdmin;
}
