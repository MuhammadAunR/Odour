'use client'

import React, { useState } from 'react'
import { createContext, useContext } from "react"

export const PopupContext = createContext()
export const usePopup = () => useContext(PopupContext)


const QuickPopupContext = ({ children }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [quickViewProduct, setQuickViewProduct] = useState()

    const togglePopup = () => {
        setIsPopupOpen(prev => !prev)
    }

    const handleProduct = (prod) => {
        setQuickViewProduct(prod)
    }


    return <>
        <PopupContext.Provider value={{ togglePopup, isPopupOpen,handleProduct,quickViewProduct }}>
            {children}
        </PopupContext.Provider>
    </>
}

export default QuickPopupContext

