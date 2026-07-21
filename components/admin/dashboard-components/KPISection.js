'use client'

import { Blocks, ShoppingCart, Users, DollarSign } from 'lucide-react'
import { motion } from 'motion/react'
import React from 'react'

const KPISection = () => {

    const dashboardCards = [
        {
            title: "Products",
            value: 156,
            icon: Blocks,
            bgColor: "bg-blue-100",
            textColor: "text-blue-700",
        },
        {
            title: "Orders",
            value: 324,
            icon: ShoppingCart,
            bgColor: "bg-green-100",
            textColor: "text-green-700",
        },
        {
            title: "Customers",
            value: 128,
            icon: Users,
            bgColor: "bg-purple-100",
            textColor: "text-purple-700",
        },
        {
            title: "Revenue",
            value: "PKR 245K",
            icon: DollarSign,
            bgColor: "bg-yellow-100",
            textColor: "text-yellow-700",
        },
    ];

    return (
        <>
            <main className='space-y-5 py-5 px-2'>

                <motion.section
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: false }}
                    className='w-full flex items-center justify-between py-7 px-5 bg-white shadow-lg rounded-2xl'>
                    {dashboardCards.map(card => {
                        const Icon = card.icon
                        return <div key={card.title} className='w-60 min-h-20 p-5 bg-surface/30 border-2 border-surface rounded-lg flex gap-2 hover:shadow-md transition-all ease-linear duration-300'>
                            <span className={`${card.bgColor} ${card.textColor} h-fit p-2 rounded-md`}>
                                <Icon size={50} />
                            </span>
                            <div className='flex flex-col items-start gap-2'>
                                <h1 className='text-lg font-semibold'>{card.title}</h1>
                                <span className='text-2xl font-bold'>{card.value}</span>
                            </div>
                        </div>
                    })}
                </motion.section>

            </main>
        </>
    )
}

export default KPISection