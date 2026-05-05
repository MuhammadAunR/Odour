'use client'
import React, { useEffect, useState } from 'react'
import { ShoppingBag, UserRound } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/app/context/CartContext'
import HamburgerComp from './HamburgerComp'
import { useNavContext } from '@/app/context/NavbarContext'
import { navOptions } from './Assets'
import { usePathname } from 'next/navigation'

const Navbar = () => {

    const [fixNavbar, setFixNavbar] = useState(false)
    const { toggleCart, cartItems, handleSubTotal } = useCart()
    const { toggleNavbar, isOpen } = useNavContext()
    const [activeNav, setActiveNav] = useState('home')

    const pathname = usePathname()
    useEffect(() => {
        const nav = pathname.slice(1) === '' ? 'home' : pathname.slice(1)
        setActiveNav(nav)
    }, [pathname])


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

    const handleActiveNavOption = (option) => {
        setActiveNav(option)
    }

    return (
        <>
            <nav className='bg-foreground/5'>
                <section className='w-10/12 mx-auto flex items-center justify-between py-4 h-20'>

                    <Link href={'/'} className=''>
                        <h1 className='font-display font-bold text-4xl max-lg:hidden'>Odour</h1>
                        <span className='lg:hidden'>
                            <HamburgerComp isOpen={isOpen} onClick={toggleNavbar} />
                        </span>
                    </Link>

                    <h1 className='font-display font-bold text-4xl lg:hidden'>Odour</h1>

                    <ul className='flex items-center gap-3 max-lg:hidden'>
                        {navOptions.map((opt, i) => (
                            <Link onClick={() => handleActiveNavOption(opt.option)} href={opt.src} key={i} className='text-lg w-25 h-14 flex items-center justify-center transition-all ease-linear duration-300 relative group/navOption overflow-hidden'>

                                <li className={`transition-all ease-linear duration-300 ${activeNav === opt.option.toLowerCase() ? '' : 'group-hover/navOption:translate-y-10 group-hover/navOption:scale-0'}`}>{opt.option}</li>
                                <span className={`absolute bg-foreground text-background w-20 px-2 h-10 flex items-center justify-center rounded-3xl transition-all ease-linear duration-300 cursor-pointer
                            ${activeNav === opt.option.toLowerCase() ? 'translate-y-0  scale-100' : 'translate-y-12  scale-0 group-hover/navOption:scale-100 group-hover/navOption:translate-y-0'}`}>{opt.option}</span>

                            </Link>
                        ))}
                    </ul>
                    <div className='flex items-center gap-5'>
                        <span className='flex items-center gap-2'>
                            <span onClick={toggleCart} className='hover:text-muted transition-all ease-linear duration-300 cursor-pointer relative'>
                                <ShoppingBag />
                                {cartItems.length > 0 &&
                                    <span className='absolute w-5 h-5 rounded-full bg-foreground text-background text-xs -top-2 -left-2 flex items-center justify-center'>
                                        {cartItems.length}
                                    </span>
                                }
                            </span>
                            <span className='max-md:hidden text-xs'>PKR {handleSubTotal === 0 ? '0.00' : handleSubTotal}</span>
                        </span>
                        <span className='hover:text-muted transition-all ease-linear duration-300 cursor-pointer'>
                            <UserRound />
                        </span>
                    </div>
                </section>
            </nav>

            <nav className={`
                fixed top-0 left-0 w-full z-50
                bg-background/50 backdrop-blur-2xl transition-transform duration-500 ease-in-out border-b border-foreground
                ${fixNavbar ? 'translate-y-0 scale-100' : '-translate-y-full scale-0'}
            `}>
                <div className='w-10/12 mx-auto flex items-center justify-between py-4 h-20'>
                    <Link href={'/'} className=''>
                        <h1 className='font-display font-bold text-4xl max-lg:hidden'>Odour</h1>
                        <span className='lg:hidden'>
                            <HamburgerComp isOpen={isOpen} onClick={toggleNavbar} />
                        </span>
                    </Link>
                    <h1 className='font-display font-bold text-4xl lg:hidden'>Odour</h1>
                    <ul className='flex items-center gap-3 max-lg:hidden'>
                        {navOptions.map((opt, i) => (
                            <Link onClick={() => handleActiveNavOption(opt.option)} href={opt.src} key={i} className='text-lg w-25 h-14 flex items-center justify-center transition-all ease-linear duration-300 relative group/navOption overflow-hidden'>
                                <li className={`transition-all ease-linear duration-300
                                     ${activeNav === opt.option.toLowerCase() ? '' : 'group-hover/navOption:translate-y-10 group-hover/navOption:scale-0'}`}>{opt.option}</li>
                                <span className={`absolute bg-foreground text-background w-20 px-2 h-10 flex items-center justify-center rounded-3xl transition-all ease-linear duration-300 cursor-pointer
                            ${activeNav === opt.option.toLowerCase() ? 'translate-y-0  scale-100' : 'translate-y-12  scale-0 group-hover/navOption:scale-100 group-hover/navOption:translate-y-0'}`}>{opt.option}</span>

                            </Link>
                        ))}
                    </ul>
                    <div className='flex items-center gap-5'>
                        <span className='flex items-center gap-2'>
                            <span onClick={toggleCart} className='hover:text-muted transition-all ease-linear duration-300 cursor-pointer relative'>
                                <ShoppingBag />
                                {cartItems.length > 0 &&
                                    <span className='absolute w-5 h-5 rounded-full bg-foreground text-background text-xs -top-2 -left-2 flex items-center justify-center'>
                                        {cartItems.length}
                                    </span>
                                }
                            </span>
                            <span className='max-md:hidden text-xs'>PKR {handleSubTotal === 0 ? '0.00' : handleSubTotal}</span>
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