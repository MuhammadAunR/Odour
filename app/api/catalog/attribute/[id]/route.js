import { connectDB } from "@/lib/mongodb";
import { generateSLUG } from "@/lib/productUtils";
import Attribute from "@/models/Attribute";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
    try {
        await connectDB()

        const { id } = await params
        const body = await req.json()

        const existing = await Attribute.findOne({
            name: body.name,
            _id: { $ne: id },
        });

        if (existing) {
            return NextResponse.json(
                { message: "Attribute already exist", existing },
                { status: 409 }
            );
        }

        const updatedBody = { ...body }
        if (body.name) {
            updatedBody.slug = generateSLUG(body.name)
        }

        const updated = await Attribute.findByIdAndUpdate(
            id,
            updatedBody,
            {
                returnDocument: 'after',
                runValidators: true,
            },
        );

        if (!updated) {
            return NextResponse.json(
                { message: "Attribute not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { message: 'Attribute updated successfully', updated },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to update Attribute', error: error.message },
            { status: 400 }
        )
    }
}

export async function GET(_, { params }) {
    try {
        await connectDB()
        const { id } = await params

        const data = await Attribute.findById(id)

        if (!data) {
            return NextResponse.json(
                { message: 'Attribute not found' },
                { status: 404 }
            )
        }
        return NextResponse.json(
            { message: 'Successfully fetched Attribute', data },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to fetch Attribute', error: error.message },
            { status: 404 }
        )
    }
}

export async function DELETE(_, { params }) {
    try {
        await connectDB()
        const { id } = await params

        const deleted = await Attribute.findByIdAndDelete(id)

        if (!deleted) {
            return NextResponse.json(
                { message: 'Attribute not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { message: 'Attribute deleted successfully' },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to delete Attribute', error: error.message },
            { status: 400 }
        )
    }
}