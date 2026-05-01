'use client'
import React, { useState } from 'react'
import { products } from './Assets'
import ProductCard from './CardUI'

const ProductSection = () => {

    const [activeFilter, setActiveFilter] = useState('New Arrivals')

    const handleActiveFilter = (text) => {
        setActiveFilter(text)
        console.log(text)
    }
    return (
        <main className='w-10/12 mx-auto py-20'>

            <div className='flex flex-col items-center justify-center gap-7 pb-15'>
                <h3 className='text-5xl font-bold font-serif tracking-wider'>The Collection</h3>
                <p className='text-muted text-center max-w-lg tracking-wide'>
                    Each fragrance is a carefully composed story — rare ingredients,
                    master craftsmanship, and the art of lasting impression.
                </p>

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
                {products.map(prod => {
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
