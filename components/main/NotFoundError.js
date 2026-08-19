"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { SecondaryButton } from "../UI/Buttons";

export default function ProductNotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-center gap-3"
            >
                <svg
                    width="56"
                    height="56"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="mb-6 text-neutral-400"
                >
                    <path d="M9 2h6v3l1.5 2v13a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2V7L9 5V2z" />
                    <line x1="4" y1="4" x2="20" y2="20" strokeWidth="0.75" />
                </svg>

                <h1 className="text-2xl md:text-3xl font-light tracking-wide text-neutral-800">
                    Product Not Found
                </h1>
                <p className="mt-3 text-sm text-neutral-500 max-w-xs">
                    This fragrance may have been removed or the link is no longer valid.
                </p>

                <Link
                    href="/shop">
                    <SecondaryButton text={'Back to shop'} />
                </Link>
            </motion.div>
        </div>
    );
}