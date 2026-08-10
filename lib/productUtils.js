import { nanoid } from "nanoid";

export function generateSKU(category) {
    const prefixMap = {
        Perfume: "PER",
        Attar: "ATT",
        Tester: "TES",
        Deodorant: "DEO",
    };

    const prefix = prefixMap[category] || "ODU";

    return `${prefix}-${nanoid(5).toUpperCase()}`;
}

export function generateSLUG(name) {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
}

export function cleanParams(params) {
    const cleaned = Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== "" && v !== null)
    );
    return new URLSearchParams(cleaned)
}

export function handleAggregatePipeline(collection, field) {
    return [
        {
            $lookup: {
                from: collection,
                localField: "_id",
                foreignField: field,
                as: "products",
            },
        },
        {
            $addFields: {
                productCount: { $size: "$products" },
            },
        },
        {
            $project: {
                products: 0,
            },
        },
        {
            $sort: { name: 1 },
        },
    ];
}