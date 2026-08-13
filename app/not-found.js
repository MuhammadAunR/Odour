'use client'

import { SecondaryButton } from '@/components/UI/Buttons'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    return (
        <>
            <main className='flex flex-col gap-3 items-center justify-center text-center w-full h-screen bg-radial from-background to-foreground'>
                <p className='font-semibold text-sm'>LOST IN THE SCENT</p>
                <h1 className='text-9xl leading-none font-bold text-red-800'>404</h1>
                <h2>This page has evaporated.</h2>
                <span className='max-w-md'>
                    Like a top note fading too soon, the page you're looking for is no longer here.
                </span>
                <Link href={'/shop'}>
                <SecondaryButton text={'Return to the Collection'} />
                </Link>
            </main>
        </>
    )
}

export default NotFound