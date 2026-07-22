'use client'

import { useProductForm } from '@/app/context/admin/ProductFormContext'
import { motion } from 'motion/react'
import React from 'react'

const ProductInfoSec = () => {
    const { productDetails, handleProductDetailsInput, } = useProductForm()

    return (
        <>
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, delay: 0.1 }}
                viewport={{ once: true }}
                className='space-y-5 bg-white shadow-xl p-3 rounded-2xl'>
                <h2 className='text-xl font-semibold'>Product Information</h2>

                <div className='space-y-3'>
                    <label htmlFor="name" className='flex items-center gap-5'>
                        <div className='font-semibold w-40'>Product Name</div>
                        <input
                            name='name'
                            onChange={handleProductDetailsInput}
                            value={productDetails.name}
                            type="text"
                            placeholder='Product Name'
                            className='bg-background px-5 py-2 w-full outline-none text-foreground/80 border border-foreground/30 hover:border-foreground/50 transition-colors ease-linear' />
                    </label>
                    <label htmlFor="name" className='flex items-start gap-5'>
                        <div className='font-semibold w-40'>Description</div>
                        <textarea
                            name='description'
                            onChange={handleProductDetailsInput}
                            value={productDetails.description}
                            rows={3}
                            placeholder='Enter Product Description here...'
                            className='bg-background px-5 py-2 w-full outline-none text-foreground/80 border border-foreground/30 hover:border-foreground/50 transition-colors ease-linear'
                        ></textarea>
                    </label>
                </div>
            </motion.section>
        </>
    )
}

export default ProductInfoSec