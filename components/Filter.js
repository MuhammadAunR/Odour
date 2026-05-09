'use client'

import { useFilter } from '@/app/context/FilterContext'
import React from 'react'

const Filter = () => {
    const { isFilterSideOpen, toggleFilterSide } = useFilter()
    return (
        <>
            <main className='w-full flex'>

                <section onClick={toggleFilterSide} className={`bg-surface/50 backdrop-blur-lg h-screen fixed top-0 z-200 w-full ${isFilterSideOpen ? 'block' : 'hidden'}`}>
                </section>

                <aside
                    className={`h-screen w-full bg-surface max-w-100 fixed top-0 right-0 z-200 flex flex-col transition-all ease-linear ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                </aside>
            </main>
        </>
    )
}

export default Filter
