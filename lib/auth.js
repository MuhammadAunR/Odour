import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "./mongodb";
import Users from "@/models/Users";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

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

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(credentials.email)) {
                    throw new Error("Invalid email");
                }

                const user = await Users.findOne({ email: credentials.email });
                if (!user) {
                    throw new Error("User not found");
                }
                if (user.provider === 'google') {
                    throw new Error('Please sign in with Google')
                }

                const isMatch = await bcrypt.compare(credentials.password, user.password);
                if (!isMatch) {
                    throw new Error("Incorrect password");
                }

                const cookieStore = await cookies()
                cookieStore.delete('authIntent')

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    provider: user.provider,
                };
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider !== 'google') {
                return true;
            }

            await connectDB();
            const dbUser = await Users.findOne({ email: user.email });
            const cookieStore = await cookies();
            const intent = cookieStore.get('authIntent')?.value;

            if (intent === 'signin') {
                cookieStore.delete('authIntent')
                if (!dbUser) {
                    return "/signin?error=AccountNotRegistered";
                }

                return true;
            }

            if (intent === 'signup') {
                cookieStore.delete('authIntent')
                if (dbUser) {
                    return "/signup?error=AccountAlreadyExists";
                }
                await Users.create({
                    name: user.name,
                    email: user.email,
                    role: 'user',
                    provider: 'google'
                });
                return true;
            }
            cookieStore.delete('authIntent')
            return "/signin?error=InvalidAuthIntent";
        },
        async jwt({ token }) {
            if (token.email) {
                await connectDB()

                const dbUser = await Users.findOne({
                    email: token.email
                })
                if (!dbUser) {
                    throw new Error('Account not found')
                }
                if (dbUser) {
                    token.role = dbUser.role
                    token.id = dbUser.id
                    token.provider = dbUser.provider
                }
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        }
    },
    pages: {
        signIn: '/signin',
    },
};