export function generateSKU(category) {
    const prefixMap = {
        Perfume: "PER",
        Attar: "ATT",
        Tester: "TES",
        Deodorant: "DEO",
    };

    const prefix = prefixMap[category] || "ODU";

    return `${prefix}-${Date.now()}`;
}

export function generateSLUG(name) {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
}