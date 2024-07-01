// src/types/next-auth.d.ts

import NextAuth, { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken?: string;
      id?: string;
    } & DefaultSession["user"];
  }

  interface User {
    accessToken?: string;
  }

  interface JWT extends DefaultJWT {
    accessToken?: string;
  }
}
