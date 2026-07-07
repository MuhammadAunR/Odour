"use client";
import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { SecondaryButton } from "@/components/UI/Buttons";
import ProductGridCard from "@/components/UI/Card";
import { BookHeart } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useProducts } from "../context/ProductContext";

const WishlistPage = () => {
  const { wishListItems } = useWishlist();

  const { products } = useProducts();

  console.log(products)
  const wishListedProducts = products.filter((prod) =>
    wishListItems.includes(prod._id),
  );

  return (
    <main className="lg:w-10/12 lg:mx-auto lg:px-0 px-5 max-w-7xl w-full">
      <header className="flex items-center justify-between gap-5 py-7 border-b border-foreground/30">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-serif tracking-wider font-semibold">
            My Wishlist
          </h1>
          <span className="font-semibold text-muted">
            Total Items: {wishListItems.length}
          </span>
        </div>
      </header>

      {wishListItems.length === 0 && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="flex flex-col gap-5 items-center justify-center my-20"
          >
            <span className="opacity-30">
              <BookHeart size={80} />
            </span>
            <div className="font-semibold text-red-700">
              You Wishlist is empty.
            </div>
            <Link href={"shop"}>
              <SecondaryButton text={"Explore Our Collection"} />
            </Link>
          </motion.div>
        </>
      )}

      <section>
        <div className="flex items-center justify-center gap-3 py-7 flex-wrap">
          {wishListedProducts.map((item) => {
            return <ProductGridCard key={item.name} product={item} />;
          })}
        </div>
      </section>
    </main>
  );
};

export default WishlistPage;
