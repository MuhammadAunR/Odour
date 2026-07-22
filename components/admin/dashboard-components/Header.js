'use client'

import { CalendarDays } from 'lucide-react'
import { motion } from 'motion/react';
import React from 'react'

const Header = () => {

    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');

    return (
        <>
            <motion.header
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.01 }}
                viewport={{ once: true }}
                className='space-y-5 py-5 px-2'>
                <section className='w-full py-7 px-5 bg-white shadow-lg rounded-2xl flex items-center justify-between'>
                    <div className='flex flex-col'>
                        <h1 className='font-bold text-2xl'>
                            Welcome Back, Admin 👋
                        </h1>
                        <p className='text-sm text-foreground/50'>Here what's heppening with yoour store</p>
                    </div>
                    <span className='font-semibold text-lg'>
                        <div className='flex items-center gap-1'>
                            <CalendarDays />-
                            <span>{new Date().toDateString()}</span>
                        </div>
                    </span>
                </section>
            </motion.header>
        </>
    )
}

export default Header