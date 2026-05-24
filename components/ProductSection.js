'use client'
import React, { useEffect, useState } from 'react'

import ProductCard from './UI/Card'
import { useProducts } from '@/app/context/ProductContext'
import SectionHeader from './SectionHeader'

const ProductSection = () => {

    const [activeFilter, setActiveFilter] = useState('bestseller')
    const [availableTags, setAvailableTags] = useState([])
    const [product, setProduct] = useState([])
    const { products } = useProducts()

    useEffect(() => {
        const tags = [...new Set(products.flatMap(prod => prod.tags))]
        setAvailableTags(tags)
        const filteredProducts = products.filter(prod => {
            return prod.tags.includes(activeFilter)
        })
        setProduct(filteredProducts)
    }, [products, activeFilter])


    const handleActiveFilter = (text) => {
        setActiveFilter(text)
    }

    return (
        <>
            <main className='w-10/12 mx-auto py-20'>

                <div className='flex flex-col items-center justify-center gap-7 pb-15'>
                    <div className='flex flex-col items-center gap-3'>

                        <SectionHeader headerContent={{ subHeading: 'Exclusively Curated', mainHeading: 'The Collection' }} />

                        <p className='text-muted text-center max-w-lg tracking-wide leading-relaxed'>
                            Each fragrance is a carefully composed story — rare ingredients,
                            master craftsmanship, and the art of lasting impression.
                        </p>
                    </div>

                    <div className='flex items-center justify-center gap-5 flex-wrap'>
                        {availableTags.map(tag => {
                            return <button
                                key={tag}
                                onClick={(e) => handleActiveFilter(tag)}
                                className={`px-5 py-3 transition-all ease-linear duration-300 ${activeFilter === tag ? 'bg-foreground text-background' : 'bg-surface text-foreground'} cursor-pointer`}>
                                {tag === 'bestseller' ? 'Best Seller' : 'Trending'}</button>
                        })}
                    </div>
                </div>

                <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center'>
                    {product.slice(0, 4).map(prod => {
                        return <ProductCard key={prod.id} product={prod} />
                    })}
                </section>
            </main>

            <section className='mt-10'>
                <div className="min-h-70 h-fit w-full bg-linear-to-b from-background to-surface border-b border-background">
                    <div className='mx-auto py-20 w-10/12 md:w-2xl flex flex-col items-center justify-center gap-5'>
                        <p className='text-xl text-center text-muted'>
                            Crafted for those who seek more than a scent — an identity, a memory, a second skin.
                            Every bottle holds a world. Every note tells a story only you can finish.
                        </p>
                        <h5 className='text-xl font-semibold font-display text-foreground'>
                            Odour
                        </h5>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductSection
