import { connectDB } from "@/lib/mongodb";
import { generateSLUG } from "@/lib/productUtils";
import Gender from "@/models/Gender";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
    try {
        await connectDB()
        const body = await req.json()
        const { id } = await params

        const existing = await Gender.findOne({
            name: body.name,
            _id: { $ne: id },
        })

        if (existing) {
            return NextResponse.json(
                { message: "Gender already exist", existing },
                { status: 409 }
            );
        }

        const updatedBody = { ...body }

        if (body.name) {
            updatedBody.slug = generateSLUG(body.name)
        }

        const updated = await Gender.findByIdAndUpdate(
            id,
            updatedBody,
            {
                returnDocument: 'after',
                runValidators: true

            }
        )
        if (!updated) {
            return NextResponse.json(
                { message: "Gender not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { message: 'Gender updated successsfully', updated },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to update Gender', error: error.message },
            { status: 500 }
        )
    }
}

export async function GET(_, { params }) {
    try {
        await connectDB()

        const { id } = await params
        const data = await Gender.findById(id)

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

export async function DELETE(_, { params }) {
    try {
        await connectDB()

        const { id } = await params
        const deleted = await Gender.findByIdAndDelete(id)
        if (!deleted) {
            return NextResponse.json(
                { message: 'Gender not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { message: 'Gender deleted successfully' },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to delete Gender', error: error.message },
            { status: 500 }
        )
    }
}