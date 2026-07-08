'use client'
import { SecondaryButton } from '@/components/UI/Buttons'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const AdminDashBoard = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/authpage')
        }
    }, [status, router])

    if (status === 'loading') {
        return <p>Loading...</p>
    }
    return (
        <>
            <main className='min-h-screen'>
                <p>{session?.user?.name}</p>
                <p>{session?.user?.email}</p>
                <p>{status}</p>
                <span onClick={() => signOut({ callbackUrl: '/authpage' })}>
                    <SecondaryButton text={'Logout'} />
                </span>
            </main>
        </>
    )
}

export default AdminDashBoard