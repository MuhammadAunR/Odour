import { products } from '@/components/Assets'
import ProductCard from '@/components/CardUI'
import React from 'react'

const ShopPage = () => {
    return (
        <>
            <main className='w-10/12 mx-auto relative'>

                <div className="flex gap-8 pt-20 max-lg:flex-col">

                    <aside className="w-[30%] shrink-0 min-h-screen h-fit border-r border-foreground/30 pr-10 py-5 max-lg:flex max-lg:border-b">

                        <section>
                            <label htmlFor="search" className='flex flex-col items-start gap-4 w-10/12'>
                                <span className='font-semibold text-foreground'>Search</span>
                                <input type="text" name="search" id="search" placeholder='Search our store' className='w-full outline-none px-3 border border-foreground/20 py-2
                                '/>
                            </label>
                        </section>

                        <section className='py-5 space-y-3'>
                            <h4 className='font-semibold text-foreground'>Categories</h4>

                            {['New Arrivals', 'Best Sellers', 'Trending Now'].map((cat, i) => {

                                return <div key={i} className='flex items-center justify-between group/category'>
                                    <label htmlFor={cat} className='flex items-center gap-5 cursor-pointer group-hover/category:text-muted transition-colors ease-linear duration-300'>
                                        <input type="checkbox" name="checkbox" id={cat} />
                                        <span>{cat}</span>
                                    </label>
                                    <div className='bg-foreground/30 p-1 rounded-full text-sm w-7 h-7 flex items-center justify-center cursor-pointer group-hover/category:bg-muted group-hover/category:text-background transition-colors ease-linear duration-300'>0</div>
                                </div>
                            })}
                        </section>

                    </aside>


                    <section className="flex-1 min-w-0">
                        <div className='grid grid-cols-2 xl:grid-cols-3 gap-2'>
                            {products.map(prod => (
                                <ProductCard key={prod.id} product={prod} />
                            ))}
                        </div>
                    </section>

                </div>

            </main>
        </>
    )
}

export default ShopPage
