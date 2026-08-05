import { connectDB } from "@/lib/mongodb";
import { generateSLUG } from "@/lib/productUtils";
import FragranceFamily from "@/models/FragranceFamily";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
    try {
        await connectDB()

        const { id } = await params
        const body = await req.json()

        const existing = await FragranceFamily.findOne({
            name: body.name,
            _id: { $ne: id },
        });

        if (existing) {
            return NextResponse.json(
                { message: "Fragrance family already exist", existing },
                { status: 409 }
            );
        }

        const updatedBody = { ...body }
        if (body.name) {
            updatedBody.slug = generateSLUG(body.name)
        }

        const updated = await FragranceFamily.findByIdAndUpdate(
            id,
            updatedBody,
            {
                returnDocument: 'after',
                runValidators: true,
            },
        );

        if (!updated) {
            return NextResponse.json(
                { message: "Fragrance family not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { message: 'Fragrance family updated successfully', updated },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to update Fragrance family', error: error.message },
            { status: 400 }
        )
    }
}

export async function GET(_, { params }) {
    try {
        await connectDB()
        const { id } = await params

        const data = await FragranceFamily.findById(id)

        if (!data) {
            return NextResponse.json(
                { message: 'Fragrance family not found' },
                { status: 404 }
            )
        }
        return NextResponse.json(
            { message: 'Successfully fetched Fragrance family', data },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to fetch Fragrance family', error: error.message },
            { status: 404 }
        )
    }
}

export async function DELETE(_, { params }) {
    try {
        await connectDB()
        const { id } = await params

        const deleted = await FragranceFamily.findByIdAndDelete(id)

        if (!deleted) {
            return NextResponse.json(
                { message: 'Fragrance family not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { message: 'Fragrance family deleted successfully' },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to delete Fragrance family', error: error.message },
            { status: 400 }
        )
    }
}