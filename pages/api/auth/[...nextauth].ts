import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import MongoClientPromise from "../../../lib/mongodb";

import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/models/User";
import { compare } from "bcryptjs";
import { mongooseConnect } from "@/lib/mongoose";

const THIRTY_DAYS = 30 * 24 * 60 * 60;
const THIRTY_MINUTES = 30 * 60;

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: THIRTY_DAYS,
    updateAge: THIRTY_MINUTES,
  },
  adapter: MongoDBAdapter(MongoClientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      credentials: {},
      async authorize(credentials, req) {
        await mongooseConnect();
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!email || !password) return null;
        const validUser = await User.findOne({ email });
        const checkPassword = await compare(password, validUser.password);
        if (checkPassword)
          return {
            id: validUser._id,
            email,
            name: validUser.name,
          };
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
