'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence, scale } from 'framer-motion'

const Button1 = ({ text }) => {
    const [hovered, setHovered] = useState(false)

    return (
        <motion.button
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden border border-foreground px-10 py-3 uppercase tracking-widest text-sm cursor-pointer"
        >
            <motion.span
                className="absolute z-0 bg-foreground left-0 right-0"
                initial={{
                    height: '30%',
                    bottom: '-30%',
                    borderRadius: '50% 50% 0 0',
                }}
                animate={hovered ? {
                    height: '150%',
                    bottom: '-50%',
                    borderRadius: ['50% 50% 0 0', '30% 30% 0 0', '0% 0% 0 0'],
                } : {
                    height: '30%',
                    bottom: '-30%',
                    borderRadius: '50% 50% 0 0',
                }}
                transition={{
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                }}
            />
            <span className={`relative z-10 transition-colors duration-300 ${hovered ? 'text-background' : 'text-foreground'}`}>
                {text}
            </span>
        </motion.button>

    )
}

export { Button1 }