import { connectDB } from "@/lib/mongodb";
import { generateSLUG, handleAggregatePipeline } from "@/lib/productUtils";
import Attribute from "@/models/Attribute";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB()

        const { name, isActive } = await req.json()
        const slug = generateSLUG(name)

        const existing = await Attribute.findOne({ name })
        if (existing) {
            return NextResponse.json(
                { message: 'Attribute already exists', existing },
                { status: 409 }
            )
        }

        const data = await Attribute.create({
            name,
            slug,
            isActive,
        })
        return NextResponse.json(
            { message: 'Attribute added successfully', data },
            { status: 201 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to add Attribute', error: error.message },
            { status: 400 }
        )
    }
}

export async function GET() {
    try {
        await connectDB()
        const data = await Attribute.aggregate(
            handleAggregatePipeline("products", "attribute")
        );

        if (data.length === 0) {
            return NextResponse.json(
                { message: 'Attributes not found', data },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { message: 'Successfully fetched Attributes', data },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to fetch Attributes', error: error.message },
            { status: 400 }
        )
    }
}