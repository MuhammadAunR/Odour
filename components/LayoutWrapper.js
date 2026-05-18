'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import Navbar from './Navbar'
import FooterSection from './FooterSection'

const hiddenRoutes = ['/authpage']
const LayoutWrapper = ({ children }) => {
    const pathName = usePathname()
    const hideLayout = hiddenRoutes.some(route => pathName.startsWith(route))
    return (
        <>
            {!hideLayout && <Navbar />}
            {children}
            {!hideLayout && <FooterSection />}
        </>
    )
}

export default LayoutWrapper
