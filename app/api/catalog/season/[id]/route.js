import { connectDB } from "@/lib/mongodb";
import { generateSLUG } from "@/lib/productUtils";
import Season from "@/models/Season";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
    try {
        await connectDB()
        const body = await req.json()
        const { id } = await params

        const existing = await Season.findOne({
            name: body.name,
            _id: { $ne: id },
        })

        if (existing) {
            return NextResponse.json(
                { message: "Season already exist", existing },
                { status: 409 }
            );
        }

        const updatedBody = { ...body }

        if (body.name) {
            updatedBody.slug = generateSLUG(body.name)
        }

        const updated = await Season.findByIdAndUpdate(
            id,
            updatedBody,
            {
                returnDocument: 'after',
                runValidators: true

            }
        )
        if (!updated) {
            return NextResponse.json(
                { message: "Season not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Season updated successsfully', updated },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to update season', error: error.message },
            { status: 500 }
        )
    }
}

export async function GET(_, { params }) {
    try {
        await connectDB()

        const { id } = await params
        const data = await Season.findById(id)

        return NextResponse.json(
            { message: 'Successfully fetched season', data },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to fetch season', error: error.message },
            { status: 400 }
        )
    }
}

export async function DELETE(_, { params }) {
    try {
        await connectDB()

        const { id } = await params
        const deleted = await Season.findByIdAndDelete(id)
        if (!deleted) {
            return NextResponse.json(
                { message: 'Season not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { message: 'Season deleted successfully' },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to delete season', error: error.message },
            { status: 500 }
        )
    }
}
