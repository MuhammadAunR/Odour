'use client'
import { Search, ShoppingBag, Heart } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { motion } from "framer-motion"
import { useCart } from '@/app/context/CartContext'
import { Button1 } from './ButtonUI'

const ProductCard = ({ product }) => {
    const { handleAddCartItems } = useCart()
    const [wishListed, setWishListed] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: product.id * 0.1 }}
            viewport={{ once: true }}
            className='flex flex-col items-start border border-surface group/productCard hover:shadow-xl transition-shadow ease-in-out duration-500'>

            <div className='relative w-full aspect-3/4 overflow-hidden'>
                <Image
                    src={product.imgSrc}
                    alt={product.alt}
                    fill
                    loading='lazy'
                    sizes='(max-width: 768px) 50vw, 25vw'
                    className='object-cover transition-transform duration-500 group-hover/productCard:scale-105'
                />


                <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-medium
                    ${product.category === 'Men'
                        ? 'bg-foreground text-background'
                        : product.category === 'Women'
                            ? 'bg-foreground text-background'
                            : 'bg-foreground text-background'
                    }`}>
                    {product.category}
                </span>

                {product.isOnSale &&
                    <span className='absolute top-2 right-2 px-2 py-1 text-xs font-semibold bg-red-500 text-white'>
                        -{Math.round(((product.price - product.discountedPrice) / product.price) * 100)}%
                    </span>
                }


                <button
                    onClick={() => setWishListed(!wishListed)}
                    className='absolute bottom-14 right-3 p-1.5 bg-background/80 backdrop-blur-sm rounded-full
                        opacity-0 group-hover/productCard:opacity-100 transition-all duration-300'>
                    <Heart
                        size={16}
                        className={wishListed ? 'fill-red-500 text-red-500' : 'text-foreground'}
                    />
                </button>


                <div className='absolute bottom-0 left-0 right-0 
                    translate-y-full group-hover/productCard:translate-y-0
                    transition-transform duration-300 ease-in-out
                    flex items-center border-t border-foreground/10 bg-background/95 backdrop-blur-sm'>

                    <button
                        className='flex-1 flex items-center justify-center gap-2 py-3 text-sm
                            hover:bg-muted hover:text-background transition-colors duration-300
                            border-r border-foreground/10'>
                        <Search size={15} />
                        <span>Quick View</span>
                    </button>

                    <button
                        onClick={() => handleAddCartItems(product)}
                        className='flex-1 flex items-center justify-center gap-2 py-3 text-sm
                            hover:bg-muted hover:text-background transition-colors duration-300'>
                        <ShoppingBag size={15} />
                        <span>Add to Cart</span>
                    </button>

                </div>
            </div>


            <div className='p-4 w-full'>
                <h3 className='text-xl font-bold font-display'>{product.name}</h3>
                <p className='text-xs text-foreground/40 mb-1'>{product.brand}</p>

                {product.isOnSale ? (
                    <div className='flex items-baseline gap-2'>
                        <span className='text-sm text-foreground/40 line-through'>
                            PKR {product.price.toLocaleString()}
                        </span>
                        <span className='font-bold text-red-500'>
                            PKR {product.discountedPrice.toLocaleString()}
                        </span>
                    </div>
                ) : (
                    <span className='font-bold text-foreground'>
                        PKR {product.price.toLocaleString()}
                    </span>
                )}
            </div>

        </motion.div>
    )
}

export default ProductCard