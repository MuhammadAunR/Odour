'use client'

import React, { useEffect, useState } from 'react'
import { SecondaryButton } from '@/components/UI/Buttons'
import { Funnel, Search, SquarePen, Trash2, X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { deleteProductById } from '@/services/productServices'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { SimpleLoader } from '@/components/admin/AuthPagesCompos'
import { useAdminProducts } from '@/app/context/admin/AdminProductContext'
import { cleanParams } from '@/lib/productUtils'
import { useAllCatalog } from '@/hooks/useAllCatalog'

const ProductList = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { products, loading, setProducts, queryParams, apiResponse } = useAdminProducts()
    const { catalog, getCatalog } = useAllCatalog()
    const [isFilterSecOpen, setisFilterSecOpen] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [draftParams, setDraftParams] = useState(queryParams)

    const totalPages = apiResponse.totalPages;
    const currentPage = Number(searchParams.get("page")) || 1;

    useEffect(() => {
        getCatalog()
    }, [])

    const handleCurrentPage = (page) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", page)
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
        window.scrollTo(0, 0);
    };

    const handelForwardPagination = () => {
        if (currentPage < totalPages) {
            handleCurrentPage(currentPage + 1)
        }
    };

    const handelBackwardPagination = () => {
        if (currentPage > 1) {
            handleCurrentPage(currentPage - 1)
        }
    };

    const toggleFilterSection = () => {
        setisFilterSecOpen(!isFilterSecOpen)
    }

    const activeFilters = Object.entries(draftParams).filter(
        ([_, value]) =>
            value !== "" &&
            value !== null &&
            value !== undefined &&
            typeof value == 'string' &&
            (!Array.isArray(value) || value.length > 0)
    );

    const handleFilterApply = (filterType, filterName) => {
        setDraftParams(prev => ({
            ...prev,
            [filterType]: prev[filterType] === filterName ? '' : filterName
        }))
    }

    useEffect(() => {
        router.push(`/adminDashboard/productList?${cleanParams(draftParams)}`)
    }, [draftParams])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDraftParams(prev => ({
                ...prev,
                search: searchInput
            }))
        }, 500);
        return () => clearTimeout(timeout);
    }, [searchInput])


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
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.01 }}
                viewport={{ once: true }}
                className='flex items-center justify-between py-7 px-5 bg-white shadow-lg rounded-2xl'>
                <h1 className='text-2xl font-bold'>Product List</h1>
                <span onClick={() => router.push('/adminDashboard/addProduct')} className='max-md:hidden'>
                    <SecondaryButton text={'Add Product'} />
                </span>
            </motion.header>

            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, delay: 0.1 }}
                viewport={{ once: true }}
                className='py-7 px-5 bg-white shadow-lg rounded-2xl flex items-center justify-between gap-5 lg:gap-10'>

                <label htmlFor="search" className='flex items-center w-full'>
                    <div className='p-2 text-foreground/80 border border-foreground/30 rounded-l-md'><Search /></div>
                    <input
                        onChange={(e) => setSearchInput(e.target.value)}
                        name='search'
                        type="text"
                        placeholder='Search product name or SKU'
                        className='bg-background px-5 py-2 w-full outline-none text-foreground/80 rounded-r-md border border-foreground/30 hover:border-foreground/50 transition-colors ease-linear' />
                </label>
                <div onClick={() => toggleFilterSection()} className='border border-foreground/30 px-5 py-2 rounded-md flex items-center gap-2 cursor-pointer hover:bg-foreground/5 hover:border-foreground/50 transition-all ease-linear select-none'>
                    <span>
                        <Funnel strokeWidth={1} />
                    </span>
                    <span>
                        Filters
                    </span>
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white shadow-lg rounded-2xl overflow-hidden">

                {!isFilterSecOpen && (
                    <div className="px-5 py-5">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="font-semibold text-foreground/50 flex items-center gap-2 flex-wrap">
                            {activeFilters.length > 0 ?
                                activeFilters.map(([filterType, value], index) => {
                                    return <div
                                        key={index}
                                        onClick={() => handleFilterApply(filterType, value)}
                                        className='border-2 border-foreground/50 rounded-full px-5 py-1 cursor-pointer hover:border-red-700 transition-all ease-linear duration-300 relative 
                                        group/deleteFilter'>
                                        <span className='group-hover/deleteFilter:scale-0 transition-all ease-linear inline-block'>
                                            {value}
                                        </span>
                                        <div className='absolute inset-0 flex items-center justify-center scale-0 group-hover/deleteFilter:scale-100 text-red-700 transition-all ease-linear'>
                                            <X />
                                        </div>
                                    </div>
                                })
                                :
                                'No filter applied.'}
                        </motion.div>
                    </div>
                )}

                <AnimatePresence initial={false}>
                    {isFilterSecOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, }}
                            animate={{ height: "auto", opacity: 1, }}
                            exit={{ height: 0, opacity: 0, }}
                            transition={{ duration: 0.35, ease: "easeInOut", }}
                            className="overflow-hidden"
                        >
                            <div className="px-5 py-6">
                                <motion.h2
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-lg font-semibold mb-6"
                                >
                                    Filters
                                </motion.h2>

                                <div className="space-y-7">
                                    {Object.entries(catalog).map(
                                        ([key, values], index) => (
                                            <motion.div
                                                key={key}
                                                initial={{ opacity: 0, y: 15, }}
                                                animate={{ opacity: 1, y: 0, }}
                                                exit={{ opacity: 0, }}
                                                transition={{ delay: index * 0.08, duration: 0.25, }}>
                                                <h3 className="mb-3 text-sm font-semibold capitalize text-gray-700">
                                                    {key}
                                                </h3>

                                                <div className="flex flex-wrap gap-3">
                                                    {values.map((value) => {
                                                        const isActive = draftParams[key] === value.name;
                                                        return (
                                                            <button
                                                                key={value.name}
                                                                type="button"
                                                                onClick={() => handleFilterApply(key, value.name)}
                                                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm transition-colors duration-300 cursor-pointer
                                                               ${isActive
                                                                        ? 'bg-foreground text-background border-foreground'
                                                                        : 'bg-transparent text-foreground border-foreground/30 hover:border-foreground/60'
                                                                    }`}
                                                            >
                                                                <span className='text-lg'>{value.name}</span>
                                                                <div className='h-full w-px bg-muted'></div>
                                                                <span className={`text-lg ${isActive ? 'text-background/70' : 'text-foreground/50'} ${value.productCount === 0 && 'text-red-600'}`}>
                                                                    {value.productCount}
                                                                </span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </motion.div>
                                        )
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, delay: 0.3 }}
                viewport={{ once: true }}
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
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="p-4">{product.sku}</td>
                                            <td className="p-4">{product.category[0].name}</td>
                                            <td className="p-4">{product.variants.length}</td>
                                            <td className="p-4">{product.defaultPrice.toLocaleString()}</td>
                                            <td className="p-4">{product.defaultSalePrice?.toLocaleString() ?? 'NULL'}</td>
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
                                                    <button
                                                        onClick={() => handleProductUpdate(product)}
                                                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer">
                                                        <SquarePen strokeWidth={1} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleProductDelete(product._id)}
                                                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 cursor-pointer">
                                                        <Trash2 strokeWidth={1} />
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

            {products.length > 0 && (
                <div className="flex items-center justify-center py-10 gap-3">
                    <span
                        onClick={handelBackwardPagination}
                        className="border border-foreground/30 px-4 py-2 cursor-pointer hover:bg-foreground/5 transition-all ease-linear"
                    >
                        Prev
                    </span>

                    <div className="flex gap-1">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <span
                                key={i}
                                onClick={() => {
                                    handleCurrentPage(i + 1);
                                }}
                                className={`border border-foreground/30 px-3 py-2 cursor-pointer hover:bg-foreground/5 transition-all ease-linear
                                        ${currentPage === i + 1 ? "bg-foreground/10" : "bg-background"}`}
                            >
                                {i + 1}
                            </span>
                        ))}
                    </div>
                    <span
                        onClick={handelForwardPagination}
                        className="border border-foreground/30 px-4 py-2 cursor-pointer hover:bg-foreground/5 transition-all ease-linear"
                    >
                        Next
                    </span>
                </div>
            )}
        </main>
    )
}

export default ProductList