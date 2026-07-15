import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";
import { getServerSession } from "next-auth";
import SidebarContext from "../context/admin/SidebarContext";
import ProductFormContext from "../context/admin/ProductFormContext";

export default async function AdminLayout({ children }) {
  const session = await getServerSession()
  return (
    <>
      <SidebarContext>
        <ProductFormContext>
          <AdminLayoutWrapper session={session}>
            {children}
          </AdminLayoutWrapper>
        </ProductFormContext>
      </SidebarContext>
    </>
  )
}