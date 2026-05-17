'use client'
import { useCart } from '@/app/context/CartContext'
import { useProducts } from '@/app/context/ProductContext'
import ProductCard from '@/components/CardUI'
import Loader from '@/components/LoaderUI'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Product = ({ params }) => {

    const { handleAddCartItems, selectedPriceAndSize, setSelectedPriceAndSize } = useCart()
    const { products } = useProducts()

    const { slug } = useParams(params)

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [productQty, setProductQty] = useState(1)
    const [relatedProducts, setRelatedProducts] = useState([])

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

                    <div className='relative w-full lg:w-1/2 h-150 border-2 box-border border-surface shadow-[1px_1px_5px_rgba(0,0,0,0.5)]'>
                        <Image
                            src={product.imgSrc}
                            fill
                            sizes='1000px'
                            priority
                            alt={product.alt}
                            className='object-cover' />
                    </div>

                    <div className='flex flex-col justify-center gap-4 bg-surface/30 border-2 box-border border-surface shadow-[1px_1px_5px_rgba(0,0,0,0.5)] p-5 
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
                    </div>
                </div>

                <section>
                    <div className='flex flex-col items-center gap-2 my-10'>
                        <span className='text-xs font-semibold tracking-[0.3em] uppercase text-foreground/40'>
                            You May Also Like
                        </span>
                        <h2 className='text-4xl md:text-5xl font-black font-serif tracking-widest'>
                            Related Products
                        </h2>
                        <div className='flex items-center gap-3 mt-1'>
                            <div className='w-16 h-[0.5px] bg-foreground/30'></div>
                            <span className='text-foreground/30 text-xs'>✦</span>
                            <div className='w-16 h-[0.5px] bg-foreground/30'></div>
                        </div>
                    </div>

                    <div className='flex items-center justify-start flex-wrap gap-2 pb-10'>
                        {relatedProducts.map((prod, index) => {
                            return <ProductCard key={prod.id} product={prod} index={index} />
                        })}
                    </div>

                </section>


                <section>
                    <div className='flex flex-col items-center gap-2 my-10'>
                        <span className='text-xs font-semibold tracking-[0.3em] uppercase text-foreground/40'>
                            What Our Clients Say
                        </span>
                        <h2 className='text-4xl md:text-5xl font-black font-serif tracking-widest'>
                            Testimonials
                        </h2>
                        <div className='flex items-center gap-3 mt-1'>
                            <div className='w-16 h-[0.5px] bg-foreground/30'></div>
                            <span className='text-foreground/30 text-xs'>✦</span>
                            <div className='w-16 h-[0.5px] bg-foreground/30'></div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Product
