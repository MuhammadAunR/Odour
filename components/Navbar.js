"use client";
import React, { useEffect, useState } from "react";
import { Heart, ShoppingBag, UserRound } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import HamburgerComp from "./HamburgerComp";
import { useNavContext } from "@/app/context/NavbarContext";
import { navOptions } from "./Assets";
import { usePathname, useRouter } from "next/navigation";
import { useWishlist } from "@/app/context/WishlistContext";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [fixNavbar, setFixNavbar] = useState(false);
  const [activeNav, setActiveNav] = useState("home");

  const { toggleCart, cartItemInLS, handleSubTotal } = useCart();
  const { toggleNavbar, isOpen } = useNavContext();
  const { wishListProducts } = useWishlist();

  const totalCartItem = cartItemInLS.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession()

  const handleAuthPageRouting = () => {
    if (status === 'authenticated' && session){
      router.push('/adminDashboard')
    } else{
      router.push('/signin')
    }
  };

  const formatPrice = (amount) => {
    if (amount === 0) return "0.00";
    if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 100000) return `${(amount / 1000).toFixed(0)}K`;
    return amount.toLocaleString("en-PK");
  };

  useEffect(() => {
    const nav = pathname.slice(1) === "" ? "home" : pathname.slice(1);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (pathname.slice(1, 8) === "product") return setActiveNav("shop");
    setActiveNav(nav);
  }, [pathname]);

  useEffect(() => {
    const handleNavbarPosition = () => {
      if (window.scrollY > 105) {
        setFixNavbar(true);
      } else {
        setFixNavbar(false);
      }
    };
    window.addEventListener("scroll", handleNavbarPosition);
    return () => window.removeEventListener("scroll", handleNavbarPosition);
  }, []);

  const handleActiveNavOption = (option) => {
    setActiveNav(option);
  };

  return (
    <>
      <nav className={`${isOpen ? 'bg-surface' : 'bg-white'} relative z-100 flex flex-col py-3 gap-2`}>

        <section className="lg:w-10/12 lg:mx-auto lg:px-0 px-5 max-w-7xl w-full flex items-center justify-between">
          <span className="lg:hidden">
            <HamburgerComp isOpen={isOpen} onClick={toggleNavbar} />
          </span>

          <Link href={"/"} className="max-lg:hidden">
            <h1 className="font-display font-bold text-4xl lg:text-5xl">Odour</h1>
          </Link>

          <Link href={"/"} className="lg:hidden">
            <h1 className="font-display font-bold text-4xl lg:text-5xl">Odour</h1>
          </Link>

          <div className="flex items-center gap-5 h-14 px-5">
            <Link
              href={"/wishlist"}
              title="Favorite Items"
              className="relative"
            >
              <span>
                <Heart
                  strokeWidth={1}
                  className={`${wishListProducts.length > 0 && "text-[#993556]"} hover:text-muted transition-all ease-linear`}
                />
              </span>
              {wishListProducts.length > 0 && (
                <span className="absolute w-5 h-5 rounded-full bg-[#993556] text-background text-xs -top-2 -left-2 flex items-center justify-center">
                  {wishListProducts.length > 9 ? "9+" : wishListProducts.length}
                </span>
              )}
            </Link>
            <span className="flex items-center gap-2">
              <span
                title="Cart Items"
                onClick={toggleCart}
                className="hover:text-muted transition-all ease-linear duration-300 cursor-pointer relative"
              >
                <ShoppingBag strokeWidth={1} />
                {cartItemInLS.length > 0 && (
                  <span className="absolute w-5 h-5 rounded-full bg-foreground text-background text-xs -top-2 -left-2 flex items-center justify-center">
                    {totalCartItem > 9 ? "9+" : totalCartItem}
                  </span>
                )}
              </span>
              <span className="max-md:hidden text-xs">
                PKR {formatPrice(handleSubTotal)}
              </span>
            </span>
            <span
              title="Accounts"
              onClick={handleAuthPageRouting}
              className="hover:text-muted transition-all ease-linear duration-300 cursor-pointer max-lg:hidden"
            >
              <UserRound strokeWidth={1} />
            </span>
          </div>
        </section>

        <section className="lg:w-10/12 lg:mx-auto lg:px-0 px-5 max-w-7xl w-full flex items-center justify-between">
          <ul className="flex items-center gap-12 max-lg:hidden">
            {navOptions.map((opt, i) => (
              <Link
                onClick={() => handleActiveNavOption(opt.option.toLowerCase())}
                href={opt.src}
                key={i}
                className="relative group/navOption"
              >
                <li
                  className={`text-xl tracking-wider font-bold uppercase text-foreground/80`}
                >
                  {opt.option}
                </li>
                <span className={`absolute top-0 left-1/2 -translate-x-1/2 bg-foreground/80 h-[1.5px] group-hover/navOption:w-full transition-all ease-linear duration-300 ${activeNav === opt.option.toLowerCase() ? 'w-full' : 'w-0'}`}></span>
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 bg-foreground/80 h-[1.5px] group-hover/navOption:w-full transition-all ease-linear duration-300 ${activeNav === opt.option.toLowerCase() ? 'w-full' : 'w-0'}`}></span>
              </Link>
            ))}
          </ul>
        </section>

      </nav>

      <nav
        className={`
                fixed top-0 left-0 w-full z-50 py-3 space-y-2
                transition-transform duration-500 ease-in-out shadow-[2px_2px_5px_rgba(0,0,0,0.3)]
                ${isOpen ? 'bg-surface' : 'bg-white'}
                ${fixNavbar ? "translate-y-0" : "-translate-y-full"}
            `}
      >
        <section className="lg:w-10/12 lg:mx-auto lg:px-0 px-5 max-w-7xl w-full flex items-center justify-between">
          <span className="lg:hidden">
            <HamburgerComp isOpen={isOpen} onClick={toggleNavbar} />
          </span>

          <Link href={"/"} className="max-lg:hidden">
            <h1 className="font-display font-bold text-4xl lg:text-5xl">Odour</h1>
          </Link>

          <Link href={"/"} className="lg:hidden">
            <h1 className="font-display font-bold text-4xl lg:text-5xl">Odour</h1>
          </Link>

          <div className="flex items-center gap-5 h-14 px-5">
            <Link
              href={"/wishlist"}
              title="Favorite Items"
              className="relative"
            >
              <span>
                <Heart
                  strokeWidth={1}
                  className={`${wishListProducts.length > 0 && "text-[#993556]"} hover:text-muted transition-all ease-linear`}
                />
              </span>
              {wishListProducts.length > 0 && (
                <span className="absolute w-5 h-5 rounded-full bg-[#993556] text-background text-xs -top-2 -left-2 flex items-center justify-center">
                  {wishListProducts.length > 9 ? "9+" : wishListProducts.length}
                </span>
              )}
            </Link>
            <span className="flex items-center gap-2">
              <span
                title="Cart Items"
                onClick={toggleCart}
                className="hover:text-muted transition-all ease-linear duration-300 cursor-pointer relative"
              >
                <ShoppingBag strokeWidth={1} />
                {cartItemInLS.length > 0 && (
                  <span className="absolute w-5 h-5 rounded-full bg-foreground text-background text-xs -top-2 -left-2 flex items-center justify-center">
                    {totalCartItem > 9 ? "9+" : totalCartItem}
                  </span>
                )}
              </span>
              <span className="max-md:hidden text-xs">
                PKR {formatPrice(handleSubTotal)}
              </span>
            </span>
            <span
              title="Accounts"
              onClick={handleAuthPageRouting}
              className="hover:text-muted transition-all ease-linear duration-300 cursor-pointer max-lg:hidden"
            >
              <UserRound strokeWidth={1} />
            </span>
          </div>
        </section>

        <section className="lg:w-10/12 lg:mx-auto lg:px-0 px-5 max-w-7xl w-full flex items-center justify-between">
          <ul className="flex items-center gap-12 max-lg:hidden">
            {navOptions.map((opt, i) => (
              <Link
                onClick={() => handleActiveNavOption(opt.option.toLowerCase())}
                href={opt.src}
                key={i}
                className="relative group/navOption"
              >
                <li
                  className={`text-xl tracking-wider font-bold uppercase text-foreground/80`}
                >
                  {opt.option}
                </li>
                <span className={`absolute top-0 left-1/2 -translate-x-1/2 bg-foreground/80 h-[1.5px] group-hover/navOption:w-full transition-all ease-linear duration-300 ${activeNav === opt.option.toLowerCase() ? 'w-full' : 'w-0'}`}></span>
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 bg-foreground/80 h-[1.5px] group-hover/navOption:w-full transition-all ease-linear duration-300 ${activeNav === opt.option.toLowerCase() ? 'w-full' : 'w-0'}`}></span>
              </Link>
            ))}
          </ul>
        </section>

      </nav>
    </>
  );
};

export default Navbar;
