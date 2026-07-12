'use client'
import { CirclePlus, CircleUserRound, GalleryVerticalEnd, ListOrdered, LogOut, PanelLeftClose, PanelRightClose, ShoppingCart, SquareArrowRightExit, Warehouse } from 'lucide-react'
import { motion } from 'motion/react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Sidebar = ({ session }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const router = useRouter()

    const toggleSidebarOpening = () => {
        setSidebarOpen(prev => !prev)
    }

    async function handleSignout() {
        await signOut()
    }
    return (
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full absolute'} w-100 transition-all duration-300 ease-in-out p-7 flex flex-col items-start justify-between bg-surface h-[calc(100vh-60px)]`}>

            <motion.span
                whileTap={{ scale: 0.97 }}
                onClick={toggleSidebarOpening}
                className={`absolute z-10 transition-all duration-500 ease-in-out bg-surface rounded-full p-2
               ${sidebarOpen ? '-translate-x-100' : 'translate-x-100 '}`}>
                <PanelRightClose strokeWidth={1} />
            </motion.span>

            <div
                className='space-y-7 w-full'>
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.01 }}
                    viewport={{ once: false }}
                    className='space-y-5 w-full'>
                    <div className='flex items-center justify-between w-full'>
                        <h2 className='font-bold text-lg'>Main Menu</h2>
                        <span onClick={toggleSidebarOpening}>
                            <PanelLeftClose strokeWidth={1} />
                        </span>
                    </div>
                    <ul className='space-y-3'>
                        <li className='flex items-center gap-2'>
                            <span><Warehouse strokeWidth={1} /></span>
                            <Link href={'/'} className='font-semibold'>Dashboard</Link>
                        </li>
                        <li className='flex items-center gap-2'>
                            <span><ShoppingCart strokeWidth={1} /></span>
                            <Link href={'/'} className='font-semibold'>Order Management</Link>
                        </li>
                        <li className='flex items-center gap-2'>
                            <span><GalleryVerticalEnd strokeWidth={1} /></span>
                            <Link href={'/'} className='font-semibold'>Categories</Link>
                        </li>
                    </ul>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: false }}
                    className='space-y-5'>
                    <h2 className='font-bold text-lg'>Products</h2>
                    <ul className='space-y-3'>
                        <li className='flex items-center gap-2'>
                            <span><CirclePlus strokeWidth={1} /></span>
                            <Link href={'/'} className='font-semibold'>Add Product</Link>
                        </li>
                        <li className='flex items-center gap-2'>
                            <span><ListOrdered strokeWidth={1} /></span>
                            <Link href={'/'} className='font-semibold'>Product List</Link>
                        </li>

                    </ul>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: false }}
                    className='space-y-5'>
                    <h2 className='font-bold text-lg'>Admin</h2>
                    <ul className='space-y-3'>
                        <li className='flex items-center gap-2'>
                            <span><CircleUserRound strokeWidth={1} /></span>
                            <Link href={'/'} className='font-semibold'>Admin Role</Link>
                        </li>
                        <li onClick={handleSignout} className='flex items-center gap-2 cursor-pointer'>
                            <span><LogOut strokeWidth={1} /></span>
                            <span className='font-semibold'>Signout</span>
                        </li>
                    </ul>
                </motion.div>
            </div>


            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: false }}
                className='space-y-7 w-full'>
                <div className='w-full h-px bg-foreground'></div>
                <div className='flex items-center gap-2'>
                    <div className='relative w-8 h-8 rounded-full overflow-hidden'>
                        <Image src={'https://lh3.googleusercontent.com/a/ACg8ocIPWiTb0eVU3fHvkNOhUevikUwBb3GTAP-kKZdeYfUlxByMxw8=s96-c'} alt='Profile Image' fill className='object-contain' />
                    </div>
                    <div className='flex flex-col items-start'>
                        <span title={session?.user?.name} className='truncate w-50 cursor-pointer text-sm font-semibold'>{session?.user?.name}</span>
                        <span className='text-sm'>{session?.user?.email}</span>
                    </div>
                </div>

                <motion.div
                    onClick={() => router.push('/shop')}
                    whileTap={{ scale: 0.97 }}
                    className='bg-white/40 backdrop-blur-sm shadow-md p-4 rounded-md flex items-center justify-between hover:shadow-xl transition-all ease-linear duration-300 cursor-pointer'>
                    <span className='font-semibold'>
                        Back to Shop
                    </span>
                    <span><SquareArrowRightExit strokeWidth={1} /></span>
                </motion.div>
            </motion.div>
        </aside>
    )
}

export default Sidebar