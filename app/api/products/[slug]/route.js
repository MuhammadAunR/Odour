import { connectDB } from "@/lib/mongodb"
import Product from "@/models/Product"


export async function GET(req, { params }) {
    try {
        await connectDB()
        const { slug } = await params
        const product = await Product.findOne({ slug })
        return Response.json(product)
    } catch (error) {
        return Response.json(
            { message: 'Product Not Found' },
            { status: 404 }
        )
    }
}