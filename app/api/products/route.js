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

export async function GET(params) {
  try {
    const { limit } = await params
    console.log(limit)
    await connectDB()
    const products = await Product.find()
    return NextResponse.json(
      products,
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

