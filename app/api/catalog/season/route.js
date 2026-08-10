import { connectDB } from "@/lib/mongodb";
import { generateSLUG, handleAggregatePipeline } from "@/lib/productUtils";
import Season from "@/models/Season";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB()

        const { name, isActive } = await req.json()
        const slug = generateSLUG(name)

        const existing = await Season.findOne({ name })
        if (existing) {
            return NextResponse.json(
                { message: 'Season already exists', existing },
                { status: 409 }
            )
        }

        const data = await Season.create({
            name,
            slug,
            isActive,
        })
        return NextResponse.json(
            { message: 'Season added successfully', data },
            { status: 201 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to add season', error: error.message },
            { status: 400 }
        )
    }
}

export async function GET() {
    try {
        await connectDB()
        const data = await Season.aggregate(
            handleAggregatePipeline("products", "season")
        );

        if (data.length === 0) {
            return NextResponse.json(
                { message: 'Season not found', data },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { message: 'Successfully fetched seasons', data },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to fetch seasons', error: error.message },
            { status: 400 }
        )
    }
}