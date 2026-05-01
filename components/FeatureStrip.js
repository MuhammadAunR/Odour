import React from 'react'
import ProductCard from './CardUI'
import { products } from './Assets'
import { span } from 'motion/react-client'

const FeatureStrip = () => {
    const featureStrip = [
        {
            title: 'Free Shipping',
            desc: 'Enjoy free shipping on all orders above PKR 5,000. Fast and reliable delivery to your doorstep.',
        },
        {
            title: 'Customer Support',
            desc: '24/7 customer support available. We are always here to help you with any queries.',
        },
        {
            title: 'Secure Payment',
            desc: 'Your payment is 100% secure. We use the latest encryption technology to protect your data.',
        },
        {
            title: 'Easy Returns',
            desc: 'Not satisfied? Return your order within 7 days for a full refund. No questions asked.',
        },
    ]
    return (
        <>
            <main className='w-10/12 mx-auto'>

                <section className='flex items-center justify-between gap-7 pt-15 flex-wrap'>
                    {featureStrip.map((feature, i) => {
                        return <div key={i} className='flex flex-col items-start gap-3 w-70 min-h-70 h-50 p-5'>
                            <h3 className='text-xl font-semibold'>{feature.title}</h3>
                            <div className='bg-foreground h-1 w-1/5'></div>
                            <p className='text-gray-600'>{feature.desc}</p>
                        </div>
                    })}
                </section>

                <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10'>
                    {products.slice(0, 4).map(prod => {
                        return <ProductCard key={prod.id} product={prod} />
                    })}
                </section>
            </main>
        </>
    )
}

export default FeatureStrip
