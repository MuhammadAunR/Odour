'use client'

import { createContext, useContext, useState } from "react"

export const ContextProvider = createContext()
export const useWishlist = () => useContext(ContextProvider)

import React from 'react'
import { toast } from "react-toastify"

const WishlistContext = ({ children }) => {
    const [wishListItems, setWishListItems] = useState([])
    const [wishListed, setWishListed] = useState(false)

    const handleAddToWishList = (item) => {
        setWishListed(prev => !prev)
        setWishListItems(prev => (
            [...prev, item]
        ))
        toast.success('Added to Wishlist')
    }
        return (
            <>
                <ContextProvider.Provider value={{ handleAddToWishList, wishListed, wishListItems }}>
                    {children}
                </ContextProvider.Provider>
            </>
        )
}

export default WishlistContext