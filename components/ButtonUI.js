import React from 'react'
import { motion } from "framer-motion"

const Button1 = ({ text }) => {
    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            className='text-lg border-2 border-foreground px-10 py-3 uppercase hover:bg-foreground hover:border-surface hover:text-background transition-all ease-linear duration-300 cursor-pointer'>
            {text}
        </motion.button>
    )
}

export { Button1 }
