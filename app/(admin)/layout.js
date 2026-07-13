import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";
import { getServerSession } from "next-auth";

export default async function AdminLayout({ children }) {
  const session = await getServerSession()
  return (
    <>
      <AdminLayoutWrapper session={session}>
        {children}
      </AdminLayoutWrapper>
    </>
  )
}