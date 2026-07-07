"use client";
import React from "react";
import { PrimaryButton, SecondaryButton } from "@/components/UI/Buttons";
import { BookHeart, Trash } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import Image from "next/image";

const CartPage = () => {
    const {
        cartItemInLS,
        handleSubTotal,
        removeCartItem,
        handleItemDec,
        handleItemInc,
        handleCheckout,
    } = useCart();

    const { products } = useProducts();
    const finalPriceFormat = handleSubTotal;

    const cartProducts = products.filter((prod) =>
        cartItemInLS.includes(prod._id),
    );

    console.log('Products from Cart page => ', cartProducts)

    return (
        <main className="lg:w-10/12 lg:mx-auto lg:px-0 px-5 max-w-7xl w-full">

            <header className="flex items-center justify-between gap-5 py-7 border-b border-foreground/30">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-serif tracking-wider font-semibold">
                        My Cart
                    </h1>
                    <span className="font-semibold text-muted">
                        Total Items: {cartProducts.length}
                    </span>
                </div>
            </header>

            {cartItemInLS.length === 0 && (
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
                            You Cart is empty.
                        </div>
                        <Link href={"shop"}>
                            <SecondaryButton text={"Explore Our Collection"} />
                        </Link>
                    </motion.div>
                </>
            )}

            <section>
                <div className="flex flex-col gap-3 py-10 flex-wrap min-h-[70vh]">
                    {cartProducts.map((item, index) => {
                        return <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: 0.1 * index }}
                            viewport={{ once: true }}
                            key={item.id}
                            className="flex justify-between items-center border-b border-b-surface p-5 hover:shadow-md transition-shadow ease-linear duration-300">

                            <div className="flex items-center gap-5">
                                <div className="w-30 h-30 rounded-full relative overflow-hidden">
                                    <Image
                                        src={item.imgSrc}
                                        alt={item.name}
                                        fill
                                        loading="lazy"
                                        sizes="1000px"
                                        className="object-cover group-hover/ProductListCard:scale-105 transition-all ease-linear duration-500"
                                    />
                                </div>
                                <div className="flex flex-col flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-2xl tracking-wider font-serif font-bold">{item.name}</h3>
                                        {/* <span className="text-sm">({item.selectedSize.size})</span> */}
                                    </div>
                                    <span className="text-sm text-gray-400">{item.brand}</span>
                                </div>
                            </div>

                            <span className="text-sm font-semibold whitespace-nowrap gap-2 flex flex-col items-center justify-center">
                                {/* {(() => {
                                    const priceToDisplay =
                                        item.selectedSize.discountedPrice ??
                                        item.selectedSize.price;
                                    return (
                                        <span className="text-accent">
                                            <span className="text-[10px]">PKR</span>{" "}
                                            {(priceToDisplay * item.quantity).toLocaleString()}
                                        </span>
                                    );
                                })()} */}

                                <div className="flex items-center justify-center gap-5">
                                    <motion.span
                                        onClick={() => removeCartItem(item)}
                                        whileTap={{ scale: 0.95 }}
                                        className="cursor-pointer"
                                    >
                                        <Trash size={24} strokeWidth={1} color="red" />
                                    </motion.span>

                                    <div className="flex">
                                        <span
                                            onClick={() => handleItemDec(item)}
                                            className="border px-3 py-1 font-bold hover:bg-surface transition-colors ease-linear cursor-pointer"
                                        >
                                            -
                                        </span>
                                        <span className="border px-3 py-1 font-bold">
                                            {item.quantity}
                                        </span>
                                        <span
                                            onClick={() => handleItemInc(item)}
                                            className="border px-3 py-1 font-bold hover:bg-surface transition-colors ease-linear cursor-pointer"
                                        >
                                            +
                                        </span>
                                    </div>
                                    <div className="h-10 w-px bg-muted"></div>
                                    {/* {(() => {
                                        const priceToDisplay =
                                            item.selectedSize.discountedPrice ??
                                            item.selectedSize.price;
                                        return (
                                            <span className="text-accent">
                                                <span className="text-[10px]">PKR</span>{" "}
                                                {(priceToDisplay * item.quantity).toLocaleString()}
                                            </span>
                                        );
                                    })()} */}
                                </div>
                            </span>
                        </motion.div>
                    })}
                </div>
            </section>

            <div className="py-7 border-t border-foreground/30 w-full">
                <div className="flex flex-col items-end justify-end gap-2">
                    <h1 className="text-4xl font-serif tracking-wider font-semibold">
                        Subtotal
                    </h1>
                    <span className="text-red-500 text-xl font-semibold">
                        <span className="text-xs">PKR</span>{" "}
                        {finalPriceFormat.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted">
                        Taxes, discounts and shipping calculated at checkout.
                    </span>
                    <span onClick={handleCheckout} className="py-5">
                        <PrimaryButton text={'Checkout'} />
                    </span>
                </div>
            </div>
        </main>
    );
};

export default CartPage;
