'use client'
import ProductCard from '@/components/CardUI'
import { ChevronDown, LayoutGrid, LayoutList } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const ShopPage = () => {

    const [open, setOpen] = useState('')
    const [productView, setProductView] = useState('grid')
    const [currentPage, setCurrentPage] = useState(1)
    const [products, setProducts] = useState([])
    const [filters, setFilters] = useState([])
    const [apiResponse, setApiResponse] = useState({})
    const [itemsPerFilter, setItemsPerFilter] = useState([])

    const productsPerPage = 12
    const totalPages = Math.ceil((products.length / productsPerPage))

    const startIndex = (currentPage - 1) * productsPerPage
    const endIndex = startIndex + productsPerPage

    const currentProducts = products.slice(startIndex, endIndex)

    useEffect(() => {
        async function getAllProducts() {
            const res = await fetch('/api/products')
            const data = await res.json()
            setProducts(data.products)
            console.log("All Products", data)

            setApiResponse(data)
        }

        async function getItemsPerFilter() {
            const res = await fetch('/api/filter-count')
            const data = await res.json()
            console.log("Filter Count", data)

            const filterItemArray = Object.entries(data).map(([key, value]) => ({
                title: key.charAt(0).toUpperCase() + key.slice(1),
                options: value.map(item => ({
                    value: item._id,
                    count: item.count || 0,
                }))
            }))
            setItemsPerFilter(filterItemArray)
        }

        getAllProducts()
        getItemsPerFilter()

    }, [])


    const handleOpenFilterSection = (section) => {
        setOpen(prev => prev === section ? null : section)
    }

    const handleCurrentPage = (page) => {
        setCurrentPage(page)
    }

    const handelForwardPagination = () => {
        if (currentPage < totalPages) {
            const page = currentPage + 1
            setCurrentPage(page)
        } else return
    }

    const handelBackwardPagination = () => {
        if (currentPage > 1) {
            const page = currentPage - 1
            setCurrentPage(page)
        } else return
    }

    return (
        <>
            <main className='w-10/12 mx-auto relative'>

                <div className="flex items-center justify-between py-4 border-b border-foreground/10">

                    <p className="text-sm text-foreground/50">
                        Showing <span className="text-foreground font-semibold">{products.length}</span> of{' '}
                        <span className="text-foreground font-semibold">{apiResponse.total}</span> products
                    </p>

                    <div className="flex items-center gap-1 border border-foreground/20 rounded p-1">
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

                <div className="flex gap-8 pt-5 max-lg:flex-col">

                    <aside className="lg:w-[30%] lg:shrink-0 lg:min-h-screen h-fit lg:border-r border-foreground/30 lg:pr-10 py-5 max-lg:flex-col max-lg:border-b space-y-5">

                        <section>
                            <label htmlFor="search" className='flex flex-col items-start gap-4'>
                                <span className='font-semibold text-foreground'>Search</span>
                                <input
                                    type="text"
                                    name="search"
                                    id="search"
                                    placeholder='Search our store'
                                    className='w-full outline-none px-3 border border-foreground/20 py-2 hover:bg-foreground/5 transition-all ease-linear cursor-pointer text-foreground/70' />
                            </label>
                        </section>

                        <section className='py-5 flex flex-col gap-'>

                            {itemsPerFilter.map((filter) => {
                                const isOpen = open === filter.title;

                                return (
                                    <div key={filter.title} className="flex flex-col border-b border-foreground/20">

                                        <div
                                            onClick={() => handleOpenFilterSection(filter.title)}
                                            className="flex items-center justify-between hover:bg-foreground/5 px-2 py-3 cursor-pointer">
                                            <h3 className="font-semibold">{filter.title === 'FragranceFamily' ? 'Fragrance Family' : filter.title}</h3>
                                            <span className={`transition-transform duration-300 ease-linear ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                                                <ChevronDown size={20} />
                                            </span>
                                        </div>


                                        <div
                                            className="grid transition-all duration-300 ease-in-out"
                                            style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                                            <div className="overflow-hidden">
                                                {filter.options.map((opt) => (
                                                    <div
                                                        key={opt.value}
                                                        className="flex items-center py-2 justify-between group/category px-2"
                                                    >
                                                        <label className="flex items-center gap-5 cursor-pointer group-hover/category:text-muted transition-colors duration-300">
                                                            <input type="checkbox" />
                                                            <span>{opt.value}</span>
                                                        </label>
                                                        <div className="bg-foreground/30 p-0.5 rounded-full text-xs w-7 h-7 flex items-center justify-center cursor-pointer group-hover/category:bg-muted group-hover/category:text-background transition-colors duration-300">
                                                            {opt.count}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                );
                            })}
                        </section>

                    </aside>


                    <section className="flex-1 min-w-0 pb-5">

                        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2'>
                            {currentProducts.map(prod => (
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
