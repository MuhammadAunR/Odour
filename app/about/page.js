'use client'
import React from 'react'
import ScrollToTopBtn from '@/components/ScrollToTopBtn'
import { motion } from "framer-motion"
import { containerVariants, itemVariants } from '@/components/Assets'
import Image from 'next/image'


const AboutPage = () => {
    return (
        <main className='w-10/12 mx-auto relative'>
            <ScrollToTopBtn />
            <header className='min-h-screen h-fit'>
                <motion.div
                    variants={containerVariants}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, amount: 0.5 }}
                    className='flex flex-col items-center gap-2 py-10'>

                    <motion.span
                        variants={itemVariants}
                        className='text-xs font-semibold tracking-[0.3em] uppercase text-foreground/40'>
                        The Odour Story
                    </motion.span>

                    <motion.h2
                        variants={itemVariants}
                        className='text-4xl md:text-5xl font-black font-serif tracking-widest'>
                        About Us
                    </motion.h2>

                    <motion.div
                        variants={itemVariants}
                        className='flex items-center gap-3 mt-1'>
                        <div className='w-16 h-[0.5px] bg-foreground/30'></div>
                        <span className='text-foreground/30 text-xs'>✦</span>
                        <div className='w-16 h-[0.5px] bg-foreground/30'></div>
                    </motion.div>

                </motion.div>

                <section className='flex items-center justify-center gap-10 w-full max-lg:flex-col'>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className='relative w-full lg:w-1/2 h-100'>
                        <Image
                            src={'/featureStripSection.webp'}
                            alt='About'
                            fill
                            sizes='1000px'
                            priority
                            className='object-cover' />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className='lg:w-1/2 flex flex-col gap-7 max-lg:pt-7 max-lg:pb-20'>
                        <div className='flex flex-col gap-3'>
                            <h2 className='font-bold text-3xl md:text-5xl'>WELCOME TO <span className='font-display font-bold text-muted'>ODOUR</span></h2>
                            <p>Odour was born from a simple belief — that fragrance is not just a scent, it's a feeling, a memory, a statement. We craft perfumes that speak before you do.
                            </p>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <h2 className='font-bold text-lg md:text-xl'>WE STARTED IN 2024</h2>
                            <p>What began as a small passion project in a home studio has grown into a beloved fragrance brand. From day one, our mission has been to create scents that are personal, powerful, and unforgettable.
                            </p>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <h2 className='font-bold text-lg md:text-xl'>WON BEST ONLINE FRAGRANCE SHOP IN 2026</h2>
                            <p>Just two years after launch, Odour was recognized as the Best Online Fragrance Shop — a milestone that pushed us to dream bigger, craft better, and serve our community with even greater dedication.
                            </p>
                        </div>
                    </motion.div>
                </section>
            </header>
        </main>
    )
}

export default AboutPage
