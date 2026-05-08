'use client'
import React, { useEffect, useState } from 'react'
import { usePopup } from '@/app/context/QuickPopupContext'
import { ShoppingBag, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import useBlockYScroll from './BlockYScroll'
import Image from 'next/image'
import { useCart } from '@/app/context/CartContext'
import { div } from 'motion/react-client'

const ProductQuickView = () => {

    const { togglePopup, isPopupOpen, quickViewProduct } = usePopup()
    const { handleAddCartItems } = useCart()

    useBlockYScroll(isPopupOpen)

    const [selectedPriceAndSize, setSelectedPriceAndSize] = useState(null)

    useEffect(() => {
        if (!quickViewProduct) return
        const defaultSize = quickViewProduct.sizes?.find(size => size.isDefault) || quickViewProduct.sizes?.[0] || null
        setSelectedPriceAndSize(defaultSize)
    }, [quickViewProduct])

    const handleDefaultPriceAndSize = (size) => {
        setSelectedPriceAndSize(size)
    }

    return (

        <AnimatePresence>
            {isPopupOpen && (
                <motion.main
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeIn' }}
                    onClick={togglePopup}
                    className='w-full h-screen flex items-center justify-center bg-foreground/10 backdrop-blur-3xl fixed z-100'
                >
                    <motion.section
                        onClick={(e) => e.stopPropagation()}
                        initial={{ opacity: 0, scale: 0.85, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 10,
                            mass: 0.8,
                        }}
                        className='w-200 min-h-150 h-fit bg-surface border border-foreground/30 relative'>

                        <div className='flex items-center justify-between p-5'>
                            <h2 className='font-semibold text-2xl'>Quick Product Details</h2>
                            <span
                                onClick={togglePopup}
                                className=' bg-foreground/10 rounded-full p-1 cursor-pointer'>
                                <X />
                            </span>
                        </div>

                        <div className='flex items-center justify-center gap-5 p-5'>
                            <div className='relative w-100 h-110 overflow-hidden'>
                                <Image src={quickViewProduct.imgSrc} fill alt={quickViewProduct.alt} className='object-cover' />
                            </div>
                            <div className='flex flex-col justify-center gap-4'>
                                <div>
                                    <h3 className='text-4xl font-black font-serif tracking-wider'>
                                        {quickViewProduct.name}
                                    </h3>
                                    <h4 className='text-lg font-semibold'>
                                        {quickViewProduct.brand}
                                    </h4>
                                    <p className='text-muted'>{quickViewProduct.description}</p>
                                </div>

                                <div className='w-full h-[.5px] bg-foreground/20'></div>
                                <div>
                                    {selectedPriceAndSize && (
                                        quickViewProduct.isOnSale && selectedPriceAndSize.discountedPrice !== null ? (
                                            <div className='flex flex-col gap-1'>
                                                <div className='flex items-center gap-5'>
                                                    <span className='font-bold text-red-500 text-lg'>
                                                        PKR {selectedPriceAndSize.discountedPrice.toLocaleString()}
                                                    </span>
                                                    <span className='px-2 py-1 text-xs font-semibold bg-red-500 text-white'>
                                                        -{Math.round(((selectedPriceAndSize.price - selectedPriceAndSize.discountedPrice) / selectedPriceAndSize.price) * 100)}%
                                                    </span>
                                                </div>
                                                <span className='text-sm text-foreground/40 line-through'>
                                                    PKR {selectedPriceAndSize.price.toLocaleString()}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className='font-bold text-foreground text-lg'>
                                                PKR {selectedPriceAndSize.price.toLocaleString()}
                                            </span>
                                        )
                                    )}
                                </div>
                                <div className='w-full h-[.5px] bg-foreground/20'></div>
                                <div className='flex items-center gap-2'>
                                    {quickViewProduct.sizes.map(item => {
                                        return <div
                                            onClick={() => handleDefaultPriceAndSize(item)}
                                            key={item.size}
                                            className={`px-3 py-1 transition-all ease-linear duration-300 cursor-pointer ${selectedPriceAndSize?.size === item.size ? 'bg-foreground text-background' : 'bg-foreground/10 text-foreground hover:bg-foreground/15'}`}>
                                            {item.size}
                                        </div>
                                    })}
                                </div>
                                <div className='w-full h-[.5px] bg-foreground/20'></div>
                                <div className='text-lg'>{quickViewProduct.fragranceFamily}</div>
                                <div className='w-full h-[.5px] bg-foreground/20'></div>
                                <div className='flex items-center justify-center gap-2'>
                                    <button
                                        className='flex-1 flex items-center justify-center gap-2 py-3 text-sm bg-foreground/5
                                        hover:bg-muted hover:text-background transition-colors duration-500
                                        border-r border-foreground/10'>
                                        {/* <Search size={15} /> */}
                                        <span>See full details</span>
                                    </button>

                                    <button
                                        onClick={() => handleAddCartItems(quickViewProduct)}
                                        className='flex-1 flex items-center justify-center gap-2 py-3 text-sm bg-foreground/5
                                        hover:bg-muted hover:text-background transition-colors duration-500'>
                                        <ShoppingBag size={15} />
                                        <span>Add to Cart</span>
                                    </button>
                                </div>

                            </div>
                        </div>

                    </motion.section>
                </motion.main>
            )}
        </AnimatePresence>
    )
}

export default ProductQuickView
