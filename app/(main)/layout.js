import Cart from "@/components/main/Cart";
import FooterSection from "@/components/main/FooterSection";
import Navbar from "@/components/main/Navbar";
import NavSidebar from "@/components/main/NavSidebar";
import ScrollToTopBtn from "@/components/main/ScrollToTopBtn";
import WhatsappButton from "@/components/main/WhatsappButton";
import AppWrapper from "../context/AppWrapper";

export default function MainLayout({ children }) {
    return (
        <>
            <AppWrapper>
                <Navbar />
                <NavSidebar />
                <Cart />
                <ScrollToTopBtn />
                {children}
                <FooterSection />
                <WhatsappButton />
            </AppWrapper>
        </>
    )
}