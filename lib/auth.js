import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "./mongodb";
import Users from "@/models/Users";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { signIn } from "next-auth/react";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials) {
                await connectDB();

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!emailRegex.test(credentials.email)) {
                    throw new Error("Invalid email");
                }

                const user = await Users.findOne({ email: credentials.email })
                if (!user) {
                    throw new Error("User not found");
                }

                const isMatch = await bcrypt.compare(credentials.password, user.password)
                if (!isMatch) {
                    throw new Error("Incorrect password");
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async signIn({ user, account }) {
            await connectDB()
            if (account.provider === 'google') {
                const dbUser = await Users.findOne({ email: user.email })
                if (!dbUser) {
                    return "/signin?error=AccountNotRegistered"
                }
            }
            return true
        },
        async jwt({ token, user }) {

            if (user) {
                const dbUser = await Users.findOne({ email: user.email })
                token.id = user.id
                token.role = user.role || dbUser.role
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id
                session.user.role = token.role
            }
            return session
        }

    },
    pages: {
        signIn: '/signin'
    }
};