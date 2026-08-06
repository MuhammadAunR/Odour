import { connectDB } from "@/lib/mongodb";
import Attribute from "@/models/Attribute";
import Category from "@/models/Category";
import FragranceFamily from "@/models/FragranceFamily";
import Gender from "@/models/Gender";
import Season from "@/models/Season";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB()
        const [categories, genders, seasons, attributes, fragranceFamilies] = await Promise.all([
            Category.countDocuments(),
            Gender.countDocuments(),
            Season.countDocuments(),
            Attribute.countDocuments(),
            FragranceFamily.countDocuments(),
        ])
        const data = {
            category: categories,
            gender: genders,
            season: seasons,
            attribute: attributes,
            fragranceFamily: fragranceFamilies,
        }
        return NextResponse.json(
            {
                message: 'Successfully fetched all catalogs',
                data,
            },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to get Catalog', error: error.message },
            { status: 400 }
        )
    }
}