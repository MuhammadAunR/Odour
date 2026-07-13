'use client'
import React, { useState } from 'react'
import { createContext, useContext } from "react";

export const SidebarProvider = createContext()
export const useSidebar = () => useContext(SidebarProvider)


const SidebarContext = ({ children }) => {

    const [sidebarOpen, setSidebarOpen] = useState(true)

    const toggleSidebarOpening = () => {
        setSidebarOpen(prev => !prev)
    }

    return (
        <SidebarProvider.Provider value={{ toggleSidebarOpening, sidebarOpen }}>
            {children}
        </SidebarProvider.Provider>
    )
}

export default SidebarContext