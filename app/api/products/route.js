import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB()
    const body = await req.json()

    const slug = body.productName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

    const generateSKU = (category) => {
      const prefixMap = {
        Perfume: "PERF",
        Attar: "ATT",
        Tester: "TEST",
        Deodorant: "DEO",
      };

      const prefix = prefixMap[category] || "SCE";

      return `${prefix}-${Date.now()}`;
    };
    const genSKU = generateSKU(body.category)

    const product = await Product.create({
      name: body.productName,
      slug: slug,
      description: body.description,

      sku: genSKU,

      category: body.category,
      attribute: body.attribute,
      gender: body.gender,
      season: body.season,
      fragranceFamily: body.fragranceFamily,

      images: body.images,

      variants: body.variants,

      defaultPrice: body.variants[0].originalPrice,

      defaultSalePrice:
        body.variants[0].salePrice || null,
    })
    console.log('Here')

    return NextResponse.json(
      { message: 'Product Saved', product },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to save product', error },
      { status: 400 }
    )
  }
}

