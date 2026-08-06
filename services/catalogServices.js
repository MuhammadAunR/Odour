export async function getCatalogDetails() {
    const res = await fetch('/api/catalog', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (!res.ok) {
        console.error('Failed to fetch catalog details')
    }
    return res.json()
}