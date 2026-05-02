import { products } from '@/components/Assets'
import ProductCard from '@/components/CardUI'
import React from 'react'

const ShopPage = () => {
    return (
        <>
            <main className='w-10/12 mx-auto'>

                <div className="flex gap-8 pt-20">

                    <aside className="w-[30%] shrink-0 min-h-screen h-fit">
                        f
                    </aside>


                    <section className="flex-1 min-w-0">
                        <div className='grid grid-cols-2 xl:grid-cols-3 gap-4'>
                            {products.map(prod => (
                                <ProductCard key={prod.id} product={prod} />
                            ))}
                        </div>
                    </section>

                </div>

            </main>
        </>
    )
}

export default ShopPage
