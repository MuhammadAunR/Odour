'use client'
import React from 'react'
import { motion } from "framer-motion"
import Image from 'next/image'
import SectionHeader from '@/components/SectionHeader'
import { processingSteps } from '@/components/Assets'
import Link from 'next/link'
import { PrimaryButton, SecondaryButton } from '@/components/UI/Buttons'


const AboutPage = () => {

    return (
        <>
            <main className='lg:w-10/12 lg:mx-auto lg:px-0 px-5 w-full max-w-7xl'>
                <header className='min-h-100 h-fit my-10'>

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
                                <p>Odour was born from a simple belief — that fragrance is not just a scent, its a feeling, a memory, a statement. We craft perfumes that speak before you do.
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

                <section className='py-10'>
                    <SectionHeader headerContent={{ subHeading: 'How We Create', mainHeading: 'Our Process' }} />

                    <section className="relative overflow-hidden">
                        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="relative mt-7">

                                <div className="absolute inset-x-0 hidden xl:px-44 top-8 md:block md:px-20 lg:px-28">
                                    <svg className="w-full" xmlns="http://www.w3.org/2000/svg" width="875" height="48" viewBox="0 0 875 48" fill="none">
                                        <path
                                            d="M2 29C20.2154 33.6961 38.9915 35.1324 57.6111 37.5555C80.2065 40.496 102.791 43.3231 125.556 44.5555C163.184 46.5927 201.26 45 238.944 45C312.75 45 385.368 30.7371 458.278 20.6666C495.231 15.5627 532.399 11.6429 569.278 6.11109C589.515 3.07551 609.767 2.09927 630.222 1.99998C655.606 1.87676 681.208 1.11809 706.556 2.44442C739.552 4.17096 772.539 6.75565 805.222 11.5C828 14.8064 850.34 20.2233 873 24"
                                            stroke="#8C8070"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeDasharray="1 12"
                                        />
                                    </svg>
                                </div>

                                <div className="relative grid grid-cols-1 text-center gap-y-8 sm:gap-y-10 md:grid-cols-4 gap-x-12">
                                    {processingSteps.map((step) => (
                                        <div key={step.title}>
                                            <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full border"
                                                style={{ background: "var(--surface)", borderColor: "var(--muted)", opacity: 0.8 }}>
                                                <span className="text-xl font-serif font-semibold" style={{ color: "var(--foreground)" }}>
                                                    {step.step}
                                                </span>
                                            </div>
                                            <h3 className="mt-6 md:mt-10 text-xl font-semibold" style={{ color: "var(--foreground)" }}>
                                                {step.title}
                                            </h3>
                                            <p className="mt-3 text-base" style={{ color: "var(--muted)" }}>
                                                {step.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </section>

                    <Link href={'/shop'} className='flex items-center justify-center mt-20'>
                        <SecondaryButton text={'Explore Our Collection'} />
                    </Link>
                </section>
            </main >

            <section className='bg-linear-to-b from-background to-surface border-b border-background w-full'>
                <div className="min-h-80 h-fit w-full max-w-7xl px-5 lg:px-0 mx-auto">
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
