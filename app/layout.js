import { Inter } from "next/font/google";
import "./styles/globals.css";
import localFont from "next/font/local";
import AppWrapper from "./context/AppWrapper";
import LenisWrapper from "@/components/LenisWrapper";
import ScrollToTop from "@/components/ScrollToTop";
import ReactToastContainer from "@/components/ReactToastContainer";
import AuthProviders from "./providers";

const raleway = localFont({
  src: "../app/fonts/Raleway.woff2",
  variable: "--font-raleway",
  display: "swap",
});

const topLuxury = localFont({
  src: "../app/fonts/TOPLUXURYRegular.woff2",
  variable: "--font-top-luxury",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata = {
  title: "ODOUR",
  description: "Perfumes",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${raleway.variable} ${topLuxury.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ScrollToTop />
        <ReactToastContainer>
          <LenisWrapper>
            <AppWrapper>
              <AuthProviders>
                {children}
              </AuthProviders>
            </AppWrapper>
          </LenisWrapper>
        </ReactToastContainer>
      </body>
    </html>
  );
}
