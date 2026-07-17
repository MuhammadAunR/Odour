'use client'
import React from 'react'
import { Bell } from 'lucide-react'
import Image from 'next/image'
const AdminNavbar = ({ session }) => {


  return (
    <>
      <nav className='fixed z-100 w-full shadow-2xl flex items-center justify-between bg-foreground py-3 h-15 px-5 text-white'>
        <div>
          <h1 className='font-display text-4xl'>ODOUR</h1>
        </div>

        <div className='flex items-center justify-center gap-5'>
          <div className='flex items-center justify-center gap-3'>
            <div className='relative w-8 h-8 rounded-full overflow-hidden'>
              <Image
                src={'https://lh3.googleusercontent.com/a/ACg8ocIPWiTb0eVU3fHvkNOhUevikUwBb3GTAP-kKZdeYfUlxByMxw8=s96-c'} alt='Profile Image'
                fill
                sizes='240px'
                className='object-contain' />
            </div>
            <h2>{session?.user?.name}</h2>
          </div>
        </div>
      </nav >
    </>
  )
}

export default AdminNavbar