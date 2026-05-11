'use client'
import ProductCard from '@/components/CardUI'
import Loader from '@/components/LoaderUI'
import ProductQuickView from '@/components/ProductQuickView'
import { Funnel, LayoutGrid, LayoutList, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useProducts } from '../context/ProductContext'
import { useFilter } from '../context/FilterContext'

const ShopPage = () => {

    const { products, apiResponse, loading, setQueryParams, queryParams } = useProducts()
    const { toggleFilterSide } = useFilter()

    const [productView, setProductView] = useState('grid')
    const [currentPage, setCurrentPage] = useState(1)
    const [searchInput, setSearchInput] = useState('')

    const totalPages = apiResponse.totalPages

    const handleCurrentPage = (page) => {
        setCurrentPage(page)
        setQueryParams(prev => ({
            ...prev,
            page: page
        }))
        window.scrollTo(0, 0)
    }

    const handelForwardPagination = () => {
        if (currentPage < totalPages) {
            const page = currentPage + 1
            setCurrentPage(page)
            setQueryParams(prev => ({
                ...prev,
                page: page
            }))
            window.scrollTo(0, 0)
        } else return
    }

    const handelBackwardPagination = () => {
        if (currentPage > 1) {
            const page = currentPage - 1
            setCurrentPage(page)
            setQueryParams(prev => ({
                ...prev,
                page: page
            }))
            window.scrollTo(0, 0)
        } else return
    }

     useEffect(() => {
        setTimeout(() => {
            const value = searchInput.trim()
            setQueryParams(prev => ({
                ...prev,
                search: value,
                page: 1,
            }))
        }, 500);
    }, [searchInput])

    useEffect(() => {
        setTimeout(() => {
            const value = searchInput.trim()
            setQueryParams(prev => ({
                ...prev,
                search: value,
                page: 1,
            }))
        }, 500);
    }, [searchInput])

    return (
        <>
            <ProductQuickView />
            <main className='w-10/12 mx-auto relative'>


                <div className="flex flex-col justify-end gap-5 py-4 border-b border-foreground/10">

                    <label htmlFor="search" className='flex items-center text-foreground/70'>
                        <span className='px-2 border border-foreground/20 py-2'><Search /></span>
                        <input
                            onChange={(e) => setSearchInput(e.target.value)}
                            value={searchInput}
                            type="text"
                            name="search"
                            id="search"
                            placeholder='Search our store'
                            className='w-full outline-none px-3 border border-foreground/20 py-2 hover:bg-foreground/5 transition-all ease-linear text-foreground/70' />
                    </label>

                    <section className='flex items-center justify-between'>

                        <p className="text-sm text-foreground/50">
                            Showing <span className="text-foreground font-semibold">{products.length}</span> of{' '}
                            <span className="text-foreground font-semibold">{apiResponse.total}</span> products
                        </p>

                        <div className='flex items-center justify-center gap-3'>
                            <button
                                onClick={toggleFilterSide}
                                className='text-foreground/70 border border-foreground/20 px-3 py-1 hover:text-foreground transition-all ease-linear flex items-center justify-center gap-2'>
                                <span><Funnel size={16} /></span>
                                <span>Filters</span>
                            </button>

                            <div className="flex items-center gap-1 border border-foreground/20 p-1 max-sm:hidden">
                                <button
                                    onClick={() => setProductView('grid')}
                                    className={`p-1 rounded transition-colors ${productView === 'grid' ? 'bg-foreground text-background' : 'text-foreground/40 hover:text-foreground'}`}
                                >
                                    <LayoutGrid size={16} />
                                </button>
                                <button
                                    onClick={() => setProductView('list')}
                                    className={`p-1 rounded transition-colors ${productView === 'list' ? 'bg-foreground text-background' : 'text-foreground/40 hover:text-foreground'}`}
                                >
                                    <LayoutList size={16} />
                                </button>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="flex gap-8 pt-5 max-lg:flex-col">


                    <section className="flex-1 min-w-0 pb-5">

                        <div className='flex flex-wrap justify-start items-center gap-3 relative min-h-[50vh]'>

                            <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                                {loading && products.length === 0 && <Loader />}
                            </span>

                            {products.map(prod => (
                                <ProductCard key={prod.id} product={prod} />
                            ))}
                        </div>

                        <div className='flex items-center justify-center py-10 gap-3'>
                            <span onClick={handelBackwardPagination} className='border border-foreground/30 px-4 py-2 cursor-pointer hover:bg-foreground/5 transition-all ease-linear'>Prev</span>

                            <div className='flex gap-1'>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <span
                                        key={i}
                                        onClick={() => { handleCurrentPage(i + 1) }}
                                        className={`border border-foreground/30 px-3 py-2 cursor-pointer hover:bg-foreground/5 transition-all ease-linear
                                        ${currentPage === (i + 1) ? 'bg-foreground/10' : 'bg-background'}`}
                                    >
                                        {i + 1}
                                    </span>
                                ))}
                            </div>
                            <span onClick={handelForwardPagination} className='border border-foreground/30 px-4 py-2 cursor-pointer hover:bg-foreground/5 transition-all ease-linear'>Next</span>
                        </div>
                    </section>

                </div>

            </main>
        </>
    )
}

export default ShopPage
