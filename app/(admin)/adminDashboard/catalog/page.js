'use client'

import { MoveRight } from 'lucide-react'
import { motion } from 'motion/react'
import React from 'react'

const Catalog = () => {

    const catalogData = [
        {
            title: "Category",
            description: "Organize products into categories",
            count: 12,
            slug: "category",
        },
        {
            title: "Attribute",
            description: "Manage product attributes",
            count: 20,
            slug: "attribute",
        },
        {
            title: "Fragrance Family",
            description: "Group perfumes by scent family",
            count: 8,
            slug: "fragrance-family",
        },
        {
            title: "Season",
            description: "Assign suitable seasons",
            count: 4,
            slug: "season",
        },
        {
            title: "Gender",
            description: "Manage target genders",
            count: 3,
            slug: "gender",
        },
    ];

    return (
        <>
            <main className='py-5 px-2 space-y-5'>
                <motion.header
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.01 }}
                    viewport={{ once: true }}
                    className='w-full py-7 px-5 bg-white shadow-lg rounded-2xl'>
                    <h1 className='text-2xl font-bold'>Catalog Management</h1>
                    <p className='text-muted'>Manage categories, fragrance families,
                        attributes, genders and seasons.</p>
                </motion.header>

                <section className='flex items-center justify-center gap-5 flex-wrap bg-white shadow-lg rounded-2xl py-7 px-5'>
                    {catalogData.map((data, index) => {
                        return <div key={index} className="w-60 rounded-xl border-2 border-muted/50 bg-surface/20 transition-all duration-300 ease-initial hover:-translate-y-0.5 hover:shadow-lg p-1">
                            <div className='p-5 h-40'>
                                <h3 className="text-xl font-semibold">{data.title}</h3>

                                <p className="mt-1 text-sm text-muted">
                                    {data.description}
                                </p>
                                <div>
                                    <p className="text-2xl font-bold">{data.count}</p>
                                    <span className="text-sm text-muted">Items</span>
                                </div>
                            </div>
                            <div className='flex items-center justify-between bg-background p-2 rounded-md border-2 border-muted/50 cursor-pointer group'>
                                <span>Manage</span>
                                <span className='group-hover:scale-x-130 transition-all ease-linear duration-300'><MoveRight /></span>
                            </div>
                        </div>
                    })}
                </section>

                <div className='bg-background border-dashed border-t-2 border-muted/50 h-px w-full'></div>

                <section className='bg-white shadow-lg rounded-2xl'>

                </section>
            </main>
        </>
    )
}

export default Catalog