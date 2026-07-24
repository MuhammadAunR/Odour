import { connectDB } from "@/lib/mongodb";
import { generateSKU, generateSLUG } from "@/lib/productUtils";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {

    await connectDB()
    const body = await req.json()

    const product = await Product.create({
      name: body.name,
      slug: generateSLUG(body.name),
      description: body.description,

      sku: generateSKU(body.category),

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

    return NextResponse.json(
      { message: 'Product Saved', product },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to save product',
        error: error.message,
      },
      { status: 400 }
    )
  }
}

export async function GET(req) {
  try {

    const { searchParams } = new URL(req.url)

    const category = searchParams.get("category");
    const fragranceFamily = searchParams.get("fragranceFamily");
    const gender = searchParams.get("gender");
    const season = searchParams.get("season");
    const attribute = searchParams.get("attribute");
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 12;
    const sortBy = searchParams.get("sort");

    const query = {}

    if (category) query.category = category;
    if (fragranceFamily) query.fragranceFamily = fragranceFamily;
    if (gender) query.gender = gender;
    if (season) query.season = season;
    if (attribute) query.attribute = attribute;

    let sort = {}

    if (sortBy === 'price_asc') sort.defaultPrice = 1;
    if (sortBy === 'price_desc') sort.defaultPricef = -1;

    let skip = (page - 1) * limit

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    await connectDB()
    const products = await Product.find(query).sort(sort).skip(skip).limit(limit)

    const data = {
      products,
      totalProducts,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage,
      hasPreviousPage,
    };
    return NextResponse.json(
      data,
      { message: 'Product Fetched Successfully' },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch products", error: error.message },
      { status: 500 },
    );
  }

}

export async function DELETE(req) {
  try {
    await connectDB()
    const { _id } = await req.json()
    const product = await Product.findByIdAndDelete(_id)
    if (!product) {
      return NextResponse.json(
        { message: 'Product Not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { message: 'Product deleted' },
      { status: 200 }
    )

  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to delete product', error: error.message },
      { status: 400 }
    )
  }
}

export async function PUT(req) {
  try {

    await connectDB()
    const body = await req.json()

    const existingProduct = await Product.findById(body._id);
    if (!existingProduct) {
      return NextResponse.json(
        { message: 'Product Not found' },
        { status: 404 }
      )
    }

    const slug =
      existingProduct.name !== body.name ? generateSLUG(body.name) : existingProduct.slug
    const sku =
      existingProduct.category !== body.category ? generateSKU(body.category) : existingProduct.sku


    const updatedProduct = await Product.findByIdAndUpdate(
      body._id,
      {
        name: body.name,
        slug,
        sku,
        description: body.description,
        category: body.category,
        attribute: body.attribute,
        gender: body.gender,
        season: body.season,
        fragranceFamily: body.fragranceFamily,
        images: body.images,
        variants: body.variants,
        defaultPrice: body.variants[0].originalPrice,
        defaultSalePrice: body.variants[0].salePrice || null,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { message: 'Product Not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { message: 'Product Updated', product: updatedProduct, },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to update product', error: error.message },
      { status: 400 }
    )
  }
}

