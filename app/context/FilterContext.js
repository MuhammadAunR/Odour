'use client'

import { createContext, useContext, useState } from "react"
import React from 'react'

export const FilterProvider = createContext()
export const useFilter = () => useContext(FilterProvider)

const FilterContext = ({ children }) => {
    const [isFilterSideOpen, setIsFilterSideOpen] = useState(false)

    const toggleFilterSide = () => {
        setIsCartOpen(!isFilterSideOpen)
    }

    return (
        <>
            <FilterProvider.Provider value={{toggleFilterSide,isFilterSideOpen}}>
                {children}
            </FilterProvider.Provider>
        </>
    )
}

export default FilterContext
