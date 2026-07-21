import Header from '@/components/admin/dashboard-components/Header'
import KPISection from '@/components/admin/dashboard-components/KPISection'
import MainContentSection from '@/components/admin/MainContentSection'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'


export default async function AdminDashboard() {

    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/signin')
    }

    return (
        <>
            <Header />
            <KPISection />
            <MainContentSection />
        </>
    )
}