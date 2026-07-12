import AdminNavbar from "@/components/admin/AdminNavbar";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminNavbar />
      <div className="flex gap-1">
        <Sidebar />
        {children}
      </div>
    </>
  )
}