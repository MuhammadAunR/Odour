'use client'

import { createContext, useContext, useState } from "react"
import React from 'react'

export const FilterProvider = createContext()
export const useFilter = () => useContext(FilterProvider)

const FilterContext = ({ children }) => {

    const [isFilterSideOpen, setIsFilterSideOpen] = useState(false)
    const [activeFilterCount, setActiveFilterCount] = useState([])

    const toggleFilterSide = () => {
        setIsFilterSideOpen(!isFilterSideOpen)
    }

    return (
        <FilterProvider.Provider value={{ toggleFilterSide, isFilterSideOpen,setActiveFilterCount,activeFilterCount }}>
            {children}
        </FilterProvider.Provider>
    )
}

export default FilterContext
