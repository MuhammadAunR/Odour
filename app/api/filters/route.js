import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {

    try {
        await connectDB()

        const brand = await Product.distinct('brand')
        const gender = await Product.distinct('gender')
        const concentration = await Product.distinct('concentration')
        const season = await Product.distinct('season')
        const fragranceFamily = await Product.distinct('fragranceFamily')

        return Response.json({
            brand,
            gender,
            concentration,
            season,
            fragranceFamily,
        })

    } catch (error) {
        return Response.json({
            message: 'Failed to fetch filter',
            status: 404,
        })
    }

}