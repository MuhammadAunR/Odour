'use client'
import { SecondaryButton } from '@/components/UI/Buttons'
import { Plus, Trash2 } from 'lucide-react'
import { motion } from 'motion/react'
import React, { useState } from 'react'

const AddProduct = () => {

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

    const handleProductVariantInput = (index, field, value) => {
        setProductDetails(prev => ({
            ...prev,
            variants: prev.variants.map((variant, i) => {
                return i === index ? { ...variant, [field]: value } : variant
            })
        }))
    }

    const addProductVariantsCard = () => {
        setProductDetails(prev => ({
            ...prev,
            variants: [
                ...prev.variants,
                {
                    size: '',
                    originalPrice: '',
                    salePrice: null,
                    stockQuantity: '',
                }
            ]
        }))
    }

    const removeProductVariantCard = (index) => {
        if (productDetails.variants.length === 1) return
        setProductDetails(prev => ({
            ...prev,
            variants: prev.variants.filter((_, i) => i !== index)
        }))
    }

    return (
        <>
            <main className='py-5 px-2 space-y-5'>
                <header className='w-full'>
                    <h1 className='text-2xl font-bold text-center'>Add Product</h1>
                </header>

                <motion.section
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: false }}
                    className='space-y-5 bg-white shadow-xl p-3 rounded-2xl'>
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
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: false }}
                    className='space-y-5 bg-white shadow-xl p-3 rounded-2xl'>
                    <h2 className='text-xl font-semibold'>Price and Inventory</h2>

                    <div className='space-y-3'>
                        <div className='flex items-center gap-3'>
                            {productDetails.variants.map((variant, index) => {
                                return <div key={index} className='w-60 h-70 border-2 border-foreground/20 shadow-lg px-2 pt-5 flex flex-col items-center relative group/variantCard overflow-hidden'>

                                    <span onClick={() => removeProductVariantCard(index)} className='absolute top-2 right-2 text-red-500 cursor-pointer scale-0 group-hover/variantCard:scale-100 transition-all ease-linear duration-300'>
                                        <Trash2 size={20} />
                                    </span>
                                    <label htmlFor="size" className='flex flex-col items-start'>
                                        <div className='text-sm'>Size</div>
                                        <input
                                            name='size'
                                            onChange={(e) => handleProductVariantInput(index, 'size', e.target.value)}
                                            value={variant.size ?? ''}
                                            type="text"
                                            placeholder="Size in ML"
                                            className='bg-background text-sm px-3 py-2 w-full outline-none text-foreground/80 border border-foreground/30 hover:border-foreground/50 transition-colors ease-linear'
                                        />
                                    </label>
                                    <label htmlFor="originalPrice" className='flex flex-col items-start'>
                                        <div className='text-sm'>Original Price</div>
                                        <input
                                            name='originalPrice'
                                            onChange={(e) => handleProductVariantInput(index, 'originalPrice', e.target.value)}
                                            value={variant.originalPrice ?? ''}
                                            type="text"
                                            placeholder="Original Price"
                                            className='bg-background text-sm px-3 py-2 w-full outline-none text-foreground/80 border border-foreground/30 hover:border-foreground/50 transition-colors ease-linear'
                                        />
                                    </label>
                                    <label htmlFor="salePrice" className='flex flex-col items-start'>
                                        <div className='text-sm'>Sale Price</div>
                                        <input
                                            name='salePrice'
                                            onChange={(e) => handleProductVariantInput(index, 'salePrice', e.target.value)}
                                            value={variant.salePrice ?? ''}
                                            type="text"
                                            placeholder="Sale Price"
                                            className='bg-background text-sm px-3 py-2 w-full outline-none text-foreground/80 border border-foreground/30 hover:border-foreground/50 transition-colors ease-linear'
                                        />
                                    </label>
                                    <label htmlFor="stockQuantity" className='flex flex-col items-start'>
                                        <div className='text-sm'>Stock</div>
                                        <input
                                            name='stockQuantity'
                                            onChange={(e) => handleProductVariantInput(index, 'stock', e.target.value)}
                                            value={variant.stockQuantity ?? ''}
                                            type="number"
                                            placeholder="Stock Qty"
                                            className='bg-background text-sm px-3 py-2 w-full outline-none text-foreground/80 border border-foreground/30 hover:border-foreground/50 transition-colors ease-linear'
                                        />
                                    </label>
                                </div>
                            })}
                            <div onClick={addProductVariantsCard} className='w-60 h-70 border-2 border-foreground/20 shadow-lg px-2 py-3 flex flex-col items-center justify-center text-foreground/50 font-semibold cursor-pointer hover:bg-foreground/5 transition-all ease-linear duration-300'>
                                <span><Plus strokeWidth={3} size={30} /></span>
                                <span>
                                    Add other Size
                                </span>
                            </div>
                        </div>
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
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: false }}
                    className='space-y-5 bg-white shadow-xl p-3 rounded-2xl'>
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
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: false }}
                    className='space-y-5 bg-white shadow-xl p-3 rounded-2xl'>
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
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: false }}
                    className='space-y-5 bg-white shadow-xl p-3 rounded-2xl'>
                    <h2 className='text-xl font-semibold'>Finalize and Save</h2>

                    <div className='flex items-center justify-end gap-7'>
                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            className='bg-foreground/10 px-5 py-2.5 uppercase font-semibold hover:bg-foreground/20 transition-all ease-linear cursor-pointer'>Cancel</motion.button>
                        <span>
                            <SecondaryButton text={'Save'} />
                        </span>
                    </div>
                </motion.section>
            </main>
        </>
    )
}

export default AddProduct