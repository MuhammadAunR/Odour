import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'
import Users from '@/models/Users'

export async function POST(request) {
    try {
        const { name, email, password } = await request.json()

        await connectDB()

        const existingUser = await Users.findOne({ email })

        if (existingUser) {
            return NextResponse.json(
                { message: 'User already exists' },
                { status: 400 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await Users.create({
            name,
            email,
            password: hashedPassword,
        })

        return NextResponse.json(
            { message: 'User created successfully', user },
            { status: 201 }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: 'Something went wrong, request failed.' },
            { status: 500 }
        )
    }
}