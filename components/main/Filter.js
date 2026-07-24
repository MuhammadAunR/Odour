'use client'

import { useFilter } from '@/app/context/FilterContext'
import { X } from 'lucide-react'
import React, { useState } from 'react'
import useBlockYScroll from '../BlockYScroll'
import { SecondaryButton } from '../UI/Buttons'
import { useRouter } from 'next/navigation'

const Filter = () => {
    const { filters, isFilterSideOpen, toggleFilterSide, queryParams } = useFilter()

    const [draftParams, setDraftParams] = useState(queryParams)
    const router = useRouter()

    useBlockYScroll(isFilterSideOpen)

    const handleApplyFilter = (filterType, filterName) => {
        setDraftParams(prev => ({
            ...prev,
            [filterType]: prev[filterType] === filterName ? '' : filterName,
        }));
    }

    console.log(draftParams)
    const handleApply = () => {
        const cleanParams = Object.fromEntries(
            Object.entries(draftParams).filter(([_, v]) => v !== "" && v !== null))

        const params = new URLSearchParams(cleanParams)
        router.push(`/shop?${params.toString()}`)
        toggleFilterSide()
    }

    const handleReset = () => {
        router.push('/shop?page=1&limit=12')
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
                        <h3 className='text-2xl font-bold font-serif'>Filters</h3>
                        <span onClick={toggleFilterSide}>
                            <X size={28} className='cursor-pointer hover:rotate-180 hover:text-accent transition-all ease-linear' />
                        </span>
                    </div>

                    <section className="flex flex-1 overflow-hidden px-5 space-y-5 py-3 overscroll-y-contain" data-lenis-prevent>

                        <section className='flex flex-col flex-1 overflow-y-scroll gap-2'>

                            {Object.entries(filters).map(([key, values]) => {
                                return (
                                    <div key={key} className="flex flex-col border-b border-foreground/20 pb-4">

                                        <h3 className="font-bold font-serif px-2 py-3">
                                            {key === 'fragranceFamilies' ? 'Fragrance Families' : key.charAt(0).toUpperCase() + key.slice(1)}
                                        </h3>

                                        <div className="flex flex-wrap gap-2 px-2">
                                            {values.map((value) => {
                                                const isActive = draftParams[key] === value.name;
                                                return (
                                                    <button
                                                        key={value.name}
                                                        type="button"
                                                        onClick={() => handleApplyFilter(key, value.name)}
                                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm transition-colors duration-300 cursor-pointer
                                                               ${isActive
                                                                ? 'bg-foreground text-background border-foreground'
                                                                : 'bg-transparent text-foreground border-foreground/30 hover:border-foreground/60'
                                                            }`}
                                                    >
                                                        <span>{value.name}</span>
                                                        <span className={`text-xs ${isActive ? 'text-background/70' : 'text-foreground/50'}`}>
                                                            {value.count}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                    </div>
                                );
                            })}
                        </section>

                    </section>

                    <div className='px-5 border-t-2 border-accent py-4 shrink-0 sticky bottom-0 flex justify-between'>
                        <span onClick={handleReset} className=''>
                            <SecondaryButton text={'Reset'} />
                        </span>
                        <span onClick={handleApply} className=''>
                            <SecondaryButton text={'Apply'} />
                        </span>
                    </div>
                </aside>
            </main>
        </>
    )
}

export default Filter
