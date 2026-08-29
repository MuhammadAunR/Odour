'use client'
import { useCart } from '@/app/context/CartContext'
import { CartItemSkeleton } from '@/components/main/SkeletonUI'
import { Banknote, Check, ChevronLeft, CircleAlert, Lock } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'


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
    const { cartItemInLS, handleSubTotal } = useCart()
    const [cartItemLoaded, setCartItemLoaded] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const isEmailValid = useRef(true)

    const steps = ["Cart", "Information", "Shipping", "Payment"];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isStep1Valid = cartItemInLS.length > 0
    const isStep2Valid = formData.firstName.trim() &&
        formData.lastName.trim() &&
        formData.email.trim() &&
        formData.phone.trim();

    const isStep3Valid = formData.shippingAddress.address.trim() &&
        formData.shippingAddress.city.trim() &&
        formData.shippingAddress.state.trim() &&
        formData.shippingAddress.postalCode.trim();

    let subTotal = handleSubTotal
    let tax = Math.floor((subTotal * 5) / 100)
    let total = subTotal + tax

    useEffect(() => {
        setCartItemLoaded(true)
    }, [])

    const handleFormData = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        if (name === 'email') {
            if (!emailRegex.test(value)) {
                isEmailValid.current = false
            } else {
                isEmailValid.current = true
            }
        }
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

    useEffect(() => {
        if (isStep1Valid && isStep2Valid && isStep3Valid) {
            setCurrentStep(3);
        } else if (isStep1Valid && isStep2Valid) {
            setCurrentStep(2);
        } else if (isStep1Valid) {
            setCurrentStep(1);
        } else {
            setCurrentStep(0);
        }
    }, [isStep1Valid, isStep2Valid, isStep3Valid]);

    return (
        <>

            <header className="border-b border-muted bg-surface/50 backdrop-blur-lg z-50 fixed w-full">
                <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link href="/cart" className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors ease-linear duration-300">
                        <ChevronLeft size={18} />
                        Back to cart
                    </Link>

                    <Link href="/" className="text-2xl tracking-widest font-display">
                        ODOUR
                    </Link>

                    <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                        <Banknote size={20} />
                        <span>Currency: PKR</span>
                    </div>
                </div>


                <div className="max-w-6xl mx-auto px-6 pb-4 flex items-center gap-2">
                    {steps.map((step, i) => (
                        <div key={step} className="flex items-center gap-2">
                            <div className={`flex items-center gap-1.5 text-xs font-medium ${i <= currentStep ? "text-neutral-900" : "text-neutral-400"
                                } transition-colors ease-linear duration-300`}>
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] 
                                ${i < currentStep ? "bg-neutral-900 text-white" :
                                        i === currentStep ? "border border-neutral-900" : "border border-neutral-300"
                                    } transition-all ease-linear duration-300`}>
                                    {i < currentStep ? <Check size={11} /> : i + 1}
                                </span>
                                {step}
                            </div>
                            {i < steps.length - 1 && <div className="w-8 h-px bg-neutral-300" />}
                        </div>
                    ))}
                </div>
            </header>


            <main className='grid grid-cols-1 lg:grid-cols-2 max-lg:px-5 lg:w-10/12 gap-5 mx-auto container-limit mt-30 mb-7 relative'>

                <section className='space-y-3'>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.95, delay: 0.1 }}
                        viewport={{ once: true }}
                        className='bg-surface/50 rounded-xl p-5 space-y-5'>
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
                        <div className='relative'>
                            <label htmlFor="email"></label>
                            <input
                                type="email"
                                id='email'
                                name='email'
                                value={formData.email}
                                onChange={handleFormData}
                                placeholder='Email'
                                className='bg-muted/5 text-lg text-muted px-5 py-2 w-full rounded-full outline-none border-2 border-muted/30 hover:border-muted transition-all ease-linear duration-300 focus:border-muted' />
                            <span className={`absolute right-5 top-3 text-red-500 ${isEmailValid.current ? 'scale-0' : 'scale-100'} transition-all ease-linear duration-300`}><CircleAlert /></span>
                        </div>
                        <label htmlFor="phone"></label>
                        <input
                            type="text"
                            id='phone'
                            value={formData.phone}
                            onChange={handleFormData}
                            name='phone'
                            placeholder='Phone Number'
                            className='bg-muted/5 text-lg text-muted px-5 py-2 w-full rounded-full outline-none border-2 border-muted/30 hover:border-muted transition-all ease-linear duration-300 focus:border-muted' />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.95, delay: 0.2 }}
                        viewport={{ once: true }}
                        className='bg-surface/50 rounded-xl p-5 space-y-5'>
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
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.95, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="bg-surface/50 rounded-xl p-5 space-y-5">
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

                    </motion.div>
                </section>

                <motion.aside
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.95, delay: 0.1 }}
                    viewport={{ once: true }}
                    className='bg-surface/50 p-5 rounded-xl h-fit sticky top-30'>
                    <h2 className='font-bold text-2xl pb-5'>Checkout Summary</h2>
                    <div className='space-y-7'>
                        <section className='overflow-y-auto'>
                            {!cartItemLoaded ?
                                <div className='w-full flex flex-col gap-2'>
                                    {Array.from({ length: 3 }).map((_, i) => {
                                        return <CartItemSkeleton key={i} />
                                    })}
                                </div>
                                : cartItemInLS.length === 0 ?
                                    <div className='w-full text-center font-semibold text-muted py-5'>
                                        Your cart is empty
                                    </div>
                                    : cartItemInLS.map(item => {
                                        return <div key={item._id} className='flex items-start justify-between border-b border-muted p-3'>
                                            <div className='flex items-start gap-5'>
                                                <div className='relative w-20 h-20 rounded-xl overflow-hidden'>
                                                    <Image
                                                        src={item.images[0].url}
                                                        alt={item.name}
                                                        fill
                                                        sizes='240px'
                                                        loading='eager'
                                                        className='w-full h-full object-cover' />
                                                </div>
                                                <div className='flex flex-col items-start gap-1'>
                                                    <h3 className='font-bold'>{item.name}</h3>
                                                    <div className='flex items-center gap-2 text-muted font-semibold'>
                                                        <span>{item.variants[0].size}</span>
                                                        <span className='w-px h-5 bg-muted'></span>
                                                        <span>{item.gender[0].name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex flex-col items-end'>
                                                <span className='font-semibold text-lg'>
                                                    {(item.effectivePrice * item.quantity).toLocaleString()}
                                                </span>
                                                <span className='text-sm font-semibold text-muted'>
                                                    Qty:  {item.quantity}
                                                </span>
                                            </div>
                                        </div>
                                    })}
                        </section>

                        <div className='flex gap-3'>
                            <label htmlFor="promo"></label>
                            <input
                                type="text"
                                id='promo'
                                name='promoCode'
                                placeholder='Promo Code'
                                className='bg-muted/5 text-lg text-muted px-5 py-2 w-full rounded-full outline-none border-2 border-muted/30 hover:border-muted transition-all ease-linear duration-300 focus:border-muted' />
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                className='bg-muted/5 text-lg text-foreground px-5 py-2 rounded-full border-2 border-muted hover:border-foreground transition-all ease-linear duration-300 cursor-pointer uppercase'>
                                Apply
                            </motion.button>
                        </div>

                        <section className='border-t border-b py-5 border-muted'>
                            <div className='space-y-2'>
                                <div className='flex items-center justify-between font-semibold text-muted lg:text-lg'>
                                    <span>Subtotal</span>
                                    <span>{subTotal.toLocaleString()}</span>
                                </div>
                                <div className='flex items-center justify-between font-semibold text-muted lg:text-lg'>
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className='flex items-center justify-between font-semibold text-muted lg:text-lg'>
                                    <span>Tax</span>
                                    <span>{tax.toLocaleString()}</span>
                                </div>
                            </div>
                            <div className='w-full h-px bg-muted my-3'></div>
                            <div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-xl lg:text-2xl font-bold'>Total</span>
                                    <span className='text-xl lg:text-2xl font-bold'>{subTotal && total.toLocaleString()}</span>
                                </div>
                            </div>
                        </section>

                        <div className='w-full flex flex-col gap-5 items-center justify-center'>
                            <motion.button
                                disabled={!isStep1Valid || !isStep2Valid || !isStep3Valid || !isEmailValid}
                                whileTap={{ scale: 0.95 }}
                                className='bg-foreground w-full font-bold lg:text-xl text-background px-10 py-3 rounded-full border-2 border-foreground hover:bg-background hover:text-foreground transition-all ease-linear duration-300 cursor-pointer tracking-widest uppercase disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:bg-foreground disabled:hover:text-background'>
                                Place Order
                            </motion.button>
                            <div className='flex items-center justify-center gap-2'>
                                <span><Lock strokeWidth={1} size={16} /></span>
                                <span className='text-sm'>Encrypted and secure payment</span>
                            </div>
                        </div>
                    </div>
                </motion.aside>
            </main>
        </>
    )
}

export default CheckoutLayout