import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(request) {
    try {
        await connectDB()

        const { searchParams } = new URL(request.url)

        const gender = searchParams.get('gender')
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
        const search = searchParams.get('search')

        const filter = {}
        if (gender) filter.gender = gender
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
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { brand: { $regex: search, $options: 'i' } },
            ]
        }

        const filterWithoutGender = { ...filter }
        delete filterWithoutGender.gender

        const filterWithoutBrand = { ...filter }
        delete filterWithoutBrand.brand

        const filterWithoutConcentration = { ...filter }
        delete filterWithoutConcentration.concentration

        const filterWithoutSeason = { ...filter }
        delete filterWithoutSeason.season

        const filterWithoutFragranceFamily = { ...filter }
        delete filterWithoutFragranceFamily.fragranceFamily

        const [gender_count, brand_count, concentration_count, season_count, fragranceFamily_count] = await Promise.all([
            Product.aggregate([
                { $match: filterWithoutGender },
                { $group: { _id: "$gender", count: { $sum: 1 } } }
            ]),
            Product.aggregate([
                { $match: filterWithoutBrand },
                { $group: { _id: "$brand", count: { $sum: 1 } } }
            ]),
            Product.aggregate([
                { $match: filterWithoutConcentration },
                { $group: { _id: "$concentration", count: { $sum: 1 } } }
            ]),
            Product.aggregate([
                { $match: filterWithoutSeason },
                { $unwind: "$season" },
                { $group: { _id: "$season", count: { $sum: 1 } } }
            ]),
            Product.aggregate([
                { $match: filterWithoutFragranceFamily },
                { $group: { _id: "$fragranceFamily", count: { $sum: 1 } } }
            ]),
        ])

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
            gender: gender_count,
            brand: brand_count,
            concentration: concentration_count,
            season: season_count,
            fragranceFamily: fragranceFamily_count,
        })
    } catch (error) {
        return Response.json(
            { message: 'Failed to get products' },
            { status: 404 }
        )
    }
}
