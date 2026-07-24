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
        const categories = await Product.aggregate(
            handleAggregatePipeline('category')
        )
        const fragranceFamilies = await Product.aggregate(
            handleAggregatePipeline('fragranceFamily')
        )
        const gender = await Product.aggregate(
            handleAggregatePipeline('gender')
        )
        const attributes = await Product.aggregate(
            handleAggregatePipeline('attribute')
        )
        const seasons = await Product.aggregate(
            handleAggregatePipeline('season')
        )
        const filters = {
            categories,
            fragranceFamilies,
            gender,
            attributes,
            seasons,
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