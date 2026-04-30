'use client'

import React, { useState } from 'react'
import { createContext, useContext } from "react"

export const NavContext = createContext()
export const useNavContext = () => useContext(NavContext)


const NavbarContext = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false)

    const toggleNavbar = () => setIsOpen(!isOpen)

    return (
        <>
            <NavContext.Provider value={{ isOpen, toggleNavbar }}>
                {children}
            </NavContext.Provider>
        </>
    )
}

export default NavbarContext