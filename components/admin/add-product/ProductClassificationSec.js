'use client'
import { useProductForm } from '@/app/context/admin/ProductFormContext'
import { gender, seasons, fragranceFamily, productAttributes, productCategories } from '@/constants/ProductClassificationConstants'

import { motion } from 'motion/react'
import React from 'react'

const ProductClassificationSec = () => {
    const { productDetails, handleProductDetailsViaButton, } = useProductForm()
    return (
        <>
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, delay: 0.3 }}
                viewport={{ once: true }}
                className='space-y-5 bg-white shadow-xl p-3 rounded-2xl'>
                <h2 className='text-xl font-semibold'>Product Classification</h2>

                <div className='space-y-3'>
                    <div className='flex items-center gap-5'>
                        <div className='font-semibold w-40'>Fragrance Family</div>
                        <div className='flex items-center gap-3'>
                            {fragranceFamily.map((family, i) => {
                                return <motion.button
                                    key={i}
                                    onClick={() => handleProductDetailsViaButton('fragranceFamily', family)}
                                    whileTap={{ scale: 0.97 }}
                                    className={`bg-background px-5 py-2 outline-none border border-foreground/30 hover:bg-foreground/80 hover:text-background transition-colors ease-linear duration-300 cursor-pointer
                                        ${productDetails.fragranceFamily.includes(family) ? 'bg-foreground/80 text-background'
                                            : 'bg-background'}`}>
                                    {family}
                                </motion.button>
                            })}
                        </div>
                    </div>
                    <div className='flex items-center gap-5'>
                        <div className='font-semibold w-40'>Season</div>
                        <div className='flex items-center gap-3'>
                            {seasons.map((season, i) => {
                                return <motion.button
                                    key={i}
                                    onClick={() => handleProductDetailsViaButton('season', season)}
                                    whileTap={{ scale: 0.97 }}
                                    className={`bg-background px-5 py-2 outline-none border border-foreground/30 hover:bg-foreground/80 hover:text-background transition-colors ease-linear duration-300 cursor-pointer
                                        ${productDetails.season.includes(season) ? 'bg-foreground/80 text-background'
                                            : 'bg-background'}`}>
                                    {season}
                                </motion.button>
                            })}
                        </div>
                    </div>
                    <div className='flex items-center gap-5'>
                        <div className='font-semibold w-40'>Categories</div>
                        <div className='flex items-center gap-3'>
                            {productCategories.map((cat, i) => {
                                return <motion.button
                                    key={i}
                                    onClick={() => handleProductDetailsViaButton('category', cat)}
                                    whileTap={{ scale: 0.97 }}
                                    className={`bg-background px-5 py-2 outline-none border border-foreground/30 hover:bg-foreground/80 hover:text-background transition-colors ease-linear duration-300 cursor-pointer
                                        ${productDetails.category.includes(cat) ? 'bg-foreground/80 text-background'
                                            : 'bg-background'}`}>
                                    {cat}
                                </motion.button>
                            })}
                        </div>
                    </div>
                    <div className='flex items-center gap-5'>
                        <div className='font-semibold w-40'>Atrributes</div>
                        <div className='flex items-center gap-3'>
                            {productAttributes.map((attribute, i) => {
                                return <motion.button
                                    key={i}
                                    onClick={() => handleProductDetailsViaButton('attribute', attribute)}
                                    whileTap={{ scale: 0.97 }}
                                    className={`bg-background px-5 py-2 outline-none border border-foreground/30 hover:bg-foreground/80 hover:text-background transition-colors ease-linear duration-300 cursor-pointer
                                        ${productDetails.attribute.includes(attribute) ? 'bg-foreground/80 text-background'
                                            : 'bg-background'}`}>
                                    {attribute}
                                </motion.button>
                            })}
                        </div>
                    </div>
                    <div className='flex items-center gap-5'>
                        <div className='font-semibold w-40'>Gender</div>
                        <div className='flex items-center gap-3'>
                            {gender.map((gender, i) => {
                                return <motion.button
                                    key={i}
                                    onClick={() => handleProductDetailsViaButton('gender', gender)}
                                    whileTap={{ scale: 0.97 }}
                                    className={`bg-background px-5 py-2 outline-none border border-foreground/30 hover:bg-foreground/80 hover:text-background transition-colors ease-linear duration-300 cursor-pointer
                                        ${productDetails.gender.includes(gender) ? 'bg-foreground/80 text-background'
                                            : 'bg-background'}`}>
                                    {gender}
                                </motion.button>
                            })}
                        </div>
                    </div>
                </div>
            </motion.section>
        </>
    )
}

export default ProductClassificationSec