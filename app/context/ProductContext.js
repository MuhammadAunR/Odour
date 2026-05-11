'use client'
import { filter } from 'motion/react-client'
import React, { useEffect, useState } from 'react'
import { createContext, useContext } from "react"

export const ContextProvider = createContext()
export const useProducts = () => useContext(ContextProvider)


const ProductContext = ({ children }) => {

    const [apiResponse, setApiResponse] = useState({})
    const [filters, setFilters] = useState([])
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [queryParams, setQueryParams] = useState({
        page: 1,
        limit: 12,
        gender: '',
        season: '',
        fragranceFamily: '',
        search: '',
        sort: 'id_asc'
    })

    const buildUrl = React.useCallback(() => {
        const cleanParams = Object.fromEntries(
            Object.entries(queryParams).filter(([_, v]) => v !== '' && v !== null)
        )
        const params = new URLSearchParams(cleanParams)
        return `/api/products?${params.toString()}`
    }, [queryParams])

    useEffect(() => {
        setLoading(true)
        async function fetchAllProducts() {
            const res = await fetch(buildUrl())
            const data = await res.json()
            console.log('Raw data',data)
            setProducts(data.products)
            setApiResponse(data)
            setLoading(false)

            const filterTypes = ['gender', 'season', 'fragranceFamily']

            const filters = filterTypes
                .filter(key => Array.isArray(data[key]))
                .map(key => ({
                    title: key === 'fragranceFamily' ? 'Fragrance Family' : key.charAt(0).toUpperCase() + key.slice(1),
                    key: key,
                    options: data[key].map(item => ({
                        value: item._id,
                        count: item.count || 0,
                    }))
                        .sort((a, b) => a.value.localeCompare(b.value))
                }))
            setFilters(filters)
        }

        fetchAllProducts()
    }, [queryParams])

    return (
        <>
            <ContextProvider.Provider value={{ products, loading, apiResponse, filters, queryParams, setQueryParams }}>
                {children}
            </ContextProvider.Provider>
        </>
    )
}

export default ProductContext
