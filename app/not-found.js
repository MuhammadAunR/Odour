'use client'

import { SecondaryButton } from '@/components/UI/Buttons'
import { motion } from 'motion/react'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    return (
        <main className='flex flex-col items-center justify-center w-full h-screen bg-background text-foreground px-6'>

            <div className='flex flex-col items-center max-w-lg w-full'>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className='text-[10px] tracking-[0.4em] uppercase text-foreground/40 mb-8'
                >
                    Ref. No. 404 — Discontinued
                </motion.p>

                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    className='h-px bg-foreground/15 mb-10'
                />

                <motion.h1
                    initial={{ opacity: 0, letterSpacing: '0.2em' }}
                    animate={{ opacity: 1, letterSpacing: '0em' }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className='font-serif text-8xl md:text-[10rem] font-bold leading-none text-foreground'
                >
                    404
                </motion.h1>

                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className='h-px bg-foreground/15 mt-10 mb-8'
                />

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className='flex flex-col items-center gap-3 text-center'
                >
                    <h2 className='text-base tracking-wide text-foreground/90'>
                        This composition no longer exists.
                    </h2>
                    <p className='text-sm text-foreground/50 max-w-xs leading-relaxed'>
                        The page you're searching for has been discontinued
                        or never made it past the sample stage.
                    </p>

                    <Link href='/shop' className='mt-6'>
                        <SecondaryButton text='View the Full Collection' />
                    </Link>
                </motion.div>
            </div>
        </main>
    )
}

export default NotFound