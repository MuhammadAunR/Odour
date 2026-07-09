import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "./mongodb";
import Users from "@/models/Users";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

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
    pages: {
        signIn: '/signin'
    }
};