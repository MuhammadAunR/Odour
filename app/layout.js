import { Inter } from "next/font/google";
import "./styles/globals.css";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import AppWrapper from "./context/AppWrapper";
import Cart from "@/components/Cart";

const dubiel = localFont({
  src: "../app/fonts/DubielPlain.woff2",
  variable: "--font-dubiel",
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
  title: "Odour",
  description: "Perfumes",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dubiel.variable} ${topLuxury.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppWrapper>
          <Cart />
          <Navbar />
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}
