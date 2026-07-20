'use client'

import React, { useEffect, useState } from 'react'
import { PrimaryButton, SecondaryButton } from '@/components/UI/Buttons'
import { Info, Search, SquarePen, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { deleteProductById, fetchAllProducts } from '@/services/productServices'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { motion } from 'motion/react'
import { SimpleLoader } from '@/components/admin/AuthPagesCompos'

const ProductList = () => {

    const router = useRouter()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getAllProducts() {
            setLoading(true)
            const { data, ok } = await fetchAllProducts()
            if (!ok) {
                toast.error('Failed to get products')
            }
            setProducts(data)
            setLoading(false)
        }
        getAllProducts()
    }, [])

    async function handleProductDelete(id) {
        const result = await deleteProductById(id)
        if (!result.ok) {
            toast.error(result.message)
            return
        }
        setProducts(prev => {
            return prev.filter(prod => prod._id !== id)
        })
        toast.success(result.message)
    }

    const handleProductUpdate = (product) => {
        router.push(`/adminDashboard/addProduct?slug=${product.slug}`)
    }

    return (
        <main className='space-y-5 py-5 px-2'>

            <motion.header
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: false }}
                className='flex items-center justify-between py-7 px-5 bg-white shadow-lg rounded-2xl'>
                <h1 className='text-2xl font-bold'>Product List</h1>
                <span onClick={() => router.push('/adminDashboard/addProduct')}>
                    <SecondaryButton text={'Add Product'} />
                </span>
            </motion.header>

            <motion.section
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: false }}
                className='py-7 px-5 bg-white shadow-lg rounded-2xl'>
                <label htmlFor="name" className='flex items-center'>
                    <div className='p-2 text-foreground/80 border border-foreground/30 rounded-l-md'><Search /></div>
                    <input
                        name='name'
                        type="text"
                        placeholder='Search product name or SKU'
                        className='bg-background px-5 py-2 w-full outline-none text-foreground/80 rounded-r-md border border-foreground/30 hover:border-foreground/50 transition-colors ease-linear' />
                </label>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: false }}
                className=''>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {loading ? (
                        <div className='w-full flex items-center justify-center py-10'>
                            <SimpleLoader />
                        </div>
                    ) : products.length === 0 ? (
                        <div className='w-full font-semibold text-foreground/50 text-xl py-10 flex items-center justify-center'>
                            No products available
                        </div>
                    ) :
                        <div className="overflow-x-auto">
                            <table className="min-w-325 w-full">
                                <thead>
                                    <tr className="bg-gray-100 border-b">
                                        <th className="p-4 text-left">
                                            <input type="checkbox" />
                                        </th>
                                        <th className="p-4 text-left">No.</th>
                                        <th className="p-4 text-left">Product</th>
                                        <th className="p-4 text-left">SKU</th>
                                        <th className="p-4 text-left">Category</th>
                                        <th className="p-4 text-left">Variants</th>
                                        <th className="p-4 text-left min-w-30 w-fit">Price <span className='text-sm text-red-500'>(PKR)</span></th>
                                        <th className="p-4 text-left min-w-40 w-fit">Sale Price <span className='text-sm text-red-500'>(PKR)</span></th>
                                        <th className="p-4 text-left">Stock</th>
                                        <th className="p-4 text-left">Status</th>
                                        <th className="p-4 text-center">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products.map((product, index) => {
                                        return <tr key={product._id} className="border-b hover:bg-gray-50">
                                            <td className="p-4">
                                                <input type="checkbox" />
                                            </td>
                                            <td className="p-4">
                                                <span>{index + 1}</span>
                                            </td>

                                            <td className="p-4 min-w-60 w-fit">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-15 h-15 rounded-full overflow-hidden relative">
                                                        <Image src={product?.images[0]?.url} alt={product.name} fill sizes='240px' className='object-cover' />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium">{product.name}</h3>
                                                        <p className="text-sm text-gray-500">Dior</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="p-4">{product.sku}</td>
                                            <td className="p-4">{product.category}</td>
                                            <td className="p-4">{product.variants.length}</td>
                                            <td className="p-4">{product.defaultPrice}</td>
                                            <td className="p-4">{product.defaultSalePrice ?? 'NULL'}</td>
                                            <td className="p-4">{product.variants[0].stockQuantity}</td>

                                            <td className="p-4 w-42">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${product.variants[0].stockQuantity === 0
                                                        ? "bg-red-100 text-red-700"
                                                        : product.variants[0].stockQuantity <= 5
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-green-100 text-green-700"
                                                        }`}
                                                >
                                                    {product.variants[0].stockQuantity === 0
                                                        ? "Out of Stock"
                                                        : product.variants[0].stockQuantity <= 5
                                                            ? "Low Stock"
                                                            : "In Stock"}
                                                </span>
                                            </td>

                                            <td className="p-4">
                                                <div className="flex justify-center gap-2">
                                                    <button className="p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
                                                        <Info strokeWidth={1.5} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleProductUpdate(product)}
                                                        className="p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
                                                        <SquarePen strokeWidth={1.5} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleProductDelete(product._id)}
                                                        className="p-2 rounded-lg hover:bg-red-100 cursor-pointer">
                                                        <Trash2 strokeWidth={1.5} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </motion.section>

            <div className='w-full flex items-center justify-center py-5'>
                <PrimaryButton text={'Load More Products'} />
            </div>
        </main>
    )
}

export default ProductList