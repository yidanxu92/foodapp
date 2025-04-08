import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";
import { z } from "zod";
import rateLimit from "@/libs/rateLimit";
import mongoose from "mongoose";
import { User } from "@/app/models/User";
import bcryptjs from 'bcryptjs';

// Initialize MongoDB adapter for NextAuth
const adapter = MongoDBAdapter(clientPromise);

const passwordSchema = z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/).regex(/[!@#$%^&*]/);
const loginRateLimit = rateLimit(5, 60 * 1000);

// NextAuth configuration options
export const authOptions: NextAuthOptions = {
  adapter,
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    // Credentials-based authentication
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        try{
          passwordSchema.parse(credentials.password);
        }catch(error){
          throw new Error("The password must contain at least one uppercase letter, one number, and one special character");
        }

        if (loginRateLimit.check(credentials.email)) {
          throw new Error("Too many login attempts. Please wait a minute before trying again.");
        }

        try {
          // Connect to MongoDB before querying
          if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI!);
          }
          
          // Find user by email
          const user = await User.findOne({ email: credentials.email });
          // Verify password using bcryptjs
          const isValid = await bcryptjs.compare(credentials.password, user.password);
          if (!user || !isValid) {
            throw new Error("Invalid email or password.");
          }

          // Return user details for session
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("authentication error:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt", // Use JSON Web Tokens for session management
    maxAge: 30 * 60, // Session expiration time set to 30 minutes
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret for signing tokens
  debug: process.env.NODE_ENV === 'development', // Enable debug mode in development
  pages: {
    signIn: '/login', // Custom login page
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user ID to the token if user is authenticated
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach user ID from token to session
      if (session.user && token) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log("Sign in callback:", { user, account, profile });
      return true;
    },
  }
}; 