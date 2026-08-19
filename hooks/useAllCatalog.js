'use client'

import { useCallback, useState } from "react"

export function useAllCatalog() {
    const [catalog, setCatalog] = useState({
        category: [],
        attribute: [],
        fragranceFamily: [],
        season: [],
        gender: [],
    })

    const getCatalog = useCallback(async () => {
        const types = [
            "category",
            "attribute",
            "fragrance-family",
            "season",
            "gender",
        ]
        const responses = await Promise.all(
            types.map(type => fetch(`/api/catalog/${type}`))
        )
        const data = await Promise.all(
            responses.map(res => res.json())
        )
        setCatalog({
            category: data[0].data,
            attribute: data[1].data,
            fragranceFamily: data[2].data,
            season: data[3].data,
            gender: data[4].data,
        })
    },
        [],
    )

    return {
        catalog,
        getCatalog,
    }
}