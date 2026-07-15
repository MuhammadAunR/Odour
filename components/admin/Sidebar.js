'use client'
import { useSidebar } from '@/app/context/admin/SidebarContext'
import { CirclePlus, CircleUserRound, GalleryVerticalEnd, ListOrdered, LogOut, PanelLeftClose, PanelLeftOpen, ShoppingCart, SquareArrowRightExit, Warehouse } from 'lucide-react'
import { motion } from 'motion/react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Sidebar = ({ session }) => {
    const [activeOption, setactiveOption] = useState('adminDashboard')
    const pathName = usePathname()
    const router = useRouter()
    const { toggleSidebarOpening, sidebarOpen } = useSidebar()

    const mainMenu = [
        { option: 'Dashboard', icon: <Warehouse strokeWidth={1} />, path: '/adminDashboard' },
        { option: 'Add Product', icon: <CirclePlus strokeWidth={1} />, path: '/adminDashboard/addProduct' },
        { option: 'Product List', icon: <ListOrdered strokeWidth={1} />, path: '/adminDashboard/productList' },
    ]
    const adminMenu = [
        { option: 'Admin', icon: <CircleUserRound strokeWidth={1} />, path: '/adminDashboard/admin' },
        { option: 'Signout', icon: <LogOut strokeWidth={1} />, path: '/adminDashboard/signin' },
    ]

    useEffect(() => {
        const handleActivePath = () => {
            setactiveOption(pathName)
        }
        handleActivePath()
    }, [pathName])

    const handleRouting = (path) => {
        if (!path) return
        if (path === '/signin') {
            signOut()
            return
        }
        router.push(path)
    }

    return (
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed bottom-0 w-90 transition-all duration-300 ease-in-out p-7 flex flex-col items-start justify-between bg-surface h-[calc(100vh-60px)] z-50`}>

            <motion.span
                whileTap={{ scale: 0.97 }}
                onClick={toggleSidebarOpening}
                className={`cursor-pointer absolute z-10 left-0 top-3 transition-all duration-500 ease-in-out bg-black rounded-full p-2 flex items-center gap-2 w-10 h-10 hover:w-45 overflow-hidden group/sidebarButton
                ${sidebarOpen ? 'scale-0' : 'translate-x-100'}`}
            >
                <PanelLeftOpen strokeWidth={2} color='white' className="shrink-0" />
                <span className="text-white px-1 whitespace-nowrap opacity-0 scale-0 group-hover/sidebarButton:opacity-100 group-hover/sidebarButton:scale-100 transition-all duration-300">
                    Open Side Panel
                </span>
            </motion.span>

            <div
                className='space-y-5 w-full'>
                <motion.div
                    key={'mainMenu'}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.01 }}
                    viewport={{ once: false }}
                    className='space-y-3 w-full'>
                    <div className='flex items-center justify-between w-full'>
                        <h2 className='font-bold text-lg'>Main Menu</h2>
                        <span onClick={toggleSidebarOpening}>
                            <PanelLeftClose strokeWidth={1} />
                        </span>
                    </div>
                    <ul className='space-y-1'>
                        {mainMenu.map((item) => {
                            return <li
                                key={item.option}
                                onClick={() => handleRouting(item.path)}
                                className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-all ease-linear duration-300 hover:bg-foreground hover:text-white
                                ${activeOption === item.path ? 'bg-foreground text-white' : 'bg-transparent text-black'}`}>
                                <span>{item.icon}</span>
                                <span className='font-semibold'>{item.option}</span>
                            </li>
                        })}
                    </ul>
                </motion.div>
                <motion.div
                    key={'adminMenu'}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: false }}
                    className='space-y-3 w-full'>
                    <h2 className='font-bold text-lg'>Admin</h2>
                    <ul className='space-y-1'>
                        {adminMenu.map((item) => {
                            return <li
                                key={item.option}
                                onClick={() => handleRouting(item.path)}
                                className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-all ease-linear duration-300 hover:bg-foreground hover:text-white
                                ${activeOption === item.path ? 'bg-foreground text-white' : 'bg-transparent text-black'}`}>
                                <span>{item.icon}</span>
                                <span className='font-semibold'>{item.option}</span>
                            </li>
                        })}
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