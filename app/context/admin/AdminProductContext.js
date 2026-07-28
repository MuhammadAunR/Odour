'use client'

import { SimpleLoader } from "@/components/admin/AuthPagesCompos"
import { createContext, Suspense, useContext, useEffect, useState } from "react"

export const ContextProvider = createContext()
export const useAdminProducts = () => useContext(ContextProvider)

import React from 'react'

const AdminProductContextInner = ({ children }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getAllProducts() {
            setLoading(true)
            const res = await fetch('/api/products', {
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
    }, [])

    return (
        <ContextProvider.Provider value={{ products, loading }}>
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