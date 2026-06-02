'use client'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { motion } from "framer-motion"
import { useCart } from '@/app/context/CartContext'
import { usePopup } from '@/app/context/QuickPopupContext'
import { useRouter } from 'next/navigation'
import { useWishlist } from '@/app/context/WishlistContext'
import { PrimaryButton } from './Buttons'
import { seasonConfig } from '../Assets'

const ProductGridCard = ({ product, index }) => {

    const router = useRouter()
    const { togglePopup, handleProduct } = usePopup()
    const { handleAddCartItems, toggleCart } = useCart()
    const { toggleWishList, wishListItems } = useWishlist()

    const defaultPriceAndSize = product?.sizes?.find(size => size.isDefault) || product?.sizes?.[0] || null

    return (

        <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            viewport={{ once: true }}
            className='flex flex-col items-center border border-surface group/ProductGridCard hover:shadow-xl transition-shadow ease-in-out duration-500 h-fit w-fit'>

            <div className='relative w-75 h-75 overflow-hidden'>

                <Image
                    onClick={() => router.push(`/product/${product.slug}`)}
                    src={product.imgSrc}
                    alt={product.alt}
                    fill
                    priority
                    sizes='(max-width: 768px) 50vw, 25vw'
                    className='object-cover transition-transform duration-500 hover:scale-105'
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

                <motion.button
                    onClick={() => { toggleWishList(product._id) }}
                    className='absolute bottom-3 md:-bottom-10 right-3 md:group-hover/ProductGridCard:bottom-12 p-1.5 bg-background/80 backdrop-blur-sm rounded-full transition-all duration-300 cursor-pointer'>
                    <Heart
                        size={16}
                        className={wishListItems?.includes(product._id) ? 'fill-red-500 text-red-600' : 'text-foreground'}
                    />
                </motion.button>

                <motion.div
                    className='absolute -bottom-10 group-hover/ProductGridCard:bottom-0 left-0 right-0 flex items-center border-t border-foreground/10 transition-all ease-linear
                    bg-background/95 backdrop-blur-sm max-md:hidden'
                >
                    <button
                        onClick={() => { togglePopup(); handleProduct(product) }}
                        className='relative bg-background hover:bg-foreground/5 transition-colors ease-linear px-7 py-2 text-xs cursor-pointer border border-foreground/20 flex-1 items-center justify-center max-md:hidden'>
                        Quick View
                    </button>

                    <button
                        onClick={() => { handleAddCartItems(product); toggleCart() }}
                        className='relative group/btn bg-foreground px-7 py-2 text-xs cursor-pointer flex-1 items-center justify-center border border-foreground/20'>
                        <span className='relative z-10 text-background group-hover/btn:text-foreground transition-colors ease-linear duration-200'>Add to Cart</span>
                        <span className='absolute left-0 bottom-0 w-full h-0 group-hover/btn:h-full transition-all ease-linear duration-300 bg-background'></span>
                    </button>
                </motion.div>
            </div>


            <div className='p-4 w-full'>
                <div className='flex items-center gap-2'>
                    <h3 className='md:text-xl font-bold font-display'>{product.name}</h3>
                    <span className='text-sm max-md:hidden'>({defaultPriceAndSize.size})</span>
                </div>
                <p className='text-xs text-foreground/40 mb-1'>{product.brand}</p>

                {product.isOnSale ? (
                    <div className='flex items-baseline gap-2'>
                        <span className='max-md:text-[10px] text-xs text-foreground/40 line-through'>
                            PKR {defaultPriceAndSize.price.toLocaleString()}
                        </span>
                        <span className='font-bold text-red-600 max-md:text-sm'>
                            PKR {defaultPriceAndSize.discountedPrice.toLocaleString()}
                        </span>
                    </div>
                ) : (
                    <span className='max-md:text-sm font-bold text-foreground'>
                        PKR {defaultPriceAndSize.price.toLocaleString()}
                    </span>
                )}
            </div>
        </motion.div>
    )
}

export default ProductGridCard

const ProductListCard = ({ product, index }) => {

    const router = useRouter()
    const { handleAddCartItems, toggleCart } = useCart()
    const { toggleWishList, wishListItems } = useWishlist()
    const defaultPriceAndSize = product?.sizes?.find(size => size.isDefault) || product?.sizes?.[0] || null

    return (
        <>
            <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                viewport={{ once: true }}
                onClick={() => router.push(`/product/${product.slug}`)}
                className='flex items-center justify-start w-full border border-surface group/ProductListCard hover:bg-foreground/5 hover:shadow-xl transition-all ease-in-out duration-500'>
                <div className='w-90 h-80 relative overflow-hidden'>
                    <Image
                        src={product.imgSrc}
                        alt={product.name}
                        fill
                        priority
                        sizes='1000px'
                        className='object-cover group-hover/ProductListCard:scale-105 transition-all ease-linear duration-500' />
                </div>
                <div className='flex items-center justify-between w-full p-5'>

                    <div className='flex flex-col items-start gap-3'>
                        <div className='flex flex-col items-start'>
                            <div className='flex items-center justify-start gap-5'>
                                <h1 className='font-bold font-serif text-3xl tracking-wider'>{product.name}</h1>
                                <span className='font-semibold'>({defaultPriceAndSize.size})</span>
                            </div>
                            <h3 className='font-semibold'>{product.brand}</h3>
                            <p className='text-muted max-w-lg'>{product.description}</p>
                        </div>

                        <div className='flex flex-col gap-3 items-start'>
                            <div className='flex items-center justify-center gap-2'>
                                <span className={`px-2 py-1 text-xs font-medium
                    ${product.gender === 'Men'
                                        ? 'bg-blue-950 text-background'
                                        : product.gender === 'Women'
                                            ? 'bg-pink-900 text-background'
                                            : 'bg-foreground text-background'
                                    }`}>
                                    {product.gender}
                                </span>
                            </div>
                            <div className='flex items-center gap-2'>
                                {product.season.map((sea) => {
                                    const config = seasonConfig[sea]
                                    return (
                                        <span
                                            key={sea}
                                            className={`${config.color} ${config.bg} text-sm font-semibold tracking-[0.2em] uppercase px-3 py-1 border border-current/20`}
                                        >
                                            {config.icon} {sea}
                                        </span>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="actionSection flex flex-col gap-3 items-end">
                        {product.isOnSale ? (
                            <div className='flex flex-col items-end'>
                                <span className='px-2 py-1 text-xs font-semibold bg-red-500 text-white'>
                                    -{Math.round(((defaultPriceAndSize.price - defaultPriceAndSize.discountedPrice) / defaultPriceAndSize.price) * 100)}%
                                </span>
                                <span className='text-foreground/40 line-through text-sm'>
                                    PKR {defaultPriceAndSize.price.toLocaleString()}
                                </span>
                                <span className='font-bold text-red-600 text-xl'>
                                    PKR {defaultPriceAndSize.discountedPrice.toLocaleString()}
                                </span>
                                <span className='text-red-600 text-sm'>You save PKR {(defaultPriceAndSize.price - defaultPriceAndSize.discountedPrice).toLocaleString()}</span>
                            </div>
                        ) : (
                            <span className='font-bold text-foreground text-lg'>
                                PKR {defaultPriceAndSize.price.toLocaleString()}
                            </span>
                        )}
                        <div className='flex items-end justify-end gap-2 flex-wrap-reverse'>
                            <button
                                onClick={(e) => { e.stopPropagation(), toggleWishList(product._id) }}
                                className='border border-foreground/30 p-1.5 cursor-pointer'>
                                <Heart
                                    className={wishListItems?.includes(product._id) ? 'fill-red-500 text-red-600' : 'text-foreground/50'}
                                />
                            </button>

                            <span
                                onClick={(e) => { e.stopPropagation(), handleAddCartItems(product), toggleCart() }}>
                                <PrimaryButton text={'Add to Cart'} textSize='sm' />
                            </span>
                        </div>
                    </div>

                </div>
            </motion.div>
        </>
    )
}

export { ProductListCard }