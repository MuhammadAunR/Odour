'use client'

import { motion } from 'motion/react'
import React from 'react'

const PolicyPageHeader = ({ icon: Icon, title, description, date }) => {

    return (
        <>
            <header className='bg-surface flex flex-col items-center justify-center gap-4 text-center px-5 py-12 container-limit'>
                <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                    className='bg-muted/40 rounded-full p-3'>
                    <Icon size={80} />
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className='text-4xl md:text-5xl font-bold'>{title}</motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                    className='max-w-xl max-md:text-sm'>{description}</motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className='flex items-center gap-3'>
                    <span>Last Updated :</span>
                    <span>{date}</span>
                </motion.div>
            </header>
        </>
    )
}


export default PolicyPageHeader