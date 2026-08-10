import { connectDB } from "@/lib/mongodb";
import { generateSLUG, handleAggregatePipeline } from "@/lib/productUtils";
import FragranceFamily from "@/models/FragranceFamily";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB()

        const { name, isActive } = await req.json()
        const slug = generateSLUG(name)

        const existing = await FragranceFamily.findOne({ name })
        if (existing) {
            return NextResponse.json(
                { message: 'Fragrance family already exists', existing },
                { status: 409 }
            )
        }

        const data = await FragranceFamily.create({
            name,
            slug,
            isActive,
        })
        return NextResponse.json(
            { message: 'Fragrance family added successfully', data },
            { status: 201 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to add Fragrance family', error: error.message },
            { status: 400 }
        )
    }
}

export async function GET() {
    try {
        await connectDB()
        const data = await FragranceFamily.aggregate(
            handleAggregatePipeline("products", "fragranceFamily")
        );

        if (data.length === 0) {
            return NextResponse.json(
                { message: 'Fragrance familes not found', data },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { message: 'Successfully fetched Fragrance families', data },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to fetch Fragrance families', error: error.message },
            { status: 400 }
        )
    }
}