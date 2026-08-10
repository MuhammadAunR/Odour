'use client'
import { useProductForm } from '@/app/context/admin/ProductFormContext'
import { useAllCatalog } from '@/hooks/useAllCatalog'
import { motion } from 'motion/react'
import React, { useEffect } from 'react'

const ProductClassificationSec = () => {

    const { productDetails, handleProductDetailsViaButton, } = useProductForm()
    const { catalog, getCatalog } = useAllCatalog()

    useEffect(() => {
        getCatalog()
    }, [])

    return (
        <>
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, delay: 0.3 }}
                viewport={{ once: true }}
                className='space-y-5 bg-white shadow-xl p-3 rounded-2xl'>
                <h2 className='text-xl font-semibold'>Product Catalog</h2>

                <div className='space-y-5 lg:space-y-3'>
                    <div className='flex items-center max-lg:flex-col max-lg:items-start gap-3 lg:gap-5'>
                        <div className='font-semibold lg:w-40'>Fragrance Family</div>
                        <div className='flex items-center gap-3 flex-wrap'>
                            {catalog.fragranceFamily.map((family, i) => {
                                return <motion.button
                                    key={i}
                                    onClick={() => handleProductDetailsViaButton('fragranceFamily', family.name)}
                                    whileTap={{ scale: 0.97 }}
                                    className={`bg-background px-5 py-2 outline-none border border-foreground/30 hover:bg-foreground/80 hover:text-background transition-colors ease-linear duration-300 cursor-pointer
                                    ${productDetails.fragranceFamily.includes(family.name) ?
                                            'bg-foreground/80 text-background' : 'bg-background'}`}>
                                    {family.name}
                                </motion.button>
                            })}
                        </div>
                    </div>
                    <div className='flex items-center max-lg:flex-col max-lg:items-start gap-3 lg:gap-5'>
                        <div className='font-semibold lg:w-40'>Season</div>
                        <div className='flex items-center gap-3 flex-wrap'>
                            {catalog.season.map((season, i) => {
                                return <motion.button
                                    key={i}
                                    onClick={() => handleProductDetailsViaButton('season', season.name)}
                                    whileTap={{ scale: 0.97 }}
                                    className={`bg-background px-5 py-2 outline-none border border-foreground/30 hover:bg-foreground/80 hover:text-background transition-colors ease-linear duration-300 cursor-pointer
                                        ${productDetails.season.includes(season.name) ? 'bg-foreground/80 text-background'
                                            : 'bg-background'}`}>
                                    {season.name}
                                </motion.button>
                            })}
                        </div>
                    </div>
                    <div className='flex items-center max-lg:flex-col max-lg:items-start gap-3 lg:gap-5'>
                        <div className='font-semibold lg:w-40'>Categories</div>
                        <div className='flex items-center gap-3 flex-wrap'>
                            {catalog.category.map((cat, i) => {
                                return <motion.button
                                    key={i}
                                    onClick={() => handleProductDetailsViaButton('category', cat.name)}
                                    whileTap={{ scale: 0.97 }}
                                    className={`bg-background px-5 py-2 outline-none border border-foreground/30 hover:bg-foreground/80 hover:text-background transition-colors ease-linear duration-300 cursor-pointer
                                        ${productDetails.category.includes(cat.name) ? 'bg-foreground/80 text-background'
                                            : 'bg-background'}`}>
                                    {cat.name}
                                </motion.button>
                            })}
                        </div>
                    </div>
                    <div className='flex items-center max-lg:flex-col max-lg:items-start gap-3 lg:gap-5'>
                        <div className='font-semibold lg:w-40'>Atrributes</div>
                        <div className='flex items-center gap-3 flex-wrap'>
                            {catalog.attribute.map((attribute, i) => {
                                return <motion.button
                                    key={i}
                                    onClick={() => handleProductDetailsViaButton('attribute', attribute.name)}
                                    whileTap={{ scale: 0.97 }}
                                    className={`bg-background px-5 py-2 outline-none border border-foreground/30 hover:bg-foreground/80 hover:text-background transition-colors ease-linear duration-300 cursor-pointer
                                        ${productDetails.attribute.includes(attribute.name) ? 'bg-foreground/80 text-background'
                                            : 'bg-background'}`}>
                                    {attribute.name}
                                </motion.button>
                            })}
                        </div>
                    </div>
                    <div className='flex items-center max-lg:flex-col max-lg:items-start gap-3 lg:gap-5'>
                        <div className='font-semibold lg:w-40'>Gender</div>
                        <div className='flex items-center gap-3 flex-wrap'>
                            {catalog.gender.map((gender, i) => {
                                return <motion.button
                                    key={i}
                                    onClick={() => handleProductDetailsViaButton('gender', gender.name)}
                                    whileTap={{ scale: 0.97 }}
                                    className={`bg-background px-5 py-2 outline-none border border-foreground/30 hover:bg-foreground/80 hover:text-background transition-colors ease-linear duration-300 cursor-pointer
                                        ${productDetails.gender.includes(gender.name) ? 'bg-foreground/80 text-background'
                                            : 'bg-background'}`}>
                                    {gender.name}
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