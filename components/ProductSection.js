'use client'
import React, { useState } from 'react'

import ProductCard from './CardUI'
import { useProducts } from '@/app/context/ProductContext'

const ProductSection = () => {

    const [activeFilter, setActiveFilter] = useState('New Arrivals')
    const { products } = useProducts()

    const handleActiveFilter = (text) => {
        setActiveFilter(text)
    }
    return (
        <>
            <main className='w-10/12 mx-auto py-20'>

                <div className='flex flex-col items-center justify-center gap-7 pb-15'>
                    <div className='flex flex-col items-center gap-3'>
                        <span className='text-xs font-semibold tracking-[0.3em] uppercase text-foreground/40'>
                            Exclusively Curated
                        </span>
                        <h3 className='text-4xl md:text-5xl font-bold font-serif tracking-widest'>
                            The Collection
                        </h3>
                        <div className='flex items-center gap-3'>
                            <div className='w-16 h-[0.5px] bg-foreground/30'></div>
                            <span className='text-foreground/30 text-xs'>✦</span>
                            <div className='w-16 h-[0.5px] bg-foreground/30'></div>
                        </div>
                        <p className='text-muted text-center max-w-lg tracking-wide leading-relaxed'>
                            Each fragrance is a carefully composed story — rare ingredients,
                            master craftsmanship, and the art of lasting impression.
                        </p>
                    </div>

                    <div className='flex items-center justify-center gap-5 flex-wrap'>
                        {['New Arrivals', 'Best Sellers', 'Trending Now'].map(btn => {
                            return <button
                                key={btn}
                                onClick={(e) => handleActiveFilter(e.target.innerText)}
                                className={`px-5 py-3 transition-all ease-linear duration-300 ${activeFilter === btn ? 'bg-foreground text-background' : 'bg-surface text-foreground'} cursor-pointer`}>{btn}</button>
                        })}
                    </div>
                </div>

                <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center'>
                    {products.slice(2, 10).map(prod => {
                        return <ProductCard key={prod.id} product={prod} />
                    })}
                </section>
            </main>

            <section className='mt-15'>
                <div className="min-h-80 h-fit w-full bg-linear-to-b from-background to-surface">
                    <div className='mx-auto py-20 w-10/12 md:w-2xl flex flex-col items-center justify-center gap-5'>
                        <p className='text-xl text-center text-muted'>
                            Crafted for those who seek more than a scent — an identity, a memory, a second skin.
                            Every bottle holds a world. Every note tells a story only you can finish.
                            — Odour
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
