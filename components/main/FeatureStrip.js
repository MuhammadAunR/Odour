"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import SectionHeader from "./SectionHeader";
import { ChevronLeft, ChevronRight } from "lucide-react";


const FeatureStrip = () => {

  const [activeIndex, setActiveIndex] = useState(0)

  const featureStrip = [
    {
      title: "Free Shipping",
      desc: "Enjoy free shipping on all orders above PKR 5,000. Fast and reliable delivery to your doorstep.",
    },
    {
      title: "Customer Support",
      desc: "24/7 customer support available. We are always here to help you with any queries.",
    },
    {
      title: "Secure Payment",
      desc: "Your payment is 100% secure. We use the latest encryption technology to protect your data.",
    },
    {
      title: "Easy Returns",
      desc: "Not satisfied? Return your order within 7 days for a full refund. No questions asked.",
    },
  ];

  const scentFamilies = [
    {
      name: "Floral",
      description:
        "A bouquet of petals in bloom — jasmine, rose, and lily layered into something soft, romantic, and unmistakably feminine.",
      image: "/mint-extracted.webp",
      href: "/shop?page=1&limit=12&fragranceFamily=Floral&sortBy=createdAt&sortOrder=desc",
    },
    {
      name: "Citrus",
      description:
        "Bright, zesty, alive. Notes of bergamot, blood orange, and mandarin peel spark the senses awake.",
      image: "/citrus-extracted.webp",
      href: "/shop?page=1&limit=12&fragranceFamily=Citrus&sortBy=createdAt&sortOrder=desc",
    },
    {
      name: "Woody",
      description:
        "Warm sandalwood, smoky vetiver, and grounded amber blend into a scent that lingers like dusk.",
      image: "/wooden-extracted.webp",
      href: "/shop?page=1&limit=12&fragranceFamily=Woody&sortBy=createdAt&sortOrder=desc",
    },
  ];

  const handleNextCarousal = () => {
    if (activeIndex === scentFamilies.length - 1) {
      setActiveIndex(0)
      return
    }
    setActiveIndex(prev => prev + 1)
  }
  const handlePrevCarousal = () => {
    if (activeIndex === 0) {
      setActiveIndex(scentFamilies.length - 1)
      return
    }
    setActiveIndex(prev => prev - 1)
  }

  const currentSlide = scentFamilies.find((_, i) => i === activeIndex)

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextCarousal()
    }, 3000);
    return () => clearInterval(timer)
  }, [activeIndex])


  return (
    <>
      <main className=" space-y-7">

        <section className="flex items-center justify-between flex-wrap gap-2 w-full px-5 max-w-7xl lg:px-0 lg:w-10/12 lg:mx-auto pb-5">
          {featureStrip.map((feature, i) => {
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.1 }}
                viewport={{ once: true }}
                key={i}
                className="flex flex-col items-start gap-5 md:w-75 h-60 bg-surface/30 border-2 border-muted/50 
                 px-5 py-10 relative hover:-translate-y-1 transition-transform ease-linear duration-300"
              >
                <span className="absolute -top-2 right-1 font-bold leading-none text-6xl text-surface">0{i + 1}</span>
                <h3 className="text-xl font-semibold font-playfair tracking-wider">{feature.title}</h3>
                <div className="bg-muted h-px w-1/5"></div>
                <p className="text-muted text-left">{feature.desc}</p>
              </motion.div>
            );
          })}
        </section>

        <SectionHeader
          headerContent={{
            subHeading: "Discover Your Signature",
            mainHeading: "Scent Families",
          }}
        />


        <section className="space-y-7">
          <motion.div key={currentSlide.name} className="grid grid-cols-1 lg:grid-cols-2 gap-2 bg-linear-to-r from-surface to-background">
            <motion.div className="flex flex-col items-center justify-center gap-5 max-lg:py-10 min-h-50">
              <motion.h3
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.80, delay: 0.01 }}
                className="font-playfair font-bold text-2xl md:text-5xl tracking-widest uppercase">
                {currentSlide.name}
              </motion.h3>
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.80, delay: 0.03 }}
                className="max-lg:px-5 lg:max-w-lg text-center text-muted tracking-wider">
                {currentSlide.description}
              </motion.span>
              <motion.a
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.80, delay: 0.05 }}
                href={currentSlide.href}
                className="max-lg:px-5 lg:max-w-lg text-center text-xl text-muted tracking-wider bg-background border border-foreground px-5 py-1 uppercase font-semibold hover:tracking-widest transition-all ease-linear duration-300">
                Shop {currentSlide.name}
              </motion.a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.70, delay: 0.01 }}
              className="relative w-full h-80 lg:h-100">
              <Image
                src={currentSlide.image}
                alt={currentSlide.name}
                fill
                sizes="100%"
                className="object-cover" />
            </motion.div>
          </motion.div>
          <div className="flex items-center justify-center gap-7">
            <div
              onClick={handlePrevCarousal}
              className="bg-surface/50 border border-surface/70 p-2 rounded-full hover:border-muted transition-all ease-initial duration-300 group/chevron">
              <ChevronLeft className="group-hover/chevron:-translate-x-0.5 transition-transform ease-linear duration-300" />
            </div>
            <div
              onClick={handleNextCarousal}
              className="bg-surface/50 border border-surface/70 p-2 rounded-full hover:border-muted transition-all ease-initial duration-300 group/chevron">
              <ChevronRight className="group-hover/chevron:translate-x-0.5 transition-transform ease-linear duration-300" />
            </div>
          </div>
        </section>

      </main>
    </>
  );
};

export default FeatureStrip;
