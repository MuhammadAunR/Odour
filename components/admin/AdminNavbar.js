'use client'
import React from 'react'
import { SecondaryButton } from '../UI/Buttons'
import { motion } from "motion/react"
import { signOut, useSession } from 'next-auth/react'
import { Bell } from 'lucide-react'
import Loader from '../LoaderUI'

const AdminNavbar = () => {
  const { data: session, status } = useSession()
  const name = session?.user?.name
  console.log(session)
  return (
    <>
      {status === 'loading' ?
        <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'><Loader /></span>
        :

        <nav className='flex items-center justify-between bg-foreground py-3 px-5 text-white'>
          <div>
            <h1 className='font-display text-4xl'>Scentra</h1>
          </div>

          <div className='flex items-center justify-center gap-5'>
            <span><Bell /></span>

            <div className='w-px h-10 bg-background/50'></div>
            <div className='flex items-center justify-center gap-3'>
              <span className='border-2 rounded-full w-8 h-8 font-semibold flex items-center justify-center' >{name?.charAt(0)}</span>
              <h2>{name}</h2>
            </div>
          </div>
        </nav >
      }
    </>
  )
}

export default AdminNavbar