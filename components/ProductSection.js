'use client'
import React, { useState } from 'react'
import ProductGridCard from './UI/Card'
import { useProducts } from '@/app/context/ProductContext'
import SectionHeader from './SectionHeader'

const ProductSection = () => {

    const [activeFilter, setActiveFilter] = useState('bestseller')
    const { products } = useProducts()

    const availableTags = [...new Set(products.flatMap(prod => prod.tags))]
    const filteredProducts = products.filter(prod => prod.tags.includes(activeFilter))

    return (
        <>
            <main className='w-full px-5 max-w-7xl lg:px-0 lg:w-10/12 lg:mx-auto py-15'>

                <div className='flex flex-col items-center justify-center gap-7 pb-15'>
                    <div className='flex flex-col items-center gap-3'>
                        <SectionHeader headerContent={{ subHeading: 'Exclusively Curated', mainHeading: 'The Collection' }} />
                        <p className='text-muted text-center max-w-xl tracking-wide leading-relaxed'>
                            Each fragrance is a carefully composed story — rare ingredients,
                            master craftsmanship, and the art of lasting impression.
                        </p>
                    </div>

                    <div className='flex items-center justify-center gap-5 flex-wrap'>
                        {availableTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setActiveFilter(tag)}
                                className={`px-5 py-3 transition-all ease-linear duration-300 cursor-pointer
                                    ${activeFilter === tag ? 'bg-foreground text-background' : 'bg-surface text-foreground'}`}>
                                {tag === 'bestseller' ? 'Best Seller' : 'Trending'}
                            </button>
                        ))}
                    </div>
                </div>

                <section className='flex items-center justify-center gap-4 w-full flex-wrap'>
                    {filteredProducts.slice(0, 4).map(prod => (
                        <ProductGridCard key={prod.id} product={prod} />
                    ))}
                </section>
            </main>

            <section className='w-full bg-linear-to-b from-background to-surface border-b border-background'>
                <div className="min-h-70 h-fit max-w-7xl mx-auto lg:px-0 px-5">
                    <div className='mx-auto py-15 w-full px-5 max-w-2xl flex flex-col items-center justify-center gap-5'>
                        <p className='md:text-xl text-center text-muted'>
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