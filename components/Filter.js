'use client'

import { useFilter } from '@/app/context/FilterContext'
import { ChevronDown, X } from 'lucide-react'
import React, { useState } from 'react'
import useBlockYScroll from './BlockYScroll'
import { Button1 } from './ButtonUI'
import { useProducts } from '@/app/context/ProductContext'

const Filter = () => {
    const { isFilterSideOpen, toggleFilterSide, setActiveFilterCount } = useFilter()
    const { filters, setQueryParams, queryParams } = useProducts()

    const [draftParams, setDraftParams] = useState(queryParams)
    const [open, setOpen] = useState('')

    const defaultParams = {
        page: 1,
        limit: 12,
        gender: '',
        season: '',
        fragranceFamily: '',
        search: '',
        sort: 'id_asc'
    }

    useBlockYScroll(isFilterSideOpen)

    const handleOpenFilterSection = (section) => {
        setOpen(prev => prev === section ? null : section)
    }

    const handleApplyFilter = (filterType, filterName) => {
        setActiveFilterCount(prev => [...prev, filterName])
        setDraftParams(prev => {
            const newValue = prev[filterType] === filterName ? '' : filterName
            return {
                ...prev,
                [filterType]: newValue,
                page: 1
            }
        })
    }

    // useEffect(() => {
    //     if (isFilterSideOpen) {
    //         setDraftParams(queryParams)
    //         handleOpenFilterSection()
    //     }
    // }, [isFilterSideOpen])

    const handleApply = () => {
        setQueryParams(draftParams)
        toggleFilterSide()
    }

    const handleReset = () => {
        setDraftParams(defaultParams)
        setQueryParams(defaultParams)
        setActiveFilterCount([])
        toggleFilterSide()
    }

    return (
        <>
            <main className='w-full flex'>

                <section onClick={() => { toggleFilterSide() }}
                    className={`bg-surface/50 backdrop-blur-lg h-screen fixed top-0 z-200 w-full ${isFilterSideOpen ? 'block' : 'hidden'}`}>
                </section>

                <aside
                    className={`h-screen w-full bg-surface max-w-100 fixed top-0 right-0 z-200 flex flex-col transition-all ease-linear ${isFilterSideOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                    <div className='flex items-center justify-between px-5 py-6 border-b-2 border-accent shrink-0'>
                        <h3 className='text-2xl font-semibold'>Filters</h3>
                        <span onClick={toggleFilterSide}>
                            <X size={28} className='cursor-pointer hover:rotate-180 hover:text-accent transition-all ease-linear' />
                        </span>
                    </div>

                    <section className="flex-1 overflow-hidden px-5 space-y-5 py-3">


                        <section className='flex flex-col flex-1 overflow-y-scroll'>

                            {filters.map((filter) => {
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
                                                    <label
                                                        key={opt.value}
                                                        className="flex items-center py-2 justify-between group/category px-2 cursor-pointer hover:bg-foreground/5 transition-colors duration-300"
                                                    >
                                                        <div className="flex items-center gap-5">
                                                            <input
                                                                type="checkbox"
                                                                checked={
                                                                    Array.isArray(draftParams[filter.key])
                                                                        ? draftParams[filter.key].includes(opt.value)
                                                                        : draftParams[filter.key] === opt.value
                                                                }
                                                                onChange={() => handleApplyFilter(filter.key, opt.value)}
                                                            />
                                                            <span className="group-hover/category:text-muted transition-colors duration-300">
                                                                {opt.value}
                                                            </span>
                                                        </div>

                                                        <div className="bg-foreground/30 p-0.5 rounded-full text-xs w-7 h-7 flex items-center justify-center group-hover/category:bg-muted group-hover/category:text-background transition-colors duration-300">
                                                            {opt.count}
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                );
                            })}
                        </section>

                    </section>

                    <div className='px-5 border-t-2 border-accent py-4 shrink-0 sticky bottom-0 flex justify-between'>
                        <span onClick={handleReset} className=''>
                            <Button1 text={'Reset'} />
                        </span>
                        <span onClick={handleApply} className=''>
                            <Button1 text={'Apply'} />
                        </span>
                    </div>
                </aside>
            </main>
        </>
    )
}

export default Filter
