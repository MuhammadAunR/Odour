'use client'
import React from 'react'

const AddProduct = () => {
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
                                className='bg-background px-5 py-2 w-full outline-none text-foreground/60 border border-foreground/10 hover:border-foreground/30 transition-colors ease-linear' />
                        </label>
                        <label htmlFor="name" className='flex flex-col items-start gap-5'>
                            <div className='font-semibold w-40'>Description</div>
                            <textarea
                                name=""
                                id=""
                                rows={3}
                                placeholder='Enter Product Description here...'
                                className='bg-background px-5 py-2 w-full outline-none text-foreground/60 border border-foreground/10 hover:border-foreground/30 transition-colors ease-linear'
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
                                className='bg-background px-5 py-2 w-full outline-none text-foreground/60 border border-foreground/10 hover:border-foreground/30 transition-colors ease-linear' />
                        </label>
                        <label htmlFor="name" className='flex items-center gap-5'>
                            <div className='font-semibold w-40'>Sales Price</div>
                            <input
                                type="text"
                                placeholder='Sales Price'
                                className='bg-background px-5 py-2 w-full outline-none text-foreground/60 border border-foreground/10 hover:border-foreground/30 transition-colors ease-linear' />
                        </label>
                    </div>
                </section>

            </main>
        </>
    )
}

export default AddProduct