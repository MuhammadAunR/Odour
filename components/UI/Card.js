'use client'
import { Search, ShoppingBag, Heart } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { motion } from "framer-motion"
import { useCart } from '@/app/context/CartContext'
import { usePopup } from '@/app/context/QuickPopupContext'
import { useRouter } from 'next/navigation'
import { useWishlist } from '@/app/context/WishlistContext'


const ProductCard = ({ product, index }) => {

    const router = useRouter()
    const { togglePopup, handleProduct } = usePopup()
    const { handleAddCartItems } = useCart()
    const { toggleWishList, wishListItems } = useWishlist()

    const defaultPriceAndSize = product?.sizes?.find(size => size.isDefault) || product?.sizes?.[0] || null

    return (

        <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            viewport={{ once: true }}
            className='flex flex-col items-start border border-surface group/productCard hover:shadow-xl transition-shadow ease-in-out duration-500 h-fit w-fit'>

            <div className='relative w-77 h-100 overflow-hidden'>
                <Image
                    onClick={() => router.push(`/product/${product.slug}`)}
                    src={product.imgSrc}
                    alt={product.alt}
                    fill
                    priority
                    sizes='(max-width: 768px) 50vw, 25vw'
                    className='object-cover transition-transform duration-500 group-hover/productCard:scale-105'
                />


                <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-medium
                    ${product.gender === 'Men'
                        ? 'bg-blue-950 text-background'
                        : product.gender === 'Women'
                            ? 'bg-pink-900 text-background'
                            : 'bg-foreground text-background'
                    }`}>
                    {product.gender}
                </span>

                {product.isOnSale &&
                    <span className='absolute top-2 right-2 px-2 py-1 text-xs font-semibold bg-red-500 text-white'>
                        -{Math.round(((defaultPriceAndSize.price - defaultPriceAndSize.discountedPrice) / defaultPriceAndSize.price) * 100)}%
                    </span>
                }


                <button
                    onClick={() => { toggleWishList(product._id) }}
                    className='absolute bottom-14 right-3 p-1.5 bg-background/80 backdrop-blur-sm rounded-full
                    scale-0 group-hover/productCard:scale-100 transition-all duration-300'>
                    <Heart
                        size={16}
                        className={wishListItems?.includes(product._id) ? 'fill-red-500 text-red-500' : 'text-foreground'}
                    />
                </button>


                <div className='absolute bottom-0 left-0 right-0 
                    translate-y-full group-hover/productCard:translate-y-0
                    transition-transform duration-300 ease-in-out
                    flex items-center border-t border-foreground/10 bg-background/95 backdrop-blur-sm'>

                    <button
                        onClick={() => { togglePopup(); handleProduct(product) }}
                        className='flex-1 flex items-center justify-center gap-2 py-3 text-sm
                        hover:bg-foreground hover:text-background transition-colors duration-500
                        border-r border-foreground/10'>
                        <Search size={15} />
                        <span>Quick View</span>
                    </button>

                    <button
                        onClick={() => { handleAddCartItems(product) }}
                        className='flex-1 flex items-center justify-center gap-2 py-3 text-sm
                        hover:bg-foreground hover:text-background transition-colors duration-500'>
                        <ShoppingBag size={15} />
                        <span>Add to Cart</span>
                    </button>

                </div>
            </div>


            <div className='p-4 w-full'>
                <div className='flex items-center gap-2'>
                    <h3 className='text-xl font-bold font-display'>{product.name}</h3>
                    <span className='text-sm'>({defaultPriceAndSize.size})</span>
                </div>
                <p className='text-xs text-foreground/40 mb-1'>{product.brand}</p>

                {product.isOnSale ? (
                    <div className='flex items-baseline gap-2'>
                        <span className='text-sm text-foreground/40 line-through'>
                            PKR {defaultPriceAndSize.price.toLocaleString()}
                        </span>
                        <span className='font-bold text-red-500'>
                            PKR {defaultPriceAndSize.discountedPrice.toLocaleString()}
                        </span>
                    </div>
                ) : (
                    <span className='font-bold text-foreground'>
                        PKR {defaultPriceAndSize.price.toLocaleString()}
                    </span>
                )}
            </div>
        </motion.div>
    )
}

export default ProductCard