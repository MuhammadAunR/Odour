'use client'
import React, { useEffect, useState } from 'react'
import { ShoppingBag, UserRound } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/app/context/CartContext'

const Navbar = () => {

    const navOptions = [
        { option: 'Home', src: '/' },
        { option: 'Shop', src: '/' },
        { option: 'About', src: '/' },
        { option: 'Contact', src: '/' },
    ]

    const [fixNavbar, setFixNavbar] = useState(false)
    const { toggleCart } = useCart()

    useEffect(() => {
        const handleNavbarPosition = () => {
            if (window.scrollY > 105) {
                setFixNavbar(true)
            } else {
                setFixNavbar(false)
            }
        }
        window.addEventListener('scroll', handleNavbarPosition)
        return () => window.removeEventListener('scroll', handleNavbarPosition)
    }, [])

    return (
        <>
            <nav className='w-10/12 mx-auto flex items-center justify-between py-4 px-3'>
                <Link href={'/'}>
                    <h1 className='font-display font-bold text-4xl'>Odour</h1>
                </Link>
                <ul className='flex items-center gap-3'>
                    {navOptions.map((opt, i) => (
                        <li key={i} className='text-lg w-30 h-14 flex items-center justify-center transition-all ease-linear duration-300 relative group/navOption overflow-hidden'>
                            <Link href={opt.src} className='group-hover/navOption:translate-y-10 group-hover/navOption:scale-0 transition-all ease-linear duration-300'>{opt.option}</Link>
                            <span className='absolute bg-foreground text-background w-25 h-10 flex items-center justify-center rounded-3xl transition-all ease-linear duration-300 translate-y-12 scale-0 group-hover/navOption:scale-100 group-hover/navOption:translate-y-0 cursor-pointer'>{opt.option}</span>
                        </li>
                    ))}
                </ul>
                <div className='flex items-center gap-10'>
                    <span className='flex items-center gap-2'>
                        <span onClick={toggleCart} className='hover:text-muted transition-all ease-linear duration-300 cursor-pointer'>
                            <ShoppingBag />
                        </span>
                        <span><span className='text-xs'>PKR</span> 0.00</span>
                    </span>
                    <span className='hover:text-muted transition-all ease-linear duration-300 cursor-pointer'>
                        <UserRound />
                    </span>
                </div>
            </nav>

            <nav className={`
                fixed top-0 left-0 w-full z-50
                bg-background transition-transform duration-500 ease-in-out border-b border-foreground
                ${fixNavbar ? 'translate-y-0 scale-100' : '-translate-y-full scale-0'}
            `}>
                <div className='w-10/12 mx-auto flex items-center justify-between py-4 px-3'>
                    <Link href={'/'}>
                        <h1 className='font-display font-bold text-4xl'>Odour</h1>
                    </Link>
                    <ul className='flex items-center gap-3'>
                        {navOptions.map((opt, i) => (
                            <li key={i} className='text-lg w-30 h-14 flex items-center justify-center transition-all ease-linear duration-300 relative group/navOption overflow-hidden'>
                                <Link href={opt.src} className='group-hover/navOption:translate-y-10 group-hover/navOption:scale-0 transition-all ease-linear duration-300'>{opt.option}</Link>
                                <span className='absolute bg-foreground text-background w-25 h-10 flex items-center justify-center rounded-3xl transition-all ease-linear duration-300 translate-y-12 scale-0 group-hover/navOption:scale-100 group-hover/navOption:translate-y-0 cursor-pointer'>{opt.option}</span>
                            </li>
                        ))}
                    </ul>
                    <div className='flex items-center gap-10'>
                        <span className='flex items-center gap-2'>
                            <span onClick={toggleCart} className='hover:text-muted transition-all ease-linear duration-300 cursor-pointer'>
                                <ShoppingBag />
                            </span>
                            <span><span className='text-xs'>PKR</span> 0.00</span>
                        </span>
                        <span className='hover:text-muted transition-all ease-linear duration-300 cursor-pointer'>
                            <UserRound />
                        </span>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar