'use client'

import { useProductForm } from '@/app/context/admin/ProductFormContext'
import { Plus, Trash2 } from 'lucide-react'
import { motion } from 'motion/react'
import React from 'react'

const PriceSection = () => {
    const { productDetails, removeProductVariantCard, addProductVariantsCard, handleProductVariantInput } = useProductForm()
    return (
        <>
            <motion.section
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: false }}
                className='space-y-5 bg-white shadow-xl p-3 rounded-2xl'>
                <h2 className='text-xl font-semibold'>Price and Inventory</h2>

                <div className='space-y-3'>
                    <div className='flex items-center gap-3'>
                        {productDetails.variants.map((variant, index) => {
                            return <div key={index} className='w-60 h-70 border-2 border-foreground/20 shadow-lg px-2 pt-5 flex flex-col gap-1 items-center relative group/variantCard overflow-hidden'>

                                <span onClick={() => removeProductVariantCard(index)} className='absolute top-2 right-2 text-red-500 cursor-pointer scale-0 group-hover/variantCard:scale-100 transition-all ease-linear duration-300'>
                                    <Trash2 size={20} />
                                </span>
                                <label htmlFor="size" className='flex flex-col items-start'>
                                    <div className='text-sm'>Size</div>
                                    <input
                                        name='size'
                                        onChange={(e) => handleProductVariantInput(index, 'size', e.target.value)}
                                        value={variant.size ?? ''}
                                        type="text"
                                        placeholder="Size in ML"
                                        className='bg-background text-sm px-3 py-2 w-full outline-none text-foreground/80 border border-foreground/30 hover:border-foreground/50 transition-colors ease-linear'
                                    />
                                </label>
                                <label htmlFor="originalPrice" className='flex flex-col items-start'>
                                    <div className='text-sm'>Original Price</div>
                                    <input
                                        name='originalPrice'
                                        onChange={(e) => handleProductVariantInput(index, 'originalPrice', e.target.value)}
                                        value={variant.originalPrice ?? ''}
                                        type="text"
                                        placeholder="Original Price"
                                        className='bg-background text-sm px-3 py-2 w-full outline-none text-foreground/80 border border-foreground/30 hover:border-foreground/50 transition-colors ease-linear'
                                    />
                                </label>
                                <label htmlFor="salePrice" className='flex flex-col items-start'>
                                    <div className='text-sm'>Sale Price</div>
                                    <input
                                        name='salePrice'
                                        onChange={(e) => handleProductVariantInput(index, 'salePrice', e.target.value)}
                                        value={variant.salePrice ?? ''}
                                        type="text"
                                        placeholder="Sale Price"
                                        className='bg-background text-sm px-3 py-2 w-full outline-none text-foreground/80 border border-foreground/30 hover:border-foreground/50 transition-colors ease-linear'
                                    />
                                </label>
                                <label htmlFor="stockQuantity" className='flex flex-col items-start'>
                                    <div className='text-sm'>Stock</div>
                                    <input
                                        name='stockQuantity'
                                        onChange={(e) => handleProductVariantInput(index, 'stockQuantity', e.target.value)}
                                        value={variant.stockQuantity ?? ''}
                                        type="number"
                                        placeholder="Stock Qty"
                                        className='bg-background text-sm px-3 py-2 w-full outline-none text-foreground/80 border border-foreground/30 hover:border-foreground/50 transition-colors ease-linear'
                                    />
                                </label>
                            </div>
                        })}
                        <div onClick={addProductVariantsCard} className='w-60 h-70 border-2 border-foreground/20 shadow-lg px-2 py-3 flex flex-col items-center justify-center text-foreground/50 font-semibold cursor-pointer hover:bg-foreground/5 transition-all ease-linear duration-300'>
                            <span><Plus strokeWidth={3} size={30} /></span>
                            <span>
                                Add other Size
                            </span>
                        </div>
                    </div>
                </div>
            </motion.section>
        </>
    )
}

export default PriceSection