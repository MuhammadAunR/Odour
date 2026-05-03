'use client'
import { useCart } from '@/app/context/CartContext';
import { useNavContext } from '@/app/context/NavbarContext';
import { motion } from "framer-motion"
import Link from 'next/link';
import React, { useEffect } from 'react'
import { navOptions } from './Assets';

const NavSidebar = () => {

    const { isOpen, toggleNavbar } = useNavContext()

    const MotionLink = motion.create(Link);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.lenis?.stop();
        } else {
            document.body.style.overflow = 'auto';
            window.lenis?.start();
        }

        return () => {
            document.body.style.overflow = 'auto';
            window.lenis?.start();
        };
    }, [isOpen]);

    return (
        <section className={`fixed top-20 z-100 h-screen bg-surface w-full text-white transition-all ease-linear $ ${isOpen ? 'translate-x-0' : '-translate-x-full'} overflow-hidden`}>
            <ul className='flex flex-col items-center justify-center left-[-50%] right-[-50%] translate-y-1/2'>
                {navOptions.map((opt, i) => (
                    <MotionLink
                        initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.1 }}
                        viewport={{ once: false }}
                        href={opt.src}
                        key={i}
                        onClick={toggleNavbar}
                        className='text-xl w-25 h-14 flex items-center justify-center transition-all ease-linear duration-300 relative group/navOption overflow-hidden'>
                        <li className='text-foreground group-hover/navOption:translate-y-10 group-hover/navOption:scale-0 transition-all ease-linear duration-300'>{opt.option}</li>
                        <span className='text-xl absolute bg-foreground text-background w-20 px-2 h-10 flex items-center justify-center rounded-3xl transition-all ease-linear duration-300 translate-y-12 scale-0 group-hover/navOption:scale-100 group-hover/navOption:translate-y-0 cursor-pointer'>{opt.option}</span>
                    </MotionLink>
                ))}
            </ul>

        </section>
    )
}

export default NavSidebar