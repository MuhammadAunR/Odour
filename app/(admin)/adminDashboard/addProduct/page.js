'use client'
import { SecondaryButton } from '@/components/UI/Buttons'
import { motion } from 'motion/react'
import React, { useState } from 'react'

const AddProduct = () => {

    const sizes = ['30ml', '50ml', '100ml']
    const gender = ['Male', 'Female', 'Unisex']
    const fragranceFamily = ['Woody', 'Citrus', 'Floral', 'Fresh', 'Oriental']
    const productCategories = ['Perfume', 'Attar', 'Limited Edition', 'New Arrivals', 'Best Sellers',]

    const [productDetails, setProductDetails] = useState({
        productName: '',
        description: '',
        category: [],
        gender: [],
        fragranceFamily: [],
        variants: [
            {
                size: '',
                originalPrice: '',
                salePrice: null,
                stockQuantity: '',
            }
        ],
        images: [],
        isOnSale: false,
        sku: '',
    })

    const handleProductDetailsInput = (e) => {
        const { name, value } = e.target
        setProductDetails(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleProductDetailsViaButton = (field, value) => {
        setProductDetails(prev => ({
            ...prev,
            [field]: prev[field].includes(value) ? prev[field].filter(item => item !== value) : [...prev[field], value]
        }))
    }

    const handleProductVariants = () => {

    }

    console.log(productDetails)

    return (
        <>
            <main className='py-5 px-2 space-y-5'>
                <header className='w-full'>
                    <h1 className='text-2xl font-bold text-center'>Add Product</h1>
                </header>

                <section className='space-y-5 bg-white shadow-xl p-3 rounded-2xl'>
                    <h2 className='text-xl font-semibold'>Product Information</h2>

                    <div className='space-y-3'>
                        <label htmlFor="name" className='flex items-center gap-5'>
                            <div className='font-semibold w-40'>Product Name</div>
                            <input
                                name='productName'
                                onChange={handleProductDetailsInput}
                                value={productDetails.productName}
                                type="text"
                                placeholder='Product Name'
                                className='bg-background px-5 py-2 w-full outline-none text-foreground/80 border border-foreground/30 hover:border-foreground/50 transition-colors ease-linear' />
                        </label>
                        <label htmlFor="name" className='flex items-start gap-5'>
                            <div className='font-semibold w-40'>Description</div>
                            <textarea
                                name='description'
                                onChange={handleProductDetailsInput}
                                value={productDetails.description}
                                rows={3}
                                placeholder='Enter Product Description here...'
                                className='bg-background px-5 py-2 w-full outline-none text-foreground/80 border border-foreground/30 hover:border-foreground/50 transition-colors ease-linear'
                            ></textarea>
                        </label>
                    </div>
                </section>

                <section className='space-y-5 bg-white shadow-xl p-3 rounded-2xl'>
                    <h2 className='text-xl font-semibold'>Price and Inventory</h2>

                    <div className='space-y-3'>
                        <div className='flex items-center gap-5'>
                            <div className='font-semibold w-40'>Sale Status</div>
                            <div className='flex items-center gap-5'>
                                {['Regular', 'On Sale'].map((s, i) => {
                                    return <motion.button
                                        key={i}
                                        onClick={() => setProductDetails(prev => ({ ...prev, isOnSale: s === 'On Sale' }))}
                                        whileTap={{ scale: 0.97 }}
                                        className={`bg-background px-5 py-2 outline-none border border-foreground/30 hover:bg-foreground/80 hover:text-background transition-colors ease-linear duration-300 cursor-pointer
                                        ${(s === 'On Sale' && productDetails.isOnSale) ||
                                                (s === 'Regular' && !productDetails.isOnSale)
                                                ? 'bg-foreground/80 text-background'
                                                : 'bg-background'}`}>
                                        {s}
                                    </motion.button>
                                })}
                            </div>
                        </div>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th>Size</th>
                                    <th>Original Price</th>
                                    <th>Sale Price</th>
                                    <th>Stock</th>
                                </tr>
                            </thead>

                            <tbody>
                                {sizes.map((variant, index) => (
                                    <tr key={variant.size}>
                                        <td className='w-40 font-semibold'>{variant}</td>

                                        <td>
                                            <input
                                                name='originalPrice'
                                                onChange={handleProductDetailsInput}
                                                value={productDetails.variants.originalPrice}
                                                type="text"
                                                placeholder='Original Price'
                                                className='bg-background px-5 py-2 w-full outline-none text-foreground/80 border border-foreground/30 hover:border-foreground/50 transition-colors ease-linear' />
                                        </td>

                                        <td>
                                            <input
                                                name='originalPrice'
                                                onChange={handleProductDetailsInput}
                                                value={productDetails.variants.originalPrice}
                                                type="text"
                                                placeholder='Original Price'
                                                className='bg-background px-5 py-2 w-full outline-none text-foreground/80 border border-foreground/30 hover:border-foreground/50 transition-colors ease-linear' />
                                        </td>

                                        <td>
                                            <input
                                                name='stockQuantity'
                                                onChange={handleProductDetailsInput}
                                                value={productDetails.variants.stockQuantity}
                                                type="number"
                                                placeholder='Product Quantity'
                                                className='bg-background px-5 py-2 w-full outline-none text-foreground/80 border border-foreground/30 hover:border-foreground/50 transition-colors ease-linear'
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <label htmlFor="name" className='flex items-center gap-5'>
                            <div className='font-semibold w-40'>SKU</div>
                            <input
                                name='sku'
                                onChange={handleProductDetailsInput}
                                value={productDetails.sku}
                                type="text"
                                placeholder="Product's SKU"
                                className='bg-background px-5 py-2 w-full outline-none text-foreground/80 border border-foreground/30 hover:border-foreground/50 transition-colors ease-linear'
                            />
                        </label>
                    </div>
                </section>

                <section className='space-y-5 bg-white shadow-xl p-3 rounded-2xl'>
                    <h2 className='text-xl font-semibold'>Product Variants</h2>

                    <div className='space-y-3'>
                        <div className='flex items-center gap-5'>
                            <div className='font-semibold w-40'>Fragrance Family</div>
                            <div className='flex items-center gap-5'>
                                {fragranceFamily.map((family, i) => {
                                    return <motion.button
                                        key={i}
                                        onClick={() => handleProductDetailsViaButton('fragranceFamily', family)}
                                        whileTap={{ scale: 0.97 }}
                                        className={`bg-background px-5 py-2 outline-none border border-foreground/30 hover:bg-foreground/80 hover:text-background transition-colors ease-linear duration-300 cursor-pointer
                                        ${productDetails.fragranceFamily.includes(family) ? 'bg-foreground/80 text-background'
                                                : 'bg-background'}`}>
                                        {family}
                                    </motion.button>
                                })}
                            </div>
                        </div>
                        <div className='flex items-center gap-5'>
                            <div className='font-semibold w-40'>Categories</div>
                            <div className='flex items-center gap-5'>
                                {productCategories.map((cat, i) => {
                                    return <motion.button
                                        key={i}
                                        onClick={() => handleProductDetailsViaButton('category', cat)}
                                        whileTap={{ scale: 0.97 }}
                                        className={`bg-background px-5 py-2 outline-none border border-foreground/30 hover:bg-foreground/80 hover:text-background transition-colors ease-linear duration-300 cursor-pointer
                                        ${productDetails.category.includes(cat) ? 'bg-foreground/80 text-background'
                                                : 'bg-background'}`}>
                                        {cat}
                                    </motion.button>
                                })}
                            </div>
                        </div>
                        <div className='flex items-center gap-5'>
                            <div className='font-semibold w-40'>Gender</div>
                            <div className='flex items-center gap-5'>
                                {gender.map((gender, i) => {
                                    return <motion.button
                                        key={i}
                                        onClick={() => handleProductDetailsViaButton('gender', gender)}
                                        whileTap={{ scale: 0.97 }}
                                        className={`bg-background px-5 py-2 outline-none border border-foreground/30 hover:bg-foreground/80 hover:text-background transition-colors ease-linear duration-300 cursor-pointer
                                        ${productDetails.gender.includes(gender) ? 'bg-foreground/80 text-background'
                                                : 'bg-background'}`}>
                                        {gender}
                                    </motion.button>
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                <section className='space-y-5 bg-white shadow-xl p-3 rounded-2xl'>
                    <h2 className='text-xl font-semibold'>Media</h2>

                    <div className='space-y-3'>
                        <div className='flex items-center gap-5'>
                            <div className='font-semibold w-40'>Product Images</div>
                            <div className=''>
                                <input
                                    type="file"
                                    placeholder=''
                                    className='bg-background px-5 py-2 w-full outline-none text-foreground/80 border border-foreground/30 hover:border-foreground/50 transition-colors ease-linear'
                                />
                            </div>
                        </div>
                        <div className='font-semibold w-40'>Preview Images</div>
                        <div className='flex items-center justify-start gap-3'>
                            <div className='w-30 h-30 border border-foreground/50 flex items-center justify-center text-foreground/50'>No preview</div>
                            <div className='w-30 h-30 border border-foreground/50 flex items-center justify-center text-foreground/50'>No preview</div>
                            <div className='w-30 h-30 border border-foreground/50 flex items-center justify-center text-foreground/50'>No preview</div>
                        </div>
                    </div>
                </section>

                <section className='space-y-5 bg-white shadow-xl p-3 rounded-2xl'>
                    <h2 className='text-xl font-semibold'>Finalize and Save</h2>

                    <div className='flex items-center justify-end gap-7'>
                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            className='bg-foreground/10 px-5 py-2.5 uppercase font-semibold hover:bg-foreground/20 transition-all ease-linear cursor-pointer'>Cancel</motion.button>
                        <span>
                            <SecondaryButton text={'Save'} />
                        </span>
                    </div>
                </section>
            </main>
        </>
    )
}

export default AddProduct