'use client'
import { useCart } from '@/app/context/CartContext'
import { useProducts } from '@/app/context/ProductContext'
import ProductGridCard from '@/components/UI/Card'
import Loader from '@/components/LoaderUI'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { avatarColors, seasonConfig, stats, stripeItems, testimonials, WhyChooseUsData } from '@/components/main/Assets'
import CountUp from 'react-countup'
import SectionHeader from '@/components/main/SectionHeader'
import ProductNotFound from '@/components/main/NotFoundError'

const Product = ({ params }) => {

    const { addCartItemIdToLS, selectedPriceAndSize, setSelectedPriceAndSize, toggleCart } = useCart()
    const { products } = useProducts()

    const { slug } = useParams(params)

    const intervalRef = useRef(null)
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [productQty, setProductQty] = useState(1)
    const [relatedProducts, setRelatedProducts] = useState([])
    const [testimonialCount, setTestimonialCount] = useState(0)
    const [stripMotion, setStripMotion] = useState(true)

    const fetchBySlug = useCallback(
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
        },
        [slug],
    )

    useEffect(() => {
        if (slug) fetchProductBySlug(slug)
    }, [slug])

    useEffect(() => {
        if (!product) return
        const defaultSize = product?.variants?.find((variant) => variant.originalPrice == product.defaultPrice) ||
            product?.variants?.[0] ||
            null;
        setSelectedPriceAndSize(defaultSize)
    }, [product])

    useEffect(() => {
        if (!product || !products.length) return

        const related = products
            .filter(p => p._id !== product._id)
            .map(p => {
                let score = 0
                if (p.gender.some(s => product?.gender.name?.includes(s.name))) score += 3
                if (p.fragranceFamily.some(s => product?.fragranceFamily.name?.includes(s.name))) score += 2
                if (p.season.some(s => product?.season.name?.includes(s.name))) score += 1
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
            <ProductNotFound />
        )
    }
    return (
        <>
            <main className='lg:w-10/12 lg:mx-auto lg:px-0 px-5 max-w-7xl w-full'>

                {/*  Product Details Section */}
                <div className='w-full min-h-[calc(100%-100px)] py-15 h-fit flex justify-center gap-3 lg:gap-5 max-lg:flex-col'>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className='relative w-full lg:w-1/2 h-150 border border-foreground'>
                        <Image
                            src={product.images[0].url}
                            fill
                            sizes=''
                            priority
                            alt={product.name}
                            className='object-cover' />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className='flex flex-col justify-center gap-4 bg-surface/30 p-5 border border-foreground
                    lg:w-1/2 min-h-150 h-fit'>
                        <div>
                            <div className='flex items-baseline gap-5'>
                                <h3 className='text-3xl lg:text-4xl xl:text-5xl font-semibold font-serif tracking-wide'>{product.name}</h3>
                            </div>
                            <p className='max-md:text-sm text-muted line-clamp-3'>{product.description}</p>
                        </div>

                        <div className='w-full h-[.5px] bg-foreground/10'></div>

                        <div>
                            {selectedPriceAndSize && (
                                selectedPriceAndSize.salePrice !== null ? (
                                    <div className='flex items-baseline gap-5'>
                                        <span className='text-sm text-foreground/40 line-through'>
                                            PKR {selectedPriceAndSize.originalPrice.toLocaleString()}
                                        </span>
                                        <div className='flex items-center gap-5'>
                                            <span className='font-bold text-red-500 text-lg'>
                                                PKR {selectedPriceAndSize.salePrice.toLocaleString()}
                                            </span>
                                            <span className='px-2 py-1 text-xs font-semibold bg-red-500 text-white'>
                                                -{Math.round(((selectedPriceAndSize.originalPrice - selectedPriceAndSize.salePrice) / selectedPriceAndSize.originalPrice) * 100)}%
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <span className='font-bold text-foreground text-lg'>
                                        PKR {selectedPriceAndSize.originalPrice.toLocaleString()}
                                    </span>
                                )
                            )}
                        </div>

                        <div className='w-full h-[.5px] bg-foreground/10'></div>

                        <div className='flex items-center gap-2'>
                            {product.variants.map(variant => {
                                return <div
                                    onClick={() => handleDefaultPriceAndSize(variant)}
                                    key={variant.size}
                                    className={`px-3 py-1 transition-all ease-linear duration-300 cursor-pointer 
                                    ${selectedPriceAndSize?.size === variant.size ? 'bg-foreground text-background' : 'bg-foreground/10 text-foreground hover:bg-foreground/15'}`}>
                                    {variant.size}
                                </div>
                            })}
                        </div>

                        <div className='w-full h-[.5px] bg-foreground/10'></div>

                        <div className='flex items-center gap-3'>
                            {product.fragranceFamily.map(family => {
                                return <span
                                    key={family._id}
                                    className='text-sm font-semibold tracking-[0.2em] text-foreground/70 uppercase border border-foreground/30 py-1 px-3'>
                                    {family.name}
                                </span>
                            })}
                        </div>

                        <div className='w-full h-[.5px] bg-foreground/10'></div>

                        <div className="flex items-center gap-3">
                            {product.gender.map((gen) => (
                                <span
                                    key={gen._id}
                                    className={`text-sm font-semibold tracking-[0.2em] uppercase border py-1 px-3
                                    ${gen.name === "Men"
                                            ? "bg-blue-950 text-background border-blue-950"
                                            : gen.name === "Women"
                                                ? "bg-pink-900 text-background border-pink-900"
                                                : "bg-foreground text-background border-foreground"
                                        }`}
                                >
                                    {gen.name}
                                </span>
                            ))}
                        </div>

                        <div className='w-full h-[.5px] bg-foreground/10'></div>

                        <div className='flex items-center gap-2'>
                            {product.season.map((sea) => {
                                const config = seasonConfig[sea.name]
                                return (
                                    <span
                                        key={sea._id}
                                        className={`${config.color} ${config.bg} text-sm font-semibold tracking-[0.2em] uppercase px-3 py-1 border border-current/20`}
                                    >
                                        {config.icon} {sea.name}
                                    </span>
                                )
                            })}
                        </div>

                        <div className='w-full h-[.5px] bg-foreground/10'></div>

                        <div className='flex items-center justify-center gap-2 max-sm:flex-col'>
                            <div className='flex'>
                                <span onClick={() => handleProductQtyDec(product)} className='border px-5 py-3 font-bold hover:bg-foreground/10 transition-colors ease-linear cursor-pointer select-none'>-</span>
                                <span className='border px-7 py-3 font-bold'>{productQty}</span>
                                <span onClick={() => handleProductQtyInc(product)} className='border px-5 py-3 font-bold hover:bg-foreground/10 transition-colors ease-linear cursor-pointer select-none'>+</span>
                            </div>
                            <button
                                onClick={() => {
                                    addCartItemIdToLS(product, { selectedSize: selectedPriceAndSize, qty: productQty });
                                    toggleCart()
                                }}
                                disabled={selectedPriceAndSize?.stockQuantity === 0}
                                className='flex-1 max-sm:w-full flex items-center justify-center gap-2 py-3 bg-foreground cursor-pointer text-background hover:bg-background hover:text-foreground transition-all ease-linear duration-300 border border-foreground font-semibold disabled:cursor-not-allowed disabled:bg-foreground/70'>
                                <span>Add to Cart</span>
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Related Product Section  */}
                <section>
                    <SectionHeader headerContent={{ subHeading: 'You Might Also Like', mainHeading: 'Related Products' }} />

                    <div className='flex items-center justify-center flex-wrap gap-2 pb-10'>
                        {relatedProducts.length === 0 &&
                            <div className='text-lg font-semibold text-muted'>Oops ---- No related product found</div>
                        }
                        {relatedProducts.map((prod, index) => {
                            return <ProductGridCard key={prod._id} product={prod} index={index} />
                        })}
                    </div>

                </section>

                {/* Testimonials Section */}
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
                                    {`"${testimonials[testimonialCount]?.review}"`}
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
                                        className='font-serif tracking-wider text-lg font-semibold'>
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

                {/* Stats Section  */}
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
                                        className='text-5xl font-semibold font-serif tracking-wide'
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

                {/* Why Choose US  */}
                <section>
                    <SectionHeader headerContent={{ subHeading: 'The ODOUR Promise', mainHeading: 'Why Choose Us' }} />

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
                                <h3 className='text-3xl font-serif font-semibold tracking-wider'>{reason.title}</h3>
                                <p className='text-justify text-muted font-semibold'>{reason.description}</p>
                            </div>
                        })}
                    </div>
                </section>

                {/* Moving Stripe Section  */}
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
