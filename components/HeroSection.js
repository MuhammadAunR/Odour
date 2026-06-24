"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PrimaryButton } from "./UI/Buttons";


const HeroSection = () => {

  return (
    <>
      <main className="h-[calc(100%-140px)] max-h-fit absolute top-10 w-full">
        <div className="min-h-full h-fit w-full relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={'/heroSectionBg.webp'}
              alt={'Hero Section Perfume Image'}
              fill
              sizes="100vw"
              priority
              className="object-cover rotate -scale-x-100"
            />
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background"></div>
        </div>

        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.90, ease: 'linear' }}
          viewport={{ once: true }}
          className="absolute top-[60%] -translate-y-1/2 left-5 lg:left-30 space-y-7">

          <h1
            className="uppercase max-w-md font-bold text-5xl md:text-7xl font-display tracking-wider leading-[1.1]"
          >
            Find Your
            Signature
            Scent
          </h1>

          <p className="max-w-md">Discover premium fragrances
            crafted to leave a lasting
            impression wherever you go.
          </p>
          <PrimaryButton text={'Explore collection'} />
        </motion.header>
      </main>
    </>
  );
};

export default HeroSection;
