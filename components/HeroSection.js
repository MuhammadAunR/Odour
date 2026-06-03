"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { heroSectionSlideData } from "./Assets";
import { PrimaryButton } from "./UI/Buttons";
import Link from "next/link";

const HeroSection = () => {
  const [imgCount, setImgCount] = useState(0);

  const currentSlide = heroSectionSlideData[imgCount];

  useEffect(() => {
    const interval = setInterval(() => {
      setImgCount((prev) => (prev + 1) % heroSectionSlideData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <main className="h-screen absolute top-0 w-full">
        <div className="min-h-full h-fit w-full relative overflow-hidden">
          <motion.div
            key={imgCount}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={currentSlide.imgSrc}
              alt={currentSlide.alt}
              fill
              sizes="100vw"
              priority
              className="object-cover max-md:blur-md max-md:scale-110"
            />
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background"></div>
          <span className="absolute bottom-7 mt-10 left-1/2 -translate-x-1/2 flex">
            {heroSectionSlideData.map((slide, index) => (
              <span key={index} className="">
                <div className="h-3 w-7 border-2 border-foreground rounded-xs mx-1" />
              </span>
            ))}

            <span
              className="absolute top-0 left-1 h-full w-7 bg-foreground rounded-xs transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${imgCount * (28 + 8)}px)` }}
            />
          </span>
        </div>

        <header className="absolute bottom-24 left-0 right-0 max-sm:top-1/2 max-sm:-translate-y-1/2">
          <div className="max-w-7xl mx-auto px-5 lg:px-0">
            <motion.div
              key={imgCount}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col items-start gap-5 max-w-lg"
            >
              <span
                className={`text-xs tracking-[0.4em] uppercase 
          ${currentSlide.theme === "dark" ? "text-background" : "text-foreground"}`}
                style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
              >
                — Eau de Parfum —
              </span>

              <h1
                className={`text-3xl lg:text-5xl font-bold font-serif tracking-widest
          ${currentSlide.theme === "dark" ? "text-background" : "text-foreground"}`}
                style={{
                  textShadow:
                    "0 4px 20px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.8)",
                }}
              >
                {currentSlide.title}
              </h1>

              <p
                className={`text-sm max-w-sm
          ${currentSlide.theme === "dark" ? "text-background" : "text-foreground"}`}
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}
              >
                {currentSlide.desc}
              </p>

              <Link href="/shop">
                <PrimaryButton text="Shop Now" textSize="sm" />
              </Link>
            </motion.div>
          </div>
        </header>
      </main>
    </>
  );
};

export default HeroSection;
