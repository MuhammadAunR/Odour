import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";
import { getServerSession } from "next-auth";
import SidebarContext from "../context/admin/SidebarContext";
import ProductFormContext from "../context/admin/ProductFormContext";
import AdminProductContext from "../context/admin/AdminProductContext";

export default async function AdminLayout({ children }) {
  const session = await getServerSession()
  return (
    <>
      <SidebarContext>
        <ProductFormContext>
          <AdminProductContext>
            <AdminLayoutWrapper session={session}>
              {children}
            </AdminLayoutWrapper>
          </AdminProductContext>
        </ProductFormContext>
      </SidebarContext>
    </>
  )
}