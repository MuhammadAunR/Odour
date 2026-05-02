'use client'
import { products } from '@/components/Assets'
import ProductCard from '@/components/CardUI'
import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'

const ShopPage = () => {

    const [open, setOpen] = useState(false)

    const filterSections = [
        {
            title: 'Categories',
            type: 'checkbox',
            options: ['New Arrivals', 'Best Sellers', 'Trending Now', 'Gift Sets'],
        },
        {
            title: 'Gender',
            type: 'checkbox',
            options: ['Men', 'Women', 'Unisex'],
        },
        {
            title: 'Brand',
            type: 'checkbox',
            options: ['Dior', 'Chanel', 'Tom Ford', 'Creed', 'Giorgio Armani', 'Lancôme'],
        },
        {
            title: 'Size',
            type: 'checkbox',
            options: ['30ml', '50ml', '75ml', '90ml', '100ml'],
        },
    ]


    const handleOpenSection = (section) => {
        setOpen(!open)
    }

    return (
        <>
            <main className='w-10/12 mx-auto relative'>

                <div className="flex gap-8 pt-5 lg:pt-20 max-lg:flex-col">

                    <aside className="lg:w-[30%] lg:shrink-0 lg:min-h-screen h-fit lg:border-r border-foreground/30 lg:pr-10 py-5 max-lg:flex-col max-lg:border-b space-y-5">

                        <section>
                            <label htmlFor="search" className='flex flex-col items-start gap-4'>
                                <span className='font-semibold text-foreground'>Search</span>
                                <input type="text" name="search" id="search" placeholder='Search our store' className='w-full outline-none px-3 border border-foreground/20 py-2 hover:bg-foreground/5 transition-all ease-linear cursor-pointer text-foreground/70' />
                            </label>
                        </section>

                        <section className='py-5 flex flex-col gap-4'>

                            {filterSections.map((sec, index) => {
                                return <div onClick={() => handleOpenSection(sec.title)} key={index} className={`flex items-center justify-between border-b ${open ? 'h-50' : 'h-5'} border-foreground/30 hover:bg-foreground/5 transition-all ease-linear px-1 py-2`}>
                                    <h3 className='font-semibold'>{sec.title}</h3>
                                    <span><ChevronDown size={20} /></span>
                                </div>
                            })}

                            {/* <h4 className='font-semibold text-foreground'>Categories</h4>

                            {filterSections[0].options.map((cat, i) => {

                                return <div key={i} className='flex items-center justify-between group/category'>
                                    <label htmlFor={cat} className='flex items-center gap-5 cursor-pointer group-hover/category:text-muted transition-colors ease-linear duration-300'>
                                        <input type="checkbox" name="checkbox" id={cat} />
                                        <span>{cat}</span>
                                    </label>
                                    <div className='bg-foreground/30 p-1 rounded-full text-sm w-7 h-7 flex items-center justify-center cursor-pointer group-hover/category:bg-muted group-hover/category:text-background transition-colors ease-linear duration-300'>0</div>
                                </div>
                            })} */}
                        </section>

                    </aside>


                    <section className="flex-1 min-w-0">
                        <div className='grid  grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2'>
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
