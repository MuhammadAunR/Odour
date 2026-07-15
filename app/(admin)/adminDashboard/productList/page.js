'use client'

import React, { useEffect, useState } from 'react'
import { SecondaryButton } from '@/components/UI/Buttons'
import { Info, SquarePen, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { fetchAllProducts } from '@/services/productServices'
import { toast } from 'react-toastify'

const ProductList = () => {

    const router = useRouter()
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function getAllProducts() {
            const { data, ok } = await fetchAllProducts()
            if (!ok) {
                toast.error('Failed to get products')
            }
            setProducts(data)
            console.log(data[0])
        }
        getAllProducts()
    }, [])

    return (
        <main className='space-y-5 py-5 px-2'>
            <header className='flex items-center justify-between py-7 px-5 bg-white shadow-lg rounded-2xl'>
                <h1 className='text-2xl font-bold'>Product List</h1>
                <span onClick={() => router.push('/adminDashboard/addProduct')}>
                    <SecondaryButton text={'Add Product'} />
                </span>
            </header>

            <section className='mt-15'>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-325 w-full">
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    <th className="p-4 text-left">
                                        <input type="checkbox" />
                                    </th>
                                    <th className="p-4 text-left">Product</th>
                                    <th className="p-4 text-left">SKU</th>
                                    <th className="p-4 text-left">Category</th>
                                    <th className="p-4 text-left">Variants</th>
                                    <th className="p-4 text-left">Price</th>
                                    <th className="p-4 text-left">Sale Price</th>
                                    <th className="p-4 text-left">Stock</th>
                                    <th className="p-4 text-left">Status</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map((product) => {
                                    return <tr key={product._id} className="border-b hover:bg-gray-50">
                                        <td className="p-4">
                                            <input type="checkbox" />
                                        </td>

                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-14 rounded-lg bg-gray-200"></div>
                                                <div>
                                                    <h3 className="font-medium">{product.name}</h3>
                                                    <p className="text-sm text-gray-500">Dior</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-4">{product.sku}</td>
                                        <td className="p-4">{product.category}</td>
                                        <td className="p-4">{product.variants.length}</td>
                                        <td className="p-4">$120 - $180</td>
                                        <td className="p-4">$120 - $180</td>
                                        <td className="p-4">45</td>

                                        <td className="p-4">
                                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                                Active
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <div className="flex justify-center gap-2">
                                                <button className="p-2 rounded-lg hover:bg-gray-200">
                                                    <Info strokeWidth={1.5} />
                                                </button>
                                                <button className="p-2 rounded-lg hover:bg-gray-200">
                                                    <SquarePen strokeWidth={1.5} />
                                                </button>
                                                <button className="p-2 rounded-lg hover:bg-red-100">
                                                    <Trash2 strokeWidth={1.5} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default ProductList