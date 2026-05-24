'use client'
import React from 'react'
import { motion } from 'framer-motion'

const PrimaryButton = ({ text }) => {

    return (
        <motion.button
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 100, y: 0 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className='relative group/btn bg-foreground px-10 py-2 uppercase tracking-wider text-lg cursor-pointer border border-foreground'>
            <span className='relative z-10 font-semibold text-background group-hover/btn:text-foreground transition-colors ease-linear duration-200'>{text}</span>
            <span className='absolute left-0 bottom-0 w-full h-0 group-hover/btn:h-full transition-all ease-linear duration-300 bg-background'></span>
        </motion.button>

    )
}

export { PrimaryButton }

const SecondaryButton = ({ text }) => {

    return (
        <motion.button
            whileTap={{ scale: 0.97 }}
            className='relative group/btn px-7 py-2 uppercase 
                     tracking-wider text-lg cursor-pointer text-foreground hover:bg-foreground/10 transition-colors ease-linear duration-300'>
           
            <span className='absolute top-0 left-0 h-[1.5px] w-full 
                           group-hover/btn:w-0 bg-foreground 
                           transition-all duration-200 ease-linear'/>
           
            <span className='absolute top-0 right-0 w-[1.5px] h-full 
                           group-hover/btn:h-0 bg-foreground 
                           transition-all duration-200 ease-linear delay-50'/>
           
            <span className='absolute bottom-0 right-0 h-[1.5px] w-full 
                           group-hover/btn:w-0 bg-foreground 
                           transition-all duration-200 ease-linear delay-100'/>
    
            <span className='absolute bottom-0 left-0 w-[1.5px] h-full 
                           group-hover/btn:h-0 bg-foreground 
                           transition-all duration-200 ease-linear delay-150'/>
            <span className='relative z-10 font-semibold'>{text}</span>
        </motion.button>

    )
}

export { SecondaryButton }