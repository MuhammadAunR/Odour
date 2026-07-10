import AdminNavbar from '@/components/admin/AdminNavbar'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { getSession, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'


export default async function AdminDashboard() {

    const session = await getServerSession(authOptions)
    const ses = await getSession()
    console.log(ses)

    if (!session) {
        redirect('/signin')
    }

    return (
        <>
            <AdminNavbar />
        </>
    )
}