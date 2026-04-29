'use client'
import React, { useEffect, useState } from 'react'
import { ShoppingBag, UserRound } from 'lucide-react'
import Link from 'next/link'


const Navbar = () => {

    const navOptions = [
        { option: 'Home', src: '/' },
        { option: 'Shop', src: '/' },
        { option: 'About', src: '/' },
        { option: 'Contact', src: '/' },
    ]

    const [fixNavbar, setFixNavbar] = useState(false)

    useEffect(() => {
        const handleNavbarPosition = () => {
            if (window.scrollY > 100) {
                setFixNavbar(true)
            } else {
                setFixNavbar(false)
            }
        }
        window.addEventListener('scroll', handleNavbarPosition)

        return () => window.removeEventListener('scroll', handleNavbarPosition)
    }, [])

    return (
        <nav className={`w-10/12 mx-auto flex items-center justify-between py-7 px-3`}>
            <div>
                <Link href={'/'}>
                    <h1 className='font-display font-bold text-4xl'>Odour</h1>
                </Link>
            </div>
            <ul className='flex items-center gap-15'>
                {navOptions.map((opt, i) => {
                    return <li key={i} className='text-lg hover:text-muted transition-all ease-linear duration-300'>
                        <Link href={opt.src} >{opt.option}</Link>
                    </li>
                })}
            </ul>

            <div className='flex items-center gap-10'>
                <span className='flex items-center gap-2'>
                    <span className='hover:text-muted transition-all ease-linear duration-300 cursor-pointer'>
                        <ShoppingBag />
                    </span>
                    <span><span className='text-xs'>PKR</span> 0.00</span>
                </span>
                <span className='hover:text-muted transition-all ease-linear duration-300 cursor-pointer'>
                    <UserRound />
                </span>
            </div>
        </nav>
    )
}

export default Navbar
