'use client'
import { CirclePlus, CircleUserRound, GalleryVerticalEnd, ListOrdered, LogOut, PanelLeftClose, ShoppingCart, SquareArrowRightExit, Warehouse } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
    const { data: session } = useSession()
    return (
        <aside className='w-100 p-5 flex flex-col items-start justify-between bg-surface h-[calc(100vh-60px)]'>

            <div className='space-y-7 w-full'>
                <div className='space-y-5 w-full'>
                    <div className='flex items-center justify-between w-full'>
                        <h2 className='font-bold text-lg'>Main Menu</h2>
                        <span>
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
                </div>
                <div className='space-y-5'>
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
                </div>
                <div className='space-y-5'>
                    <h2 className='font-bold text-lg'>Admin</h2>
                    <ul className='space-y-3'>
                        <li className='flex items-center gap-2'>
                            <span><CircleUserRound strokeWidth={1} /></span>
                            <Link href={'/'} className='font-semibold'>Admin Role</Link>
                        </li>
                        <li className='flex items-center gap-2'>
                            <span><LogOut strokeWidth={1} /></span>
                            <Link href={'/'} className='font-semibold'>Signout</Link>
                        </li>
                    </ul>
                </div>
            </div>


            <div className='space-y-7'>
                <div className='w-full h-px bg-foreground'></div>
                <div className='flex items-center gap-2'>
                    {/* <div className='relative w-8 h-8 rounded-full overflow-hidden'>
                    <Image src={session?.user?.image} alt='Profile Image' fill className='object-contain' />
                </div> */}
                    <span className='border-2 rounded-full w-8 h-8 font-semibold flex items-center justify-center' >{session?.user?.name?.charAt(0)}</span>
                    <div className='flex flex-col items-start'>
                        <span title={session?.user?.name} className='truncate w-50 cursor-pointer text-sm font-semibold'>{session?.user?.name}</span>
                        <span className='text-sm'>{session?.user?.email}</span>
                    </div>
                </div>

                <div className='bg-white/40 backdrop-blur-sm shadow-md p-4 rounded-md flex items-center justify-between hover:shadow-lg transition-all ease-linear duration-300 cursor-pointer'>
                    <span className='font-semibold'>
                        Back to Shop
                    </span>
                    <span><SquareArrowRightExit strokeWidth={1} /></span>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar