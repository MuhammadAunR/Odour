'use client'

import { SimpleLoader } from '@/components/admin/AuthPagesCompos'
import useBlockYScroll from '@/components/BlockYScroll'
import { useCatalog } from '@/hooks/useCatalog'
import { getCatalogDetails } from '@/services/catalogServices'
import { CircleCheck, CircleX, MoveRight, Plus, Save, SquarePen, Trash2, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Catalog = () => {


    const [activeCatalog, setActiveCatalog] = useState('category')
    const { items, deleteItem, updateItem, createItem, loading, deletingId } = useCatalog(activeCatalog)
    const [formAction, setFormAction] = useState('Create')
    const [popupOpening, setPopupOpening] = useState(false)
    const [catalogDataCount, setCatalogDataCount] = useState({
        category: 0,
        attribute: 0,
        fragranceFamily: 0,
        season: 0,
        gender: 0,
    })
    const [newCatalogItem, setNewCatalogItem] = useState({
        name: "",
        isActive: false
    })

    const catalogNameFormat = (name) => {
        if (name === 'fragranceFamily' || name === 'fragrance-family') {
            return 'Fragrance Family'
        } else {
            return name.charAt(0).toUpperCase() + name.slice(1)
        }
    }

    const handleCatalogItemUpdate = (name, isActive, _id) => {
        setNewCatalogItem({
            id: _id,
            name: name,
            isActive: isActive
        })
        setPopupOpening(true);
        setFormAction('Update')
    }

    useBlockYScroll(popupOpening)

    const handleNewCatalogItem = (e) => {
        const { name, value, checked, type } = e.target;

        setNewCatalogItem(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleCatalogPopupSubmit = () => {
        if (formAction === 'Create') {
            if (!newCatalogItem.name.trim()) {
                toast.warning('Input required')
                return
            }
            createItem(newCatalogItem)
            toast.success(`${catalogNameFormat(activeCatalog)} Added`)
        } else {
            updateItem(newCatalogItem.id, newCatalogItem)
            toast.success(`${catalogNameFormat(activeCatalog)} Updated`)
        }
        setNewCatalogItem({
            name: "",
            isActive: false
        })
        setPopupOpening(false)
    }

    const handleFormCancel = () => {
        setNewCatalogItem({
            name: "",
            isActive: false
        })
        setPopupOpening(false)
        setFormAction('Create')
    }

    useEffect(() => {
        async function getCatalogCount() {
            const data = await getCatalogDetails()
            setCatalogDataCount(data.data)
        }
        getCatalogCount()
    }, [items])

    const handleActiveCatalog = (catalog) => {
        setActiveCatalog(catalog)
    }

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

    return (
        <>
            <main className='py-5 px-2 space-y-5 relative'>
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
                        <button
                            onClick={() => setPopupOpening(true)}
                            className='flex items-center gap-1 bg-foreground text-white box-border border border-foreground px-7 py-2 cursor-pointer hover:bg-foreground/10 hover:text-foreground transition-all ease-linear duration-300'>
                            <span><Plus size={20} /></span>
                            <span className='font-semibold'>Create</span>
                        </button>
                    </div>

                    <div className='py-5 flex items-center justify-start gap-5'>
                        {loading ?
                            <div className='w-full flex items-center justify-center'>
                                <SimpleLoader />
                            </div>
                            : items?.map((item, index) => {
                                return <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    key={item._id}
                                    className='w-60 bg-surface/20 border border-muted/50 rounded-md p-3 space-y-5 transition-all duration-300 ease-initial hover:-translate-y-0.5 hover:shadow-lg'>

                                    <span className='text-lg font-semibold'>{item.name}</span>

                                    <div className='flex items-center justify-between'>
                                        <span className=''>Active</span>
                                        <span className={`${item.isActive ? 'text-green-500' : 'text-gray-500'} w-5 h-5 rounded-full mr-3`}>
                                            {item.isActive ? <CircleCheck /> : <CircleX />}
                                        </span>
                                    </div>
                                    <div className="flex justify-between gap-2">
                                        <button
                                            onClick={() => handleCatalogItemUpdate(item.name, item.isActive, item._id)}
                                            className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer">
                                            <SquarePen strokeWidth={1} />
                                        </button>
                                        <button
                                            onClick={() => deleteItem(item._id, item)}
                                            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 cursor-pointer">
                                            {deletingId === item._id ? <SimpleLoader /> : <Trash2 strokeWidth={1} />}
                                        </button>
                                    </div>
                                </motion.div>
                            })}
                    </div>
                </section>

                {/* Catalog Popup Component  */}
                <AnimatePresence>
                    {popupOpening && (
                        <motion.section
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-lg"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{
                                    duration: 0.25,
                                    ease: "easeOut",
                                }}
                                className="w-100 min-h-70 h-fit bg-surface border border-muted/50 rounded-lg p-5 space-y-7"
                            >
                                <div className="flex items-center justify-between">
                                    <h1 className="text-lg font-semibold">{formAction}</h1>

                                    <button
                                        onClick={handleFormCancel}
                                        className="bg-white rounded-full p-1 border border-transparent transition-all duration-300 hover:border-muted"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <input
                                        type="text"
                                        onChange={(e) => handleNewCatalogItem(e)}
                                        value={newCatalogItem?.name}
                                        name='name'
                                        placeholder={`Enter a ${catalogNameFormat(activeCatalog)}`}
                                        className="text-lg font-semibold w-full px-3 py-1 rounded-md outline-none border border-muted/50 transition-all duration-300 hover:border-muted"
                                    />

                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold">Active</span>

                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                onChange={(e) => handleNewCatalogItem(e)}
                                                checked={newCatalogItem?.isActive}
                                                name='isActive'
                                                className="sr-only peer"
                                            />

                                            <div className="relative w-9 h-5 rounded-full transition-colors bg-gray-400 peer-checked:bg-green-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-4" />
                                        </label>
                                    </div>
                                </div>

                                <div className="h-px w-full bg-foreground" />

                                <button
                                    onClick={handleCatalogPopupSubmit}
                                    className="w-full bg-foreground text-background border-2 border-foreground rounded-md py-2.5 font-semibold hover:bg-background hover:text-foreground transition-colors duration-300 cursor-pointer">
                                    Save
                                </button>
                            </motion.div>
                        </motion.section>
                    )}
                </AnimatePresence>
            </main>
        </>
    )
}

export default Catalog