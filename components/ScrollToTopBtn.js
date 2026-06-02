'use client'
import React, { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'
import { motion } from "framer-motion"

const ScrollToTopBtn = () => {
    const [yScroll, setYScroll] = useState(false)

    useEffect(() => {
        const handleYScroll = () => {
            setYScroll(window.scrollY > 500)
        }
        window.addEventListener('scroll', handleYScroll)
        return () => window.removeEventListener('scroll', handleYScroll)
    }, [])

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (!yScroll) return null

    return (
        <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={handleScrollToTop}
            className='fixed bottom-7 right-7 z-50 w-10 h-10 flex items-center justify-center bg-foreground cursor-pointer'>
            <span
                style={{ animation: 'mainArrowRise 1.2s ease-in-out infinite' }}
                className='absolute text-background'>
                <ChevronUp size={22} />
            </span>

        </motion.button>
    )
}

export default ScrollToTopBtn