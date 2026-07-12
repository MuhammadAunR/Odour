import AdminNavbar from "@/components/admin/AdminNavbar";
import Sidebar from "@/components/admin/Sidebar";
import { getServerSession } from "next-auth";

export default async function AdminLayout({ children }) {
  const session = await getServerSession()
  return (
    <>
      <div>
        <AdminNavbar session={session} />
        <div className="flex gap-1">
          <Sidebar session={session} />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}