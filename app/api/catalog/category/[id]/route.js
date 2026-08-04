import { connectDB } from "@/lib/mongodb";
import { generateSLUG } from "@/lib/productUtils";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
    try {
        await connectDB()

        const { id } = await params
        const body = await req.json()

        const existing = await Category.findOne({
            name: body.name,
            _id: { $ne: id },
        });

        if (existing) {
            return NextResponse.json(
                { message: "Category already exist", existing },
                { status: 409 }
            );
        }

        const updatedBody = { ...body }
        if (body.name) {
            updatedBody.slug = generateSLUG(body.name)
        }

        const updated = await Category.findByIdAndUpdate(
            id,
            updatedBody,
            {
                returnDocument: 'after',
                runValidators: true,
            },
        );

        if (!updated) {
            return NextResponse.json(
                { message: "Category not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { message: 'Category updated successfully', updated },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to update', error: error.message },
            { status: 400 }
        )
    }
}

export async function GET(req, { params }) {
    try {
        await connectDB()
        const { id } = await params

        const data = await Category.findById(id)

        if (!data) {
            return NextResponse.json(
                { message: 'Category not found' },
                { status: 404 }
            )
        }
        return NextResponse.json(
            { message: 'Successfully fetched category', data },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to fetch Category', error: error.message },
            { status: 404 }
        )
    }
}

export async function DELETE(req, { params }) {
    try {
        await connectDB()
        const { id } = await params

        const deleted = await Category.findByIdAndDelete(id)

        if (!deleted) {
            return NextResponse.json(
                { message: 'Category not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { message: 'Category deleted successfully' },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to delete Category', error: error.message },
            { status: 400 }
        )
    }
}