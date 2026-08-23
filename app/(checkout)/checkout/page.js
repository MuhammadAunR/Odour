'use client'
import { Lock } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import React, { useState } from 'react'

const HandwrittenTick = ({ method = 'cod', selected }) => {
    return (
        <span className='absolute right-7'>
            <motion.svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                <motion.path
                    d='M4 12.5L9 17.5L20 6.5'
                    stroke='currentColor'
                    strokeWidth='3'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    initial={false}
                    animate={{
                        pathLength: selected === method ? 1 : 0,
                        opacity: selected === method ? 1 : 0,
                    }}
                    transition={{
                        pathLength: { duration: 0.35, ease: 'easeInOut' },
                        opacity: { duration: 0.1 },
                    }}
                />
            </motion.svg>
        </span>
    )
}

const CheckoutLayout = () => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",

        shippingAddress: {
            address: "",
            city: "",
            state: "",
            postalCode: "",
        },

        paymentMethod: "cod",
    });

    const handleFormData = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleShipingAddress = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            shippingAddress: {
                ...prev.shippingAddress,
                [name]: value
            }
        }))
    }

    return (
        <>
            <header className='w-10/12 bg-surface/50 mx-auto p-3 container-limit my-2 rounded-xl'>
                <div className='flex flex-col items-center justify-center gap-5 p-7'>
                    <h1 className='font-bold text-5xl font-display uppercase'>Odour</h1>
                    <span>Secure Checkout</span>
                    <span>
                        <Lock size={40} />
                    </span>
                </div>
                <div className='flex justify-end'>
                    <Link href={'/shop'} className='underline underline-offset-2 text-muted hover:text-foreground transition-colors ease-linear'>
                        Continue Shoping
                    </Link>
                </div>
            </header>

            <main className='grid grid-cols-1 lg:grid-cols-2 w-10/12 gap-5 mx-auto container-limit my-2'>
                <section className='space-y-3'>
                    <div className='bg-surface/50 rounded-xl p-5 space-y-5'>
                        <h2 className='font-bold text-2xl'>Personal Information</h2>
                        <div className='w-full h-px bg-muted'></div>

                        <label htmlFor="firstName"></label>
                        <input
                            type="text"
                            id='firstName'
                            name='firstName'
                            value={formData.firstName}
                            onChange={handleFormData}
                            placeholder='First Name'
                            className='bg-muted/5 text-lg text-muted px-5 py-2 w-full rounded-full outline-none border-2 border-muted/30 hover:border-muted transition-all ease-linear duration-300 focus:border-muted' />
                        <label htmlFor="lastName"></label>
                        <input
                            type="text"
                            id='lastName'
                            name='lastName'
                            value={formData.lastName}
                            onChange={handleFormData}
                            placeholder='Last Name'
                            className='bg-muted/5 text-lg text-muted px-5 py-2 w-full rounded-full outline-none border-2 border-muted/30 hover:border-muted transition-all ease-linear duration-300 focus:border-muted' />
                        <label htmlFor="email"></label>
                        <input
                            type="email"
                            id='email'
                            name='email'
                            value={formData.email}
                            onChange={handleFormData}
                            placeholder='Email'
                            className='bg-muted/5 text-lg text-muted px-5 py-2 w-full rounded-full outline-none border-2 border-muted/30 hover:border-muted transition-all ease-linear duration-300 focus:border-muted' />
                        <label htmlFor="phone"></label>
                        <input
                            type="text"
                            id='phone'
                            value={formData.phone}
                            onChange={handleFormData}
                            name='phone'
                            placeholder='Phone Number'
                            className='bg-muted/5 text-lg text-muted px-5 py-2 w-full rounded-full outline-none border-2 border-muted/30 hover:border-muted transition-all ease-linear duration-300 focus:border-muted' />
                    </div>

                    <div className='bg-surface/50 rounded-xl p-5 space-y-5'>
                        <h2 className='font-bold text-2xl'>Shipping Address</h2>
                        <div className='w-full h-px bg-muted'></div>

                        <label htmlFor="Address"></label>
                        <input
                            type="text"
                            id='Address'
                            name='address'
                            value={formData.shippingAddress.address}
                            onChange={handleShipingAddress}
                            placeholder='Address'
                            className='bg-muted/5 text-lg text-muted px-5 py-2 w-full rounded-full outline-none border-2 border-muted/30 hover:border-muted transition-all ease-linear duration-300 focus:border-muted' />
                        <label htmlFor="City"></label>
                        <input
                            type="text"
                            id='City'
                            name='city'
                            value={formData.shippingAddress.city}
                            onChange={handleShipingAddress}
                            placeholder='City'
                            className='bg-muted/5 text-lg text-muted px-5 py-2 w-full rounded-full outline-none border-2 border-muted/30 hover:border-muted transition-all ease-linear duration-300 focus:border-muted' />
                        <label htmlFor="State"></label>
                        <input
                            type="text"
                            id='State'
                            name='state'
                            value={formData.shippingAddress.state}
                            onChange={handleShipingAddress}
                            placeholder='State'
                            className='bg-muted/5 text-lg text-muted px-5 py-2 w-full rounded-full outline-none border-2 border-muted/30 hover:border-muted transition-all ease-linear duration-300 focus:border-muted' />
                        <label htmlFor="postalCode"></label>
                        <input
                            type="text"
                            id='postalCode'
                            name='postalCode'
                            value={formData.shippingAddress.postalCode}
                            onChange={handleShipingAddress}
                            placeholder='Postal Code'
                            className='bg-muted/5 text-lg text-muted px-5 py-2 w-full rounded-full outline-none border-2 border-muted/30 hover:border-muted transition-all ease-linear duration-300 focus:border-muted' />
                    </div>

                    <div className="bg-surface/50 rounded-xl p-5 space-y-5">
                        <h2 className="font-bold text-2xl">Payment Method</h2>
                        <div className="w-full h-px bg-muted" />

                        <label
                            htmlFor="cod"
                            className={`flex items-center gap-3 cursor-pointer border-2 border-muted/30 hover:border-muted transition-colors ease-linear duration-300 p-2 rounded-full has-checked:border-muted relative`}
                        >
                            <input
                                type="radio"
                                name="paymentMethod"
                                id="cod"
                                value="cod"
                                checked={formData.paymentMethod === 'cod'}
                                onChange={handleFormData}
                            />
                            <span className="font-semibold">Cash on Delivery</span>
                            <HandwrittenTick method='cod' selected={formData.paymentMethod} />
                        </label>

                        <label
                            htmlFor="card"
                            className={`flex items-center gap-3 cursor-pointer border-2 border-muted/30 hover:border-muted transition-colors ease-linear duration-300 p-2 rounded-full has-checked:border-muted relative`}
                        >
                            <input
                                type="radio"
                                name="paymentMethod"
                                id="card"
                                value="card"
                                checked={formData.paymentMethod === 'card'}
                                onChange={handleFormData}
                            />
                            <span className="font-semibold">Credit or Debit Card</span>
                            <HandwrittenTick method='card' selected={formData.paymentMethod} />
                        </label>

                    </div>
                </section>
                <aside>
                    Checkout Summery
                </aside>
            </main>
        </>
    )
}

export default CheckoutLayout