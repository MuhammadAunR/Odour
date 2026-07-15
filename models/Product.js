import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema({
    size: {
        type: String,
        required: true,
    },
    originalPrice: {
        type: Number,
        required: true,
    },
    salePrice: {
        type: Number,
        default: null,
    },
    stockQuantity: {
        type: Number,
        required: true,
        default: 0,
    },
}, { _id: false });

const ImageSchema = new mongoose.Schema({
    publicId: String,
    url: String,
}, { _id: false });

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    slug: {
        type: String,
        required: true,
        unique: true,
    },

    description: {
        type: String,
        required: true,
    },

    category: {
        type: [String],
        default: [],
    },

    attribute: {
        type: [String],
        default: [],
    },

    gender: {
        type: [String],
        default: [],
    },

    season: {
        type: [String],
        default: [],
    },

    fragranceFamily: {
        type: [String],
        default: [],
    },

    images: {
        type: [ImageSchema],
        default: [],
    },

    variants: {
        type: [VariantSchema],
        required: true,
        default: [],
    },
    defaultPrice: {
        type: Number,
        required: true,
    },

    defaultSalePrice: {
        type: Number,
        default: null,
    },

}, { timestamps: true });

export default mongoose.models.Product ||
    mongoose.model("Product", ProductSchema);