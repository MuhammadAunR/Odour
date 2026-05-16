'use client'
import { filter } from 'motion/react-client'
import React, { useEffect, useState } from 'react'
import { createContext, useContext } from "react"

export const ContextProvider = createContext()
export const useProducts = () => useContext(ContextProvider)


const ProductContext = ({ children }) => {

    const [apiResponse, setApiResponse] = useState({})
    const [products, setProducts] = useState([])


    useEffect(() => {
        async function fetchAllProducts() {
            try {
                const res = await fetch('/api/products?limit=12')
                const data = await res.json()
                console.log('Raw data', data)
                setProducts(data.products)
                setApiResponse(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchAllProducts()
    }, [])

    return (
        <>
            <ContextProvider.Provider value={{ products, apiResponse }}>
                {children}
            </ContextProvider.Provider>
        </>
    )
}

export default ProductContext
