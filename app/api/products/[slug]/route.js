import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        await connectDB();

        const { slug } = await params;

        const product = await Product.findOne({ slug });

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json(
            { message: "Product Not Found" },
            { status: 404 }
        );
    }
}