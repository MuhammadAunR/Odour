import Cart from "@/components/main/Cart";
import Filter from "@/components/main/Filter";
import FooterSection from "@/components/main/FooterSection";
import Navbar from "@/components/main/Navbar";
import NavSidebar from "@/components/main/NavSidebar";
import ScrollToTopBtn from "@/components/main/ScrollToTopBtn";
import WhatsappButton from "@/components/main/WhatsappButton";

export default function MainLayout({ children }) {
    return (
        <>
            <Navbar />
            <NavSidebar />
            <Cart />
            <Filter />
            <ScrollToTopBtn />
            {children}
            <FooterSection />
            <WhatsappButton />
        </>
    )
}