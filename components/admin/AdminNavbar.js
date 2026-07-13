'use client'
import React from 'react'
import { Bell } from 'lucide-react'
import Image from 'next/image'
const AdminNavbar = ({ session }) => {


  return (
    <>
      <nav className='fixed w-full shadow-2xl flex items-center justify-between bg-foreground py-3 h-15 px-5 text-white'>
        <div>
          <h1 className='font-display text-4xl'>Scentra</h1>
        </div>

        <div className='flex items-center justify-center gap-5'>
          <span><Bell /></span>

          <div className='w-px h-10 bg-background/50'></div>
          <div className='flex items-center justify-center gap-3'>
            <div className='relative w-8 h-8 rounded-full overflow-hidden'>
              <Image src={'https://lh3.googleusercontent.com/a/ACg8ocIPWiTb0eVU3fHvkNOhUevikUwBb3GTAP-kKZdeYfUlxByMxw8=s96-c'} alt='Profile Image' fill className='object-contain' />
            </div>
            <h2>{session?.user?.name}</h2>
          </div>
        </div>
      </nav >
    </>
  )
}

export default AdminNavbar