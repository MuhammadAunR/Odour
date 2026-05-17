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

            <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-30'>
                {products.slice(2, 10).map(prod => {
                    return <ProductCard key={prod.id} product={prod} />
                })}
            </section>

            <section>
                <div className="min-h-80 h-fit px-5 w-full flex items-center justify-center bg-white relative text-gray-800">

                    <div
                        className="absolute inset-0 z-0 pointer-events-none"
                        style={{
                            backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(75, 85, 99, 0.06) 5px, rgba(75, 85, 99, 0.06) 6px, transparent 6px, transparent 15px),
        repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(75, 85, 99, 0.06) 5px, rgba(75, 85, 99, 0.06) 6px, transparent 6px, transparent 15px),
        repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(107, 114, 128, 0.04) 10px, rgba(107, 114, 128, 0.04) 11px, transparent 11px, transparent 30px),
        repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(107, 114, 128, 0.04) 10px, rgba(107, 114, 128, 0.04) 11px, transparent 11px, transparent 30px)
      `,
                        }}
                    />
                    <div className='py-20 w-xl flex flex-col items-center justify-center gap-5'>
                        <p className='text-xl text-center text-muted'> Crafted for those who seek more than a scent — an identity, a memory, a second skin.
                            Every bottle holds a world. Every note tells a story only you can finish.
                            — Odour</p>
                        <h5 className='text-xl font-semibold font-display'>Odour</h5>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default ProductSection
