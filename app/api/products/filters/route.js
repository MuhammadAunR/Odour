import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
    function handleAggregatePipeline(field) {
        return [
            {
                $unwind: `$${field}`,
            },
            {
                $group: {
                    _id: `$${field}`,
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    name: "$_id",
                    count: 1,
                },
            },
            {
                $sort: { name: 1 },
            },
        ];
    }
    try {
        await connectDB()
        const category = await Product.aggregate(
            handleAggregatePipeline('category')
        )
        const fragranceFamily = await Product.aggregate(
            handleAggregatePipeline('fragranceFamily')
        )
        const gender = await Product.aggregate(
            handleAggregatePipeline('gender')
        )
        const attribute = await Product.aggregate(
            handleAggregatePipeline('attribute')
        )
        const season = await Product.aggregate(
            handleAggregatePipeline('season')
        )
        const filters = {
            category,
            fragranceFamily,
            gender,
            attribute,
            season,
        };
        return NextResponse.json(
            { message: 'Filter request sucessfull', filters },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to get filters', error: error.message },
            { status: 404 }
        )
    }
}