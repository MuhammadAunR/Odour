import React from 'react'

const Header = () => {
    return (
        <>
            <header className='space-y-5 py-5 px-2'>
                <section className='w-full py-7 px-5 bg-white shadow-lg rounded-2xl flex items-center justify-between'>
                    <div className='flex flex-col'>
                        <h1 className='font-bold text-2xl'>
                            Welcome Back, Admin 👋
                        </h1>
                        <p className='text-sm text-foreground/50'>Here what's heppening with yoour store</p>
                    </div>
                    <span className='font-semibold text-lg'>
                        Date: {new Date().toDateString()}
                    </span>
                </section>
            </header>
        </>
    )
}

export default Header