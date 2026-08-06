'use client'

import { useCatalog } from '@/hooks/useCatalog'
import { getCatalogDetails } from '@/services/catalogServices'
import { MoveRight, Plus, SquarePen, Trash2 } from 'lucide-react'
import { motion } from 'motion/react'
import React, { useEffect, useState } from 'react'

const Catalog = () => {

    const [activeCatalog, setActiveCatalog] = useState('category')
    const [catalogDataCount, setCatalogDataCount] = useState({
        category: 0,
        attribute: 0,
        fragranceFamily: 0,
        season: 0,
        gender: 0,
    })

    const { items } = useCatalog(activeCatalog)

    useEffect(() => {
        async function getCatalogCount() {
            const data = await getCatalogDetails()
            setCatalogDataCount(data.data)
        }
        getCatalogCount()
    }, [])

    const catalogData = [
        {
            title: "Category",
            description: "Organize products into categories",
            count: catalogDataCount.category,
            slug: "category",
        },
        {
            title: "Attribute",
            description: "Manage product attributes",
            count: catalogDataCount.attribute,
            slug: "attribute",
        },
        {
            title: "Fragrance Family",
            description: "Group perfumes by scent family",
            count: catalogDataCount.fragranceFamily,
            slug: "fragrance-family",
        },
        {
            title: "Season",
            description: "Assign suitable seasons",
            count: catalogDataCount.season,
            slug: "season",
        },
        {
            title: "Gender",
            description: "Manage target genders",
            count: catalogDataCount.gender,
            slug: "gender",
        },
    ];

    const handleActiveCatalog = (catalog) => {
        setActiveCatalog(catalog)
    }

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

                <section className='flex items-center justify-start gap-5 flex-wrap bg-white shadow-lg rounded-2xl py-7 px-5'>
                    {catalogData.map((data, index) => {
                        return <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            key={index}
                            className="w-65 rounded-xl border-2 border-muted/50 bg-surface/20 transition-all duration-300 ease-initial hover:-translate-y-0.5 hover:shadow-lg p-1">
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
                            <button
                                onClick={() => handleActiveCatalog(data.slug)}
                                className={`w-full flex items-center justify-between bg-background p-2 rounded-md border-2 cursor-pointer group transition-all ease-linear duration-300
                                ${activeCatalog === data.slug ? 'bg-foreground text-white border-foreground' : 'bg-background text-black border-muted/50'}`}>
                                <span>Manage</span>
                                <span className='group-hover:scale-x-130 transition-all ease-linear duration-300'>
                                    <MoveRight />
                                </span>
                            </button>
                        </motion.div>
                    })}
                </section>

                <div className='bg-background border-dashed border-t-2 border-muted/50 h-px w-full'></div>

                <section className='bg-white shadow-lg rounded-2xl px-5 py-7'>
                    <div className='flex items-center justify-between'>
                        <h3 className='text-2xl font-bold'>{activeCatalog.toUpperCase()}</h3>
                        <button className='flex items-center gap-1 bg-foreground text-white box-border border border-foreground px-7 py-2 cursor-pointer hover:bg-foreground/10 hover:text-foreground transition-all ease-linear duration-300'>
                            <span><Plus size={20} /></span>
                            <span className='font-semibold'>Create</span>
                        </button>
                    </div>

                    <div className='py-5 flex items-center justify-start gap-5'>
                        {items?.map((item, index) => {
                            return <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                key={item._id}
                                className='w-60 bg-surface/20 border border-muted/50 rounded-md p-3 space-y-3 transition-all duration-300 ease-initial hover:-translate-y-0.5 hover:shadow-lg'>
                                <input type="text" defaultValue={item.name} className='text-lg font-semibold bg-white border border-muted/50 w-full rounded-full px-3' />
                                <div className='flex items-center justify-between'>
                                    <span className=''>Active</span>
                                    <span>

                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={item.isActive}
                                                onChange={() => handleToggle(item._id)}
                                                className="sr-only peer"
                                            />
                                            <div
                                                className="relative w-9 h-5 rounded-full transition-colors bg-gray-400 peer-checked:bg-green-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-4"
                                            />
                                        </label>

                                    </span>
                                </div>
                                <div className="flex justify-between gap-2">
                                    <button
                                        className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer">
                                        <SquarePen strokeWidth={1} />
                                    </button>
                                    <button
                                        className="p-2 rounded-lg bg-red-100 hover:bg-red-200 cursor-pointer">
                                        <Trash2 strokeWidth={1} />
                                    </button>
                                </div>
                            </motion.div>
                        })}
                    </div>
                </section>
            </main>
        </>
    )
}

export default Catalog