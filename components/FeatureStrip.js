'use client'
import React from 'react'
import Image from 'next/image'
import { fragranceFamilies } from './Assets'
import { motion } from "framer-motion"
import SectionHeader from './SectionHeader'

const FeatureStrip = () => {


    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 }
    }


    const featureStrip = [
        {
            title: 'Free Shipping',
            desc: 'Enjoy free shipping on all orders above PKR 5,000. Fast and reliable delivery to your doorstep.',
        },
        {
            title: 'Customer Support',
            desc: '24/7 customer support available. We are always here to help you with any queries.',
        },
        {
            title: 'Secure Payment',
            desc: 'Your payment is 100% secure. We use the latest encryption technology to protect your data.',
        },
        {
            title: 'Easy Returns',
            desc: 'Not satisfied? Return your order within 7 days for a full refund. No questions asked.',
        },
    ]

    return (
        <>
            <main className='w-10/12 mx-auto pt-90 mt-90'>

                <section className='flex items-center justify-between gap-7 pt-15 flex-wrap'>
                    {featureStrip.map((feature, i) => {
                        return <div key={i} className='flex flex-col items-start gap-3 md:w-70 p-5'>
                            <h3 className='text-xl font-semibold'>{feature.title}</h3>
                            <div className='bg-foreground h-1 w-1/5'></div>
                            <p className='text-muted text-left'>{feature.desc}</p>
                        </div>
                    })}
                </section>

                <section>
                    <SectionHeader headerContent={{ subHeading: 'Discover Your Signature', mainHeading: 'Scent Families' }} />

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className='py-7 flex items-center justify-center gap-3 flex-wrap mb-10'>
                        {fragranceFamilies.map(family => {
                            return <motion.div key={family.name} variants={item} className='relative w-full h-100 md:w-60 md:h-80 overflow-hidden group'>
                                <h4 className='relative z-10 bg-black/50 backdrop-blur-sm w-full p-2 transition-transform ease-linear text-white'>
                                    {family.name}
                                </h4>
                                <div className="absolute inset-0">
                                    <Image
                                        src={family.image}
                                        alt={family.name}
                                        fill
                                        sizes="240px"
                                        priority
                                        className='object-cover group-hover:scale-110 transition-transform ease-linear duration-300'
                                    />
                                </div>
                            </motion.div>
                        })}
                    </motion.div>
                </section>

            </main>
            <section className='relative h-80 w-full overflow-hidden'>
                <Image
                    src={'/featureStripSection.webp'}
                    alt='Feature Strip Section Photo'
                    fill
                    loading='lazy'
                    sizes='1000px'
                    className='object-cover hover:scale-105 ease-linear transition-all' />
            </section>
        </>
    )
}

export default FeatureStrip
