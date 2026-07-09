import AdminNavbar from '@/components/admin/AdminNavbar'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'


export default async function AdminDashboard() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/authpage')
    }

    return (
        <>
            <AdminNavbar />
        </>
    )
}