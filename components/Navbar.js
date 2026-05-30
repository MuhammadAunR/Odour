'use client'
import React, { useEffect, useState } from 'react'
import { Heart, ShoppingBag, UserRound } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/app/context/CartContext'
import HamburgerComp from './HamburgerComp'
import { useNavContext } from '@/app/context/NavbarContext'
import { navOptions } from './Assets'
import { usePathname, useRouter } from 'next/navigation'
import { useWishlist } from '@/app/context/WishlistContext'

const Navbar = () => {

    const [fixNavbar, setFixNavbar] = useState(false)
    const [activeNav, setActiveNav] = useState('home')

    const { toggleCart, cartItems, handleSubTotal } = useCart()
    const { toggleNavbar, isOpen } = useNavContext()
    const { wishListItems } = useWishlist()

    const totalCartItem = cartItems.reduce((total, item) => total + item.quantity, 0)
    const pathname = usePathname()
    const router = useRouter()

    const handleAuthPageRouting = () => {
        router.push('/authpage')
    }

    const formatPrice = (amount) => {
        if (amount === 0) return '0.00'
        if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M`
        if (amount >= 100000) return `${(amount / 1000).toFixed(0)}K`
        return amount.toLocaleString('en-PK')
    }

    useEffect(() => {
        const nav = pathname.slice(1) === '' ? 'home' : pathname.slice(1)
        if (pathname.slice(1, 8) === 'product') return setActiveNav('shop')
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
            <nav className='bg-linear-to-b from-background via-background to-transparent relative z-100'>
                <section className='w-10/12 mx-auto flex items-center justify-between py-4 h-20'>

                    <span className='lg:hidden'>
                        <HamburgerComp isOpen={isOpen} onClick={toggleNavbar} />
                    </span>

                    <Link href={'/'} className='max-lg:hidden'>
                        <h1 className='font-display font-bold text-4xl'>Odour</h1>
                    </Link>

                    <Link href={'/'} className='lg:hidden'>
                        <h1 className='font-display font-bold text-4xl'>Odour</h1>
                    </Link>

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
                        <Link href={'/wishlist'} title='Favorite Items' className='relative'>
                            <span className=''>
                                <Heart className={`${wishListItems.length > 0 && 'text-[#993556]'} hover:text-muted transition-all ease-linear`} />
                            </span>
                            {wishListItems.length > 0 &&
                                <span className='absolute w-5 h-5 rounded-full bg-[#993556] text-background text-xs -top-2 -left-2 flex items-center justify-center'>
                                    {wishListItems.length > 9 ? '9+' : wishListItems.length}
                                </span>
                            }
                        </Link>
                        <span className='flex items-center gap-2'>
                            <span onClick={toggleCart} className='hover:text-muted transition-all ease-linear duration-300 cursor-pointer relative'>
                                <ShoppingBag />
                                {cartItems.length > 0 &&
                                    <span className='absolute w-5 h-5 rounded-full bg-foreground text-background text-xs -top-2 -left-2 flex items-center justify-center'>
                                        {cartItems.length > 9 ? '9+' : cartItems.length}
                                    </span>
                                }
                            </span>
                            <span className='max-md:hidden text-xs'>PKR {formatPrice(handleSubTotal)}</span>
                        </span>
                        <span onClick={handleAuthPageRouting} className='hover:text-muted transition-all ease-linear duration-300 cursor-pointer max-lg:hidden'>
                            <UserRound />
                        </span>
                    </div>
                </section>
            </nav>

            <nav className={`
                fixed top-0 left-0 w-full z-50
                bg-background/50 backdrop-blur-2xl transition-transform duration-500 ease-in-out
                ${fixNavbar ? 'translate-y-0 scale-100' : '-translate-y-full scale-0'}
            `}>
                <div className='w-10/12 mx-auto flex items-center justify-between py-4 h-20'>
                    <span className='lg:hidden'>
                        <HamburgerComp isOpen={isOpen} onClick={toggleNavbar} />
                    </span>

                    <Link href={'/'} className='max-lg:hidden'>
                        <h1 className='font-display font-bold text-4xl'>Odour</h1>
                    </Link>

                    <Link href={'/'} className='lg:hidden'>
                        <h1 className='font-display font-bold text-4xl'>Odour</h1>
                    </Link>
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
                        <Link href={'/wishlist'} title='Favorite Items' className='relative'>
                            <span className=''>
                                <Heart className={`${wishListItems.length > 0 && 'text-[#993556]'} transition-all ease-linear`} />
                            </span>
                            {wishListItems.length > 0 &&
                                <span className='absolute w-5 h-5 rounded-full bg-[#993556] text-background text-xs -top-2 -left-2 flex items-center justify-center'>
                                    {wishListItems.length > 9 ? '9+' : wishListItems.length}
                                </span>
                            }
                        </Link>
                        <span className='flex items-center gap-2'>
                            <span onClick={toggleCart} className='hover:text-muted transition-all ease-linear duration-300 cursor-pointer relative'>
                                <ShoppingBag />
                                {cartItems.length > 0 &&
                                    <span className='absolute w-5 h-5 rounded-full bg-foreground text-background text-xs -top-2 -left-2 flex items-center justify-center'>
                                        {cartItems.length > 9 ? '9+' : cartItems.length}
                                    </span>
                                }
                            </span>
                            <span className='max-md:hidden text-xs'>PKR {formatPrice(handleSubTotal)}</span>
                        </span>
                        <span onClick={handleAuthPageRouting} className='hover:text-muted transition-all ease-linear duration-300 cursor-pointer max-lg:hidden'>
                            <UserRound />
                        </span>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar