"use client";
import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { PrimaryButton } from "../UI/Buttons";
import Link from "next/link";


const HeroSection = () => {

  return (
    <>
      <main className="min-h-screen w-full relative overflow-hidden">

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
            className="object-cover -scale-x-100 max-md:object-right"
          />
        </motion.div>

        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background"></div>

        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.90, ease: 'linear' }}
          viewport={{ once: true }}
          className="space-y-5 relative z-10 pt-5 px-5 flex items-start justify-center flex-col min-h-screen max-w-7xl lg:px-0 lg:w-10/12 lg:mx-auto">

          <div className="flex items-center gap-2">
            <span className="uppercase font-bold tracking-widest text-sm">Signature Collection</span>
            <span className="bg-foreground h-px w-15"></span>
          </div>
          <h1
            className="uppercase max-w-lg font-bold text-5xl md:text-7xl text-foreground font-playfair tracking-widest leading-[1.1]"
          >
            Find Your
            Signature
            Scent
          </h1>

          <p className="max-w-md font-semibold tracking-wider">Discover premium fragrances
            crafted to leave a lasting
            impression wherever you go.
          </p>

          <Link href={'/shop'}>
            <PrimaryButton text={'Explore collection'} />
          </Link>

        </motion.header>

      </main>
    </>
  );
};

export default HeroSection;
