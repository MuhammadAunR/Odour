import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(request) {
    try {
        await connectDB()

        const { searchParams } = new URL(request.url)

        const category = searchParams.get('category')
        const brand = searchParams.get('brand')
        const fragranceFamily = searchParams.get('fragranceFamily')
        const concentration = searchParams.get('concentration')
        const season = searchParams.get('season')
        const isOnSale = searchParams.get('isOnSale')
        const tags = searchParams.get('tags')
        const minPrice = searchParams.get('minPrice')
        const maxPrice = searchParams.get('maxPrice')
        const sort = searchParams.get('sort') || 'id_asc'
        const page = parseInt(searchParams.get('page')) || 1
        const limit = parseInt(searchParams.get('limit')) || 12

        const filter = {}
        if (category) filter.category = category
        if (brand) filter.brand = brand
        if (fragranceFamily) filter.fragranceFamily = fragranceFamily
        if (concentration) filter.concentration = concentration
        if (season) filter.season = { $in: [season] }
        if (isOnSale) filter.isOnSale = isOnSale === 'true'
        if (tags) filter.tags = { $in: [tags] }
        if (minPrice || maxPrice) {
            filter.price = {}
            if (minPrice) filter.price.$gte = parseInt(minPrice)
            if (maxPrice) filter.price.$lte = parseInt(maxPrice)
        }

        const sortMap = {
            'price_asc': { price: 1 },
            'price_desc': { price: -1 },
            'name_asc': { name: 1 },
            'newest': { createdAt: -1 },
            'id_asc': { id: 1 },
        }
        const sortObj = sortMap[sort] || { id: 1 }

        const skip = (page - 1) * limit
        const total = await Product.countDocuments(filter)

        const products = await Product.find(filter)
            .sort(sortObj)
            .skip(skip)
            .limit(limit)

        return Response.json({
            total,
            page,
            totalPages: Math.ceil(total / limit),
            products,
        })
    } catch (error) {
        return Response.json(
            { message: 'Failed to get products' },
            { status: 404 }
        )
    }
}
