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

        <div className='h-full w-full relative overflow-hidden'>
          <Image
            src={currentSlide.imgSrc}
            alt={currentSlide.alt}
            fill
            sizes='100vw'
            priority
            className='object-cover blur-lg scale-110' />
          <div className='absolute inset-0 bg-black opacity-60'></div>
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
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='flex flex-col items-center gap-5 px-10'>

            <h1 className='max-md:text-5xl max-lg:text-7xl 2xl:text-8xl font-bold font-serif tracking-wider text-background'>
              {currentSlide.title}
            </h1>

            <p className='text-center text-surface'>{currentSlide.desc}</p>

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
