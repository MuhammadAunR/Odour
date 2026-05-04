import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
    try {
        await connectDB()

        const [gender, brand, concentration, season, fragranceFamily] = await Promise.all([
            Product.aggregate([
                { $group: { _id: "$gender", count: { $sum: 1 } } }
            ]),
            Product.aggregate([
                { $group: { _id: "$brand", count: { $sum: 1 } } }
            ]),
            Product.aggregate([
                { $group: { _id: "$concentration", count: { $sum: 1 } } }
            ]),
            Product.aggregate([
                { $unwind: "$season" },              
                { $group: { _id: "$season", count: { $sum: 1 } } }
            ]),
            Product.aggregate([
                { $group: { _id: "$fragranceFamily", count: { $sum: 1 } } }  
            ]),
        ])

        return Response.json({
            gender,
            brand,
            concentration,
            season,
            fragranceFamily,
        })
    } catch (error) {
        return Response.json({
            message: 'Failed to get item count per filter.',
            status: 404,
        })
    }
}