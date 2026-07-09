'use client'
import React from 'react'
import { SecondaryButton } from '../UI/Buttons'
import { signOut } from 'next-auth/react'

const AdminNavbar = () => {
  return (
    <main>
      <span onClick={() => signOut({ callbackUrl: '/authpage' })} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <SecondaryButton text={'Logout'} />
      </span>
    </main>
  )
}

export default AdminNavbar