'use client'
import React, { useState } from 'react'
import SalesChart from './dashboard-components/SalesChart';
import { motion } from 'motion/react';
import RevenueAnalytics from './dashboard-components/RevenueAnalytics';

const MainContentSection = () => {

    const [activeTimePeriodChart, setActiveTimePeriodChart] = useState('monthly sales')
    const monthlySalesData = [
        {
            month: "Jan",
            sales: 45000,
        },
        {
            month: "Feb",
            sales: 62000,
        },
        {
            month: "Mar",
            sales: 58000,
        },
        {
            month: "Apr",
            sales: 81000,
        },
        {
            month: "May",
            sales: 97000,
        },
        {
            month: "Jun",
            sales: 125000,
        },
        {
            month: "Jul",
            sales: 110000,
        },
    ];
    const weeklySalesData = [
        {
            day: "Mon",
            sales: 12000,
        },
        {
            day: "Tue",
            sales: 18500,
        },
        {
            day: "Wed",
            sales: 14000,
        },
        {
            day: "Thu",
            sales: 22000,
        },
        {
            day: "Fri",
            sales: 28000,
        },
        {
            day: "Sat",
            sales: 35000,
        },
        {
            day: "Sun",
            sales: 30000,
        },
    ];

    const handleActiveTimePeriodSales = (sale) => {
        setActiveTimePeriodChart(sale)
    }
    return (
        <>
            <main className='space-y-5 py-5 px-2 flex items-center flex-wrap gap-3'>

                <motion.div
                    key={activeTimePeriodChart}
                    initial={{
                        opacity: 0,
                        y: 20,
                        filter: "blur(10px)"
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)"
                    }}
                    transition={{
                        duration: 0.6,
                        ease: "easeOut"
                    }}
                    viewport={{
                        once: true,
                        amount: 0.2
                    }}
                    className='py-7 px-5 bg-white shadow-lg rounded-2xl w-full space-y-7'>
                    <h2 className='text-2xl font-semibold'>Sales Chart</h2>
                    <div className='flex items-center justify-start gap-2'>
                        {['Monthly Sales', 'Weekly Sales'].map((sale, index) => {
                            return <button
                                key={index}
                                onClick={() => handleActiveTimePeriodSales(sale.toLowerCase())}
                                className={`border-2 border-foreground/70 px-4 py-1 text-xs font-semibold hover:bg-foreground/80 hover:text-background transition-all ease-linear duration-300
                                ${activeTimePeriodChart === sale.toLowerCase() ? 'bg-foreground/80 text-background' : 'bg-background text-foreground'}    
                                cursor-pointer`}>{sale}</button>
                        })}
                    </div>
                    <SalesChart timePeriod={activeTimePeriodChart} salesData={activeTimePeriodChart === 'monthly sales' ? monthlySalesData : weeklySalesData} />
                </motion.div>

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                        filter: "blur(10px)"
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)"
                    }}
                    transition={{
                        duration: 0.6,
                        ease: "easeOut"
                    }}
                    viewport={{
                        once: true,
                        amount: 0.2
                    }}
                    className='py-7 px-5 bg-white shadow-lg rounded-2xl w-full space-y-7'>
                    <h2 className='text-2xl font-semibold'>Revenue Analytics</h2>
                    <RevenueAnalytics />
                </motion.div>
            </main>
        </>
    )
}

export default MainContentSection