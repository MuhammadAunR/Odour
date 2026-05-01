'use client'
import { Heart, Search, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { motion } from "framer-motion"
import { useCart } from '@/app/context/CartContext'

const ProductCard = ({ product }) => {
    const { handleAddCartItems } = useCart()
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: product.id * 0.1 }}
            viewport={{ once: false }}
            className='flex flex-col items-start justify-center border border-surface group/productCard hover:shadow-xl transition-shadow ease-in-out duration-500'>
            <div className='relative w-full aspect-3/4 overflow-hidden'>
                <Image
                    src={product.imgSrc}
                    alt={product.alt}
                    fill
                    loading='lazy'
                    sizes='(max-width: 768px) 50vw, 25vw'
                    className='object-cover'
                />
                <div className='flex items-center justify-center gap-5 absolute -bottom-15 scale-0 group-hover/productCard:bottom-2 group-hover/productCard:scale-100 transition-all ease-in-out duration-300  left-16 bg-white border border-foreground/20 px-7 py-2 rounded-full'>
                    <span className='hover:text-muted cursor-pointer transition-colors ease-in-out relative group/productActions'>
                        <Search />
                        <span className='absolute -top-10 left-1/2 -translate-x-1/2 text-sm bg-foreground text-background w-30 flex items-center justify-center opacity-0 group-hover/productActions:opacity-100 transition-opacity ease-linear rounded-full p-2 whitespace-nowrap'>Quick View</span>
                    </span>
                    <span className='hover:text-muted cursor-pointer transition-colors ease-in-out relative group/productActions'>
                        <Heart />
                        <span className='absolute -top-10 left-1/2 -translate-x-1/2 text-sm bg-foreground text-background w-30 flex items-center justify-center opacity-0 group-hover/productActions:opacity-100 transition-opacity ease-linear rounded-full p-2 whitespace-nowrap'>
                            Add to Favorite
                        </span>
                    </span>
                    <span onClick={() => handleAddCartItems(product)} className='hover:text-muted cursor-pointer transition-colors ease-in-out relative group/productActions'>
                        <ShoppingBag />
                        <span className='absolute -top-10 left-1/2 -translate-x-1/2 text-sm bg-foreground text-background w-30 flex items-center justify-center opacity-0 group-hover/productActions:opacity-100 transition-opacity ease-linear rounded-full p-2 whitespace-nowrap'>Add to Cart</span>
                    </span>
                </div>
            </div>
            <div className='p-4'>
                <h3 className='text-2xl font-bold font-display'>{product.name}</h3>
                <div className='text-lg'>
                    <span className='text-xs'>PKR</span>
                    <span className='font-semibold text-red-600'> {product.price}</span>
                </div>
            </div>
        </motion.div>
    )
}

export default ProductCard
