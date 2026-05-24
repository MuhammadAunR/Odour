'use client'
import { useCart } from '@/app/context/CartContext'
import { ShoppingCart, Trash, X } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
import { motion } from "framer-motion"
import { PrimaryButton } from './UI/Buttons'
import Link from 'next/link'
import useBlockYScroll from './BlockYScroll'


const Cart = () => {

    const { toggleCart, isCartOpen, cartItems, handleSubTotal, removeCartItem, handleItemDec, handleItemInc, handleCheckout } = useCart()

    useBlockYScroll(isCartOpen)

    return (
        <main className='w-full flex'>

            <section onClick={toggleCart} className={`bg-surface/50 backdrop-blur-lg h-screen fixed top-0 z-200 w-full ${isCartOpen ? 'block' : 'hidden'}`}>
            </section>

            <aside
                className={`h-screen w-full bg-surface max-w-100 fixed top-0 right-0 z-200 flex flex-col transition-all ease-linear ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >

                <div className='flex items-center justify-between px-5 py-6.5 border-b-2 border-accent shrink-0'>
                    <h3 className='text-2xl font-semibold'>Your Cart</h3>
                    <span onClick={toggleCart}>
                        <X size={28} className='cursor-pointer hover:rotate-180 hover:text-accent transition-all ease-linear' />
                    </span>
                </div>

                <section className='flex-1 overflow-y-auto py-5 space-y-1'>
                    {cartItems.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: false }}
                            className='flex flex-col gap-2 items-center justify-center h-full'
                        >
                            <span><ShoppingCart size={80} color='grey' /></span>
                            <span className='text-lg'>Your cart is empty</span>
                            <Link href={'/shop'} onClick={toggleCart} className=''>
                                <PrimaryButton text={'Go To Shop'} />
                            </Link>
                        </motion.div>
                    )}
                    {cartItems.map((item, index) => (
                        <div key={index} className='flex items-center gap-3 px-5 py-3 mx-1 hover:bg-foreground/5 transition-all ease-linear bg-background/50 relative group'>
                            <motion.span
                                onClick={() => removeCartItem(item)}
                                whileTap={{ scale: 0.95 }}
                                className='absolute top-1 right-1 group-hover:opacity-100 opacity-0 transition-opacity ease-linear cursor-pointer'>
                                <Trash size={14} color='red' />
                            </motion.span>

                            <div className='relative w-15 h-15 overflow-hidden shrink-0'>
                                <Image
                                    src={item.imgSrc}
                                    alt={item.alt}
                                    fill
                                    loading='lazy'
                                    sizes="60px"
                                    className='object-cover rounded-full'
                                />
                            </div>

                            <div className='flex flex-col flex-1 min-w-0'>
                                <div className='flex items-center gap-2'>
                                    <h3 className='truncate'>{item.name}</h3>
                                    <span className='text-sm'>({item.selectedSize.size})</span>
                                </div>
                                <span className='text-sm text-gray-400'>{item.brand}</span>
                            </div>

                            <span className='text-sm font-semibold whitespace-nowrap gap-2 flex flex-col items-center justify-center'>
                                {(() => {
                                    const priceToDisplay = item.selectedSize.discountedPrice ?? item.selectedSize.price;
                                    return <span className='text-accent' >
                                        <span className='text-[10px]'>PKR</span> {priceToDisplay * item.quantity
                                        }
                                    </span>
                                })()}
                                <div className='flex'>
                                    <span onClick={() => handleItemDec(item)} className='border px-3 py-1 font-bold hover:bg-surface transition-colors ease-linear cursor-pointer'>-</span>
                                    <span className='border px-3 py-1 font-bold'>{item.quantity}</span>
                                    <span onClick={() => handleItemInc(item)} className='border px-3 py-1 font-bold hover:bg-surface transition-colors ease-linear cursor-pointer'>+</span>
                                </div>
                            </span>
                        </div>
                    ))}
                </section>

                {cartItems.length > 0 && <div
                    className='px-5 space-y-5 border-t-2 border-accent py-4 shrink-0 sticky bottom-0 w-full'>
                    <div className='flex items-center justify-between'>
                        <h3 className='text-2xl font-semibold'>Subtotal</h3>
                        <span className='text-red-500 text-xl font-semibold'>
                            <span className='text-xs'>PKR</span> {handleSubTotal}
                        </span>
                    </div>
                    <span onClick={() => { toggleCart(), handleCheckout() }} className='flex flex-col items-end'>
                        <span>
                            <PrimaryButton text={'Check Out'} />
                        </span>
                    </span>
                </div>
                }
            </aside>
        </main >
    )
}

export default Cart