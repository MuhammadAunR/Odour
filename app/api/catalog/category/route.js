import { connectDB } from "@/lib/mongodb";
import { generateSLUG } from "@/lib/productUtils";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB()

        const { name, isActive, sortOrder } = await req.json()
        const slug = generateSLUG(name)

        const existing = await Category.findOne({ name })
        if (existing) {
            return NextResponse.json(
                { message: 'Category already exists', existing },
                { status: 400 }
            )
        }

        const category = await Category.create({
            name,
            slug,
            isActive,
            sortOrder,
        })
        return NextResponse.json(
            { message: 'Category added successfully', category },
            { status: 201 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to add Category', error: error.message },
            { status: 400 }
        )
    }
}

export async function GET() {
    try {
        await connectDB()

        const data = await Category.find()

        if (data.length === 0) {
            return NextResponse.json(
                { message: 'Categories not found', data },
                { status: 404 }
            )
        }
        return NextResponse.json(
            { message: 'Successfully fetched categories', data },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to fetch Categories', error: error.message },
            { status: 404 }
        )
    }
}
