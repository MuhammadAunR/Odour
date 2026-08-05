import { connectDB } from "@/lib/mongodb";
import { generateSLUG } from "@/lib/productUtils";
import Gender from "@/models/Gender";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB()

        const { name, isActive } = await req.json()
        const slug = generateSLUG(name)

        const existing = await Gender.findOne({ name })
        if (existing) {
            return NextResponse.json(
                { message: 'Gender already exists', existing },
                { status: 409 }
            )
        }

        const data = await Gender.create({
            name,
            slug,
            isActive,
        })
        return NextResponse.json(
            { message: 'Gender added successfully', data },
            { status: 201 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to add Gender', error: error.message },
            { status: 400 }
        )
    }
}

export async function GET() {
    try {
        await connectDB()
        const data = await Gender.find()

        if (data.length === 0) {
            return NextResponse.json(
                { message: 'Gender not found', data },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { message: 'Successfully fetched Gender', data },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to fetch Gender', error: error.message },
            { status: 400 }
        )
    }
}