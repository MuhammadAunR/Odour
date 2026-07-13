'use client'
import React from 'react'
import AdminNavbar from './AdminNavbar'
import { useSidebar } from '@/app/context/admin/SidebarContext'
import Sidebar from './Sidebar'

const AdminLayoutWrapper = ({ children, session }) => {
    const { sidebarOpen } = useSidebar()
    return (
        <>
            <div>
                <AdminNavbar session={session} />
                <div className="flex">
                    <Sidebar session={session} />
                    <main className={`${sidebarOpen ? 'ml-90' : 'ml-0'} mt-15 flex-1 overflow-y-auto`}>
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}

export default AdminLayoutWrapper