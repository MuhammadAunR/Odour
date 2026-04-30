'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence, scale } from 'framer-motion'

const Button1 = ({ text }) => {
    const [hovered, setHovered] = useState(false)

    return (
        <motion.button
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden border-2 border-foreground px-10 py-3 uppercase cursor-pointer"
        >

            <AnimatePresence mode="wait">
                {hovered && (
                    <motion.span
                        key="bg"
                        initial={{ y: '100%' }}
                        animate={{ y: '0%' }}
                        exit={{ y: '-100%' }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                        className="absolute inset-0 bg-foreground z-0"
                    />
                )}
            </AnimatePresence>
            <span
                className={`relative z-10 transition-colors duration-300 
                    ${hovered ? 'text-background' : 'text-foreground'}`} >
                {text}
            </span>
        </motion.button>
    )
}

export { Button1 }