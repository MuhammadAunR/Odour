'use client'
import React from 'react'

const AddProduct = () => {

    const sizes = ['30ml', '50ml', '100ml']
    const fragranceFamily = ['Woody', 'Citrus', 'Floral', 'Fresh', 'Oriental']

    return (
        <>
            <main className='p-5 space-y-5'>
                <header className='w-full'>
                    <h1 className='text-2xl font-bold text-center'>Add Product</h1>
                </header>

                <section className='space-y-5'>
                    <h2 className='text-xl font-semibold'>Product Information</h2>

                    <div className='space-y-3'>
                        <label htmlFor="name" className='flex items-center gap-5'>
                            <div className='font-semibold w-40'>Product Name</div>
                            <input
                                type="text"
                                placeholder='Product Name'
                                className='bg-background px-5 py-2 w-full outline-none text-foreground/80 border border-foreground/30 hover:border-foreground/50 transition-colors ease-linear' />
                        </label>
                        <label htmlFor="name" className='flex flex-col items-start gap-5'>
                            <div className='font-semibold w-40'>Description</div>
                            <textarea
                                name=""
                                id=""
                                rows={3}
                                placeholder='Enter Product Description here...'
                                className='bg-background px-5 py-2 w-full outline-none text-foreground/80 border border-foreground/30 hover:border-foreground/50 transition-colors ease-linear'
                            ></textarea>
                        </label>
                    </div>
                </section>

                <section className='space-y-5'>
                    <h2 className='text-xl font-semibold'>Price and Inventory</h2>

                    <div className='space-y-3'>
                        <label htmlFor="name" className='flex items-center gap-5'>
                            <div className='font-semibold w-40'>Original Price</div>
                            <input
                                type="text"
                                placeholder='Original Price'
                                className='bg-background px-5 py-2 w-full outline-none text-foreground/80 border border-foreground/30 hover:border-foreground/50 transition-colors ease-linear' />
                        </label>
                        <label htmlFor="name" className='flex items-center gap-5'>
                            <div className='font-semibold w-40'>Sales Price</div>
                            <input
                                type="text"
                                placeholder='Sales Price'
                                className='bg-background px-5 py-2 w-full outline-none text-foreground/80 border border-foreground/30 hover:border-foreground/50 transition-colors ease-linear' />
                        </label>
                        <label htmlFor="name" className='flex items-center gap-5'>
                            <div className='font-semibold w-40'>Stocks</div>
                            <input
                                type="number"
                                placeholder='Product Quantity'
                                className='bg-background px-5 py-2 w-full outline-none text-foreground/80 border border-foreground/30 hover:border-foreground/50 transition-colors ease-linear'
                            />
                        </label>
                    </div>
                </section>

                <section className='space-y-5'>
                    <h2 className='text-xl font-semibold'>Product Variants</h2>

                    <div className='space-y-3'>
                        <div className='flex items-center gap-5'>
                            <div className='font-semibold w-40'>Sizes</div>
                            <div className='flex items-center gap-5'>
                                {sizes.map((s, i) => {
                                    return <button key={i} className='bg-background px-5 py-2 outline-none text-foreground/80 border border-foreground/30 hover:bg-surface transition-colors ease-linear duration-300'>
                                        {s}
                                    </button>
                                })}
                            </div>
                        </div>
                        <div className='flex items-center gap-5'>
                            <div className='font-semibold w-40'>Fragrance Family</div>
                            <div className='flex items-center gap-5'>
                                {fragranceFamily.map((s, i) => {
                                    return <button key={i} className='bg-background px-5 py-2 outline-none text-foreground/80 border border-foreground/30 hover:bg-surface transition-colors ease-linear duration-300'>
                                        {s}
                                    </button>
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                <section className='space-y-5'>
                    <h2 className='text-xl font-semibold'>Media</h2>

                    <div className='space-y-3'>
                        <div className='flex items-center gap-5'>
                            <div className='font-semibold w-40'>Product Images</div>
                            <div className='flex items-center gap-5'>
                                {sizes.map((s, i) => {
                                    return <button key={i} className='bg-background px-5 py-2 outline-none text-foreground/80 border border-foreground/30 hover:bg-surface transition-colors ease-linear duration-300'>
                                        {s}
                                    </button>
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default AddProduct