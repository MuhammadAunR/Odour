import React from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const SalesChart = ({ salesData, timePeriod }) => {
    return (
        <>
            <section className='w-full h-100'>
                <ResponsiveContainer width='100%' height='100%'>
                    <AreaChart
                        data={salesData}
                        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={`${timePeriod === 'monthly sales' ? "month" : "day"}`} />
                        <YAxis tickFormatter={(value) => `PKR ${value / 1000}${value != 0 ? 'K' : ''}`} width={90} />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="sales"
                            stroke="#8884d8"
                            fillOpacity={1}
                            fill="url(#colorPv)"
                            animationBegin={200}
                            animationDuration={1300}
                        />
                    </AreaChart>
                </ResponsiveContainer>

            </section>
        </>
    )
}

export default SalesChart