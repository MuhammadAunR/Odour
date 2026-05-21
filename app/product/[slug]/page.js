'use client'
import { useCart } from '@/app/context/CartContext'
import { useProducts } from '@/app/context/ProductContext'
import ProductCard from '@/components/CardUI'
import Loader from '@/components/LoaderUI'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { avatarColors, stats, stripeItems, testimonials, WhyChooseUsData } from '@/components/Assets'
import CountUp from 'react-countup'
import ScrollToTopBtn from '@/components/ScrollToTopBtn'
import SectionHeader from '@/components/SectionHeader'

const Product = ({ params }) => {

    const { handleAddCartItems, selectedPriceAndSize, setSelectedPriceAndSize } = useCart()
    const { products } = useProducts()

    const { slug } = useParams(params)

    const intervalRef = useRef(null)
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [productQty, setProductQty] = useState(1)
    const [relatedProducts, setRelatedProducts] = useState([])
    const [testimonialCount, setTestimonialCount] = useState(0)
    const [stopTestimonialMovement, setStopTestimonialMovement] = useState(false)
    const [stripMotion, setStripMotion] = useState(true)

    const seasonConfig = {
        Summer: { label: 'Summer', color: 'text-amber-500', bg: 'bg-amber-400/10', icon: '☀' },
        Spring: { label: 'Spring', color: 'text-green-500', bg: 'bg-green-400/10', icon: '✿' },
        Fall: { label: 'Fall', color: 'text-orange-600', bg: 'bg-orange-500/10', icon: '🍂' },
        Winter: { label: 'Winter', color: 'text-blue-400', bg: 'bg-blue-300/10', icon: '❄' },
    }

    useEffect(() => {
        async function fetchProductBySlug(slug) {
            try {
                const res = await fetch(`/api/products/${slug}`)
                if (!res.ok) throw new Error('Product not found')
                const data = await res.json()
                setProduct(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        if (slug) fetchProductBySlug(slug)
    }, [slug])

    useEffect(() => {
        if (!product) return
        const defaultSize = product.sizes?.find(size => size.isDefault) || product.sizes?.[0] || null
        setSelectedPriceAndSize(defaultSize)
    }, [product])

    useEffect(() => {
        if (!product || !products.length) return

        const related = products
            .filter(p => p._id !== product._id)
            .map(p => {
                let score = 0
                if (p.gender === product.gender) score += 3
                if (p.fragranceFamily === product.fragranceFamily) score += 2
                if (p.season.some(s => product.season.includes(s))) score += 1
                return { ...p, score }
            })
            .filter(p => p.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 4)

        setRelatedProducts(related)
    }, [product, products])

    const handleDefaultPriceAndSize = (size) => {
        setSelectedPriceAndSize(size)
    }

    const handleProductQtyInc = () => {
        if (productQty === 10) return
        setProductQty(prev => prev + 1)
    }
    const handleProductQtyDec = () => {
        if (productQty === 1) return
        setProductQty(prev => prev - 1)
    }

    const handleForwardTestimonials = () => {
        if (testimonialCount < testimonials.length - 1) {
            const newCount = testimonialCount + 1
            setTestimonialCount(newCount)
        } else {
            setTestimonialCount(0)
        }
    }
    const handleBackwardTestimonials = () => {
        if (testimonialCount > 0) {
            const newCount = testimonialCount - 1
            setTestimonialCount(newCount)
        } else {
            setTestimonialCount(4)
        }
    }

    const handleTestimonialMovement = () => {
        setStopTestimonialMovement(!stopTestimonialMovement)
    }

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTestimonialCount(prev =>
                prev < testimonials.length - 1 ? prev + 1 : 0
            )
        }, 3000)

        return () => clearInterval(intervalRef.current)
    }, [])


    if (loading) {
        return (
            <div className='h-screen w-full'>
                <Loader />
            </div>
        )
    }
    if (!product) {
        return (
            <div className='h-screen w-full flex items-center justify-center text-4xl'>
                Product not found
            </div>
        )
    }
    return (
        <>
            <main className='w-10/12 mx-auto'>

                <div className='w-full min-h-[calc(100%-100px)] py-15 h-fit flex justify-center gap-3 lg:gap-5 max-lg:flex-col'>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className='relative w-full lg:w-1/2 h-150 border-2 box-border border-surface shadow-[1px_1px_5px_rgba(0,0,0,0.5)]'>
                        <Image
                            src={product.imgSrc}
                            fill
                            sizes='1000px'
                            priority
                            alt={product.alt}
                            className='object-cover' />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className='flex flex-col justify-center gap-4 bg-surface/30 border-2 box-border border-surface shadow-[1px_1px_5px_rgba(0,0,0,0.5)] p-5 
                    lg:w-1/2 min-h-150 h-fit'>
                        <div>
                            <div className='flex items-baseline gap-5'>
                                <h3 className='text-3xl lg:text-4xl xl:text-5xl font-black font-serif tracking-widest'>{product.name}</h3>
                                <span className='font-semibold uppercase max-lg:text-sm'>For {product.gender}</span>
                            </div>
                            <h4 className='md:text-lg font-semibold'>{product.brand}</h4>
                            <p className='max-md:text-sm text-muted'>{product.description}</p>
                        </div>

                        <div className='w-full h-[.5px] bg-foreground/20'></div>

                        <div>
                            {selectedPriceAndSize && (
                                product.isOnSale && selectedPriceAndSize.discountedPrice !== null ? (
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
                            {product.sizes.map(item => {
                                return <div
                                    onClick={() => handleDefaultPriceAndSize(item)}
                                    key={item.size}
                                    className={`px-3 py-1 transition-all ease-linear duration-300 cursor-pointer ${selectedPriceAndSize?.size === item.size ? 'bg-foreground text-background' : 'bg-foreground/10 text-foreground hover:bg-foreground/15'}`}>
                                    {item.size}
                                </div>
                            })}
                        </div>

                        <div className='w-full h-[.5px] bg-foreground/20'></div>

                        <div className='flex items-center gap-3'>
                            <span className='tracking-[0.2em] uppercase text-foreground/50'>Fragrance |</span>
                            <span className='text-sm font-medium'>{product.fragranceFamily}</span>
                        </div>

                        {/* <div className='w-full h-[.5px] bg-foreground/20'></div>

                        <div className='flex items-center gap-3'>
                            <span className='tracking-[0.2em] uppercase text-foreground/50'>For |</span>
                            <span className='text-sm font-medium'>{product.gender}</span>
                        </div> */}

                        <div className='w-full h-[.5px] bg-foreground/20'></div>

                        <div className='flex items-center gap-3'>
                            <span className='tracking-[0.2em] uppercase text-foreground/50'>Concentration |</span>
                            <span className='text-sm font-medium'>{product.concentration}</span>
                        </div>

                        <div className='w-full h-[.5px] bg-foreground/20'></div>

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

                        <div className='w-full h-[.5px] bg-foreground/20'></div>

                        <div className='flex items-center justify-center gap-2 max-sm:flex-col'>
                            <div className='flex'>
                                <span onClick={() => handleProductQtyDec(product)} className='border px-5 py-3 font-bold hover:bg-foreground/10 transition-colors ease-linear cursor-pointer select-none'>-</span>
                                <span className='border px-7 py-3 font-bold'>{productQty}</span>
                                <span onClick={() => handleProductQtyInc(product)} className='border px-5 py-3 font-bold hover:bg-foreground/10 transition-colors ease-linear cursor-pointer select-none'>+</span>
                            </div>
                            <button
                                onClick={() => handleAddCartItems(
                                    product, { selectedSize: selectedPriceAndSize, qty: productQty })}
                                className='flex-1 max-sm:w-full flex items-center justify-center gap-2 py-3 bg-foreground cursor-pointer text-background'>
                                <span>Add to Cart</span>
                            </button>
                        </div>
                    </motion.div>
                </div>

                <section>
                    <SectionHeader headerContent={{ subHeading: 'You Might Also Like', mainHeading: 'Related Products' }} />

                    <div className='flex items-center justify-center flex-wrap gap-2 pb-10'>
                        {relatedProducts.map((prod, index) => {
                            return <ProductCard key={prod.id} product={prod} index={index} />
                        })}
                    </div>

                </section>


                <section>
                    <SectionHeader headerContent={{ subHeading: 'What Our Clients Say', mainHeading: 'Testimonials' }} />

                    <div className='flex flex-col gap-5 items-center justify-center pb-10'>
                        <div
                            onMouseEnter={() => clearInterval(intervalRef.current)}
                            onMouseLeave={() => {
                                intervalRef.current = setInterval(() => {
                                    setTestimonialCount(prev =>
                                        prev < testimonials.length - 1 ? prev + 1 : 0
                                    )
                                }, 3000)
                            }}
                            className='w-full md:w-150 p-7 bg-surface/50 shadow-[1px_1px_5px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center gap-5'>
                            <AnimatePresence mode='wait'>
                                <motion.p
                                    key={`review-${testimonialCount}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className='text-muted font-semibold text-justify'>
                                    "{testimonials[testimonialCount]?.review}"
                                </motion.p>
                            </AnimatePresence>

                            <div className='flex items-center gap-3'>
                                <AnimatePresence mode='wait'>
                                    <motion.div
                                        key={`avatar-${testimonialCount}`}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                        className={`w-10 h-10 ${avatarColors[testimonialCount]} text-white flex items-center justify-center rounded-full`}>
                                        {testimonials[testimonialCount]?.initials}
                                    </motion.div>
                                </AnimatePresence>

                                <AnimatePresence mode='wait'>
                                    <motion.span
                                        key={`name-${testimonialCount}`}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.3, delay: 0.15 }}
                                        className='font-serif tracking-wider text-lg font-bold'>
                                        {testimonials[testimonialCount]?.name}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </div>

                        <div className='flex items-center justify-center gap-5'>
                            <motion.div
                                whileTap={{ scale: 0.95 }}
                                onClick={handleBackwardTestimonials}
                                className='bg-background p-2 rounded-full border-2 border-foreground/20 hover:bg-foreground hover:border-surface hover:text-background transition-all ease-linear duration-300 cursor-pointer '>
                                <ChevronLeft size={18} />
                            </motion.div>
                            <motion.div
                                whileTap={{ scale: 0.95 }}
                                onClick={handleForwardTestimonials}
                                className='bg-background p-2 rounded-full border-2 border-foreground/20 hover:bg-foreground hover:border-surface hover:text-background transition-all ease-linear duration-300 cursor-pointer '>
                                <ChevronRight size={18} />
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className='py-10 my-20 border-t border-b border-foreground/10'>
                    <div className='flex items-center justify-center gap-0'>
                        {stats.map((stat, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                key={stat.label} className='flex flex-col items-center justify-center gap-1 px-16 border-r border-foreground/10 last:border-r-0'>
                                <div className='flex items-baseline gap-0.5'>
                                    <CountUp
                                        end={stat.end}
                                        duration={4}
                                        className='text-5xl font-black font-serif tracking-wide'
                                    />
                                    <span className='text-4xl tracking-wide'>{stat.suffix}</span>
                                </div>
                                <span className='text-xs tracking-[0.2em] uppercase text-foreground/50'>
                                    {stat.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section>
                    <SectionHeader headerContent={{ subHeading: 'The Odour Promise', mainHeading: 'Why Choose Us' }} />

                    <div className='flex items-center justify-center gap-2 flex-wrap pb-10'>
                        {WhyChooseUsData.map((reason, index) => {
                            return <div
                                style={{
                                    animation: 'cardBeat 1.5s ease-in-out infinite',
                                    animationDelay: `${index * 0.2}s`,
                                }}
                                key={reason.title}
                                className='flex flex-col items-center justify-center gap-3 w-100 min-h-80 bg-radial from-background via-surface/50 to-surface p-5 border border-transparent hover:border-foreground/60 transition-all ease-linear'>
                                <span className='text-3xl'>{reason.icon}</span>
                                <h3 className='text-3xl font-serif font-bold tracking-wider'>{reason.title}</h3>
                                <p className='text-justify text-muted font-semibold'>{reason.description}</p>
                            </div>
                        })}
                    </div>
                </section>

                <section>
                    <div
                        onMouseEnter={() => setStripMotion(false)}
                        onMouseLeave={() => setStripMotion(true)}
                        className='overflow-hidden border-t border-b border-foreground/10 py-4 my-20'>
                        <div
                            style={{
                                animation: 'stripeMarquee 20s linear infinite',
                                animationPlayState: stripMotion ? 'running' : 'paused'
                            }}
                            className='flex gap-10 w-max'>
                            {[...stripeItems, ...stripeItems].map((item, index) => (
                                <span key={index} className='flex items-center gap-10 tracking-[0.3em] uppercase text-foreground/70 whitespace-nowrap'>
                                    {item}
                                    <span className='text-foreground/20'>✦</span>
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            </main >
        </>
    )
}

export default Product
