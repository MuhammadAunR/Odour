import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const RevenueAnalytics = () => {

    const revenueAnalyticsData = [
        {
            month: "Jan",
            revenue: 220000,
            expenses: 90000,
            profit: 130000,
        },
        {
            month: "Feb",
            revenue: 280000,
            expenses: 110000,
            profit: 170000,
        },
        {
            month: "Mar",
            revenue: 250000,
            expenses: 105000,
            profit: 145000,
        },
        {
            month: "Apr",
            revenue: 320000,
            expenses: 130000,
            profit: 190000,
        },
        {
            month: "May",
            revenue: 410000,
            expenses: 160000,
            profit: 250000,
        },
        {
            month: "Jun",
            revenue: 480000,
            expenses: 185000,
            profit: 295000,
        },
        {
            month: "Jul",
            revenue: 530000,
            expenses: 210000,
            profit: 320000,
        },
    ];

    return (
        <>
            <section className='w-full h-100'>
                <ResponsiveContainer width='100%' height='100%'>
                    <LineChart
                        data={revenueAnalyticsData}
                        margin={{ top: 5, right: 0, left: 0, bottom: 5, }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="month"
                            stroke="#6b7280"
                        />

                        <YAxis
                            width={90}
                            stroke="#6b7280"
                            tickFormatter={(value) =>
                                `PKR ${value / 1000}${value !== 0 ? 'K' : ''}`
                            }
                        />

                        <Tooltip
                            cursor={{
                                stroke: "#94a3b8",
                                strokeWidth: 2,
                                strokeDasharray: "5 5",
                            }}
                            contentStyle={{
                                backgroundColor: "#ffffff",
                                border: "1px solid #e5e7eb",
                                borderRadius: "12px",
                                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                            }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#22c55e"
                            dot={{
                                fill: '#22c55e',
                            }}
                            activeDot={{ r: 6, stroke: '#22c55e' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="profit"
                            stroke="#3b82f6"
                            dot={{
                                fill: '#3b82f6',
                            }}
                            activeDot={{ r: 4, stroke: '#3b82f6' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="expenses"
                            stroke="#ef4444"
                            dot={{
                                fill: '#ef4444',
                            }}
                            activeDot={{ stroke: '#ef4444' }}
                        />
                    </LineChart>
                </ResponsiveContainer>

            </section>
        </>
    )
}

export default RevenueAnalytics