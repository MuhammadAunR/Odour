'use client'

import { createContext, useContext, useState } from "react"

export const ContextProvider = createContext()
export const useWishlist = () => useContext(ContextProvider)

import React from 'react'
import { toast } from "react-toastify"

const WishlistContext = ({ children }) => {

    const [wishListItems, setWishListItems] = useState([])

    const toggleWishList = (prodId) => {
        const exist = wishListItems?.find(itemId => {
            return itemId === prodId
        })
        if (exist) {
            setWishListItems(prev => {
                return prev.filter(id => id !== prodId)
            })
            toast.success('Removed from Wishlist')
        } else {
            setWishListItems(prev => (
                [...prev, prodId]
            ))
            toast.success('Added to Wishlist')
        }
    }
    return (
        <>
            <ContextProvider.Provider value={{ toggleWishList, wishListItems }}>
                {children}
            </ContextProvider.Provider>
        </>
    )
}

export default WishlistContext