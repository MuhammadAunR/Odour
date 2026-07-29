'use client'

import { SimpleLoader } from "@/components/admin/AuthPagesCompos"
import { cleanParams } from "@/lib/productUtils"
import { useSearchParams } from "next/navigation"
import { createContext, Suspense, useContext, useEffect, useState } from "react"

export const ContextProvider = createContext()
export const useAdminProducts = () => useContext(ContextProvider)

import React from 'react'

const AdminProductContextInner = ({ children }) => {

    const searchParams = useSearchParams()
    const [products, setProducts] = useState([])
    const [filters, setFilters] = useState([])
    const [loading, setLoading] = useState(false)

    const queryParams = {
        page: Number(searchParams.get("page")) || 1,
        limit: Number(searchParams.get("limit")) || 12,
        gender: searchParams.get("gender") || "",
        attribute: searchParams.get("attribute") || "",
        category: searchParams.get("category") || "",
        season: searchParams.get("season") || "",
        fragranceFamily: searchParams.get("fragranceFamily") || "",
        search: searchParams.get("search") || "",
        sort: searchParams.get("sort") || "",
    }
    const apiUrl = `/api/products/?${cleanParams(queryParams).toString()}`

    useEffect(() => {
        async function getAllProducts() {
            setLoading(true)
            const res = await fetch(apiUrl, {
                method: 'GET',
                'Conetent-Type': 'application/json'
            })
            if (!res.ok) {
                console.error('Failed to fetch prodcuts')
                return
            }
            const data = await res.json()
            setProducts(data.products)
            setLoading(false)
        }
        getAllProducts()
    }, [apiUrl])

    useEffect(() => {
        async function fetchAvailableFilters() {
            const res = await fetch('/api/products/filters', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await res.json()
            setFilters(data.filters)
        }
        fetchAvailableFilters()
    }, [])

    return (
        <ContextProvider.Provider value={{ products, setProducts, loading, filters, queryParams }}>
            {children}
        </ContextProvider.Provider>
    )
}


export const AdminProductContext = ({ children }) => {
    return (
        <Suspense fallback={<div className="flex items-center justify-center py-20"><SimpleLoader /></div>}>
            <AdminProductContextInner>
                {children}
            </AdminProductContextInner>
        </Suspense>
    )
}

export default AdminProductContext