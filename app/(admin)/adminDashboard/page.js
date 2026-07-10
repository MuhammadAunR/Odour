import AdminNavbar from '@/components/admin/AdminNavbar'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


export default async function AdminDashboard() {

    const session = await getServerSession(authOptions)

    const cookieStore = await cookies()
    cookieStore.delete('authIntent')

    if (!session) {
        redirect('/signin')
    }

    return (
        <>
            <AdminNavbar />
        </>
    )
}