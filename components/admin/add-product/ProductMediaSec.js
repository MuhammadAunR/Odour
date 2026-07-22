'use client'

import { useProductForm } from '@/app/context/admin/ProductFormContext'
import { Plus, Trash2 } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import React from 'react'

const ProductMediaSec = () => {
    const { handleRemovePreviewImage, handleProductPreview, productImagePreview } = useProductForm()
    return (
        <>
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, delay: 0.4 }}
                viewport={{ once: true }}
                className='space-y-5 bg-white shadow-xl p-3 rounded-2xl'>
                <h2 className='text-xl font-semibold'>Media</h2>

                <div className='space-y-3'>
                    <div className='font-semibold flex flex-col items-start'>Product Images
                        <span className='text-red-500 font-normal'>(Max 3)</span>
                        <span className='text-sm text-foreground/50'>Valid image formates, jpeg,webp.</span>
                    </div>

                    <div className='flex gap-3'>
                        <div className='flex items-center justify-start gap-3'>
                            {productImagePreview.length === 0 &&
                                <div className='w-30 h-30 border border-foreground/50 text-xs text-foreground/50 flex items-center justify-center'>No Image Selected</div>
                            }
                            {productImagePreview.map((img, index) => {
                                return <div key={index} className='w-30 h-30 border border-foreground/50 text-foreground/50 relative group/previewImg overflow-hidden'>
                                    <Image src={img.url} alt={img.fileName ?? 'Cloudinary Image'} fill sizes='500px' className='object-cover' />
                                    <span onClick={() => handleRemovePreviewImage(img.id)} className='absolute w-full h-full scale-0 bg-black/10 backdrop-blur-sm flex items-center justify-center text-red-500 group-hover/previewImg:scale-100 transition-all ease-linear duration-300 cursor-pointer'><Trash2 size={40} /></span>
                                </div>
                            })}
                        </div>
                        <div className='flex flex-col items-start gap-5'>
                            <div className='relative w-30 h-30'>
                                <input
                                    type="file"
                                    accept='image/*'
                                    title='Add Image'
                                    disabled={productImagePreview.length === 3}
                                    onChange={handleProductPreview}
                                    className='bg-background w-full h-full outline-none text-transparent border border-foreground/30 hover:border-foreground/50 transition-colors ease-linear'
                                />

                                <div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-foreground/50'>
                                    <Plus strokeWidth={3} />
                                    <span className='text-sm text-center'>
                                        Add Image
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>
        </>
    )
}

export default ProductMediaSec