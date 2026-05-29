'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from "framer-motion"
import { heroSectionSlideData } from './Assets'
import { PrimaryButton } from './UI/Buttons'
import Link from 'next/link'

const HeroSection = () => {

  const [imgCount, setImgCount] = useState(0)

  const currentSlide = heroSectionSlideData[imgCount]

  useEffect(() => {
    const interval = setInterval(() => {
      setImgCount(prev => (prev + 1) % heroSectionSlideData.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])
  return (
    <>
      <main className='h-[calc(100vh-80px)] relative'>

        <div
          className='h-full w-full relative overflow-hidden'>
          <motion.div
            key={imgCount}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className='absolute inset-0'
          >
            <Image
              src={currentSlide.imgSrc}
              alt={currentSlide.alt}
              fill
              sizes='100vw'
              priority
              className='object-cover blur-sm scale-110' />
          </motion.div>
          <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.75)_100%)]'></div>
          <span className='absolute bottom-7 left-1/2 -translate-x-1/2 flex'>
            {heroSectionSlideData.map((slide, index) => (
              <span key={index} className=''>
                <div className='h-3 w-7 border-2 border-background rounded-xs mx-1' />
              </span>
            ))}

            <span
              className='absolute top-0 left-1 h-full w-7 bg-background rounded-xs transition-transform duration-500 ease-in-out'
              style={{ transform: `translateX(${imgCount * (28 + 8)}px)` }} />

          </span>
        </div>

        <header className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <motion.div
            key={imgCount}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='flex flex-col items-center gap-5 bg-foreground/10 backdrop-blur-lg p-15'>

            <span className={`text-xs tracking-[0.4em] uppercase ${currentSlide.theme === 'dark' ? 'text-background' : 'text-foreground'}`}>
              — Eau de Parfum —
            </span>
            <h1 className={`max-md:text-5xl max-lg:text-7xl 2xl:text-8xl font-bold font-serif tracking-widest 
              ${currentSlide.theme === 'dark' ? 'text-background' : 'text-foreground'}`}>
              {currentSlide.title}
            </h1>

            <p className={`text-center ${currentSlide.theme === 'dark' ? 'text-background' : 'text-foreground'}`}>
              {currentSlide.desc}
            </p>

            <Link href={'/shop'}>
              <PrimaryButton text={'Shop Now'} />
            </Link>

          </motion.div>
        </header>
      </main>
    </>
  )
}

export default HeroSection
