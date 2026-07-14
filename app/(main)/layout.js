import Cart from "@/components/Cart";
import Filter from "@/components/Filter";
import FooterSection from "@/components/FooterSection";
import Navbar from "@/components/Navbar";
import NavSidebar from "@/components/NavSidebar";
import ScrollToTopBtn from "@/components/ScrollToTopBtn";
import WhatsappButton from "@/components/WhatsappButton";

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