'use client'
import React from 'react'
import ScrollToTopBtn from '@/components/ScrollToTopBtn'
import { motion } from "framer-motion"
import Image from 'next/image'
import SectionHeader from '@/components/SectionHeader'


const AboutPage = () => {
    return (
        <>
            <main className='w-10/12 mx-auto relative'>
                <ScrollToTopBtn />
                <header className='min-h-100 h-fit'>
                    <SectionHeader headerContent={{ subHeading: 'The Odour Story', mainHeading: 'About Us' }} />

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
            <section className='mt-15'>
                <div className="min-h-80 h-fit w-full bg-linear-to-b from-background to-surface">
                    <div className='mx-auto py-20 w-10/12 md:w-3xl flex flex-col items-center justify-center gap-6'>
                        <p className='text-xs uppercase tracking-widest text-muted'>Our Mission</p>
                        <h2 className='text-3xl md:text-4xl text-center font-serif tracking-widest font-semibold text-foreground leading-snug'>
                            To craft scents that go beyond fragrance — <br className='hidden md:block' />
                            <span className='text-muted'>becoming identity, memory, and second skin.</span>
                        </h2>
                        <div className='w-12 h-px bg-muted opacity-40' />
                        <p className='text-base text-center text-muted max-w-lg'>
                            Every bottle we create is a world unto itself. We believe fragrance is the most
                            intimate form of self-expression — and we exist to help you find yours.
                        </p>
                    </div>
                </div>
            </section>
        </>

    )
}

export default AboutPage
