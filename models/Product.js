import mongoose from "mongoose";

const SizeSchema = new mongoose.Schema({
    size:            { type: String, required: true },
    price:           { type: Number, required: true },
    discountedPrice: { type: Number, default: null },
    stock:           { type: Number, required: true, default: 0 },
}, { _id: false })

const ProductSchema = new mongoose.Schema({
    id:              { type: Number, required: true, unique: true },
    slug:            { type: String, required: true, unique: true },
    name:            { type: String, required: true },
    brand:           { type: String, required: true },
    category:        { type: String, required: true, enum: ['Men', 'Women', 'Unisex'] },
    imgSrc:          { type: String, required: true },
    alt:             { type: String, required: true },
    description:     { type: String, required: true },
    tags:            { type: [String], default: [] },

    concentration:   { type: String, required: true, enum: ['Parfum', 'EDP', 'EDT', 'EDC', 'Body Mist'] },
    fragranceFamily: { type: String, required: true, },
    season:          { type: [String], enum: ['Summer', 'Winter', 'Spring', 'Fall'], default: [] },

    isOnSale:        { type: Boolean, default: false },
    price:           { type: Number, required: true },
    discountedPrice: { type: Number, default: null },

    sizes:           { type: [SizeSchema], default: [] },
}, { timestamps: true })

export default mongoose.models.Product || mongoose.model("Product", ProductSchema)