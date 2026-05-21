'use client'
import React from 'react'
import { motion } from "framer-motion"
import { containerVariants, itemVariants } from '@/components/Assets'


const SectionHeader = ({headerContent}) => {
    return (
        <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.5 }}
            className='flex flex-col items-center gap-3 py-10'>

            <motion.span
                variants={itemVariants}
                className='text-[10px] font-medium tracking-[0.4em] uppercase'
                style={{ color: "var(--muted)" }}>
               {headerContent.subHeading}
            </motion.span>

            <motion.h2
                variants={itemVariants}
                className='text-4xl md:text-5xl font-black font-serif tracking-wider'>
                {headerContent.mainHeading}
            </motion.h2>

            <motion.div
                variants={itemVariants}
                className='flex items-center gap-2 mt-1'>
                <div className='w-10 h-[0.5px]' style={{ background: "var(--muted)", opacity: 0.4 }} />
                <div className='w-1.5 h-1.5 rounded-full' style={{ background: "var(--muted)", opacity: 0.5 }} />
                <div className='w-10 h-[0.5px]' style={{ background: "var(--muted)", opacity: 0.4 }} />
            </motion.div>

        </motion.div>
    )
}

export default SectionHeader
