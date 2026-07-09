import { connectDB } from "@/lib/mongodb";
import Users from "@/models/Users";
import bcrypt from 'bcryptjs'
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { email, password } = await request.json()

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { message: 'Invalid email address' },
                { status: 400 }
            )
        }

        await connectDB()

        const user = await Users.findOne({ email })
        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            )
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return NextResponse.json(
                { message: 'Incorrect password' },
                { status: 401 }
            )
        }
        return NextResponse.json(
            { message: 'Signed in successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}