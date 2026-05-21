'use client'
import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Diamond } from 'lucide-react'
import Image from 'next/image'
import { motion } from "framer-motion"
import { heroSectionSlideData } from './Assets'
import { Button1 } from './ButtonUI'
import Link from 'next/link'

const HeroSection = () => {

  const [imgCount, setImgCount] = useState(0)

  const currentSlide = heroSectionSlideData[imgCount]

  const handleForwardCarousel = () => {
    if (imgCount < heroSectionSlideData.length - 1) {
      const newCount = imgCount + 1
      setImgCount(newCount)
    } else {
      setImgCount(0)
    }
  }

  const handleBackwardCarousel = () => {
    if (imgCount > 0) {
      const newCount = imgCount - 1
      setImgCount(newCount)
    } else {
      setImgCount(4)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setImgCount(prev => (prev + 1) % heroSectionSlideData.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])
  return (
    <>
      <main className='bg-surface group relative'>

        <div className='flex items-center justify-center gap-2 absolute bottom-0 left-1/2 -translate-x-1/2 py-5'>
          {heroSectionSlideData.map((slide, index) => {
            return <span key={index} className={`${index === imgCount ? 'text-muted' : 'text-foreground transform rotate-45'} transition-all ease-linear duration-500`}>
              <Diamond strokeWidth={3} size={14} />
            </span>
          })}
        </div>

        <section className='min-h-screen py-10 h-fit w-10/12 mx-auto flex items-center justify-between max-lg:flex-col max-lg:justify-center gap-10'>

          <section className='flex items-center gap-5 relative'>

            <motion.div
              whileTap={{ scale: 0.95 }}
              onClick={handleBackwardCarousel}
              className='opacity-0 group-hover:opacity-100 absolute -left-25 bg-background p-3 rounded-full border-2 border-foreground/20 hover:bg-foreground hover:border-surface hover:text-background transition-all ease-linear duration-300 cursor-pointer max-md:hidden'>
              <ChevronLeft />
            </motion.div>

            <motion.div
              key={imgCount}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className='lg:w-10/12 flex flex-col items-start gap-5'>

              <h1 className='max-md:text-5xl max-lg:text-7xl 2xl:text-8xl font-bold font-serif tracking-wider'>
                {currentSlide.title}
              </h1>

              <p className=''>{currentSlide.desc}</p>

              <Link href={'/shop'}>
                <Button1 text={'Shop Now'} />
              </Link>

            </motion.div>

          </section>

          <section className='w-1/2 flex items-center gap-5 relative'>
            <motion.div
              key={imgCount}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className='relative w-full max-w-md aspect-4/5 self-center'
            >
              <div className='absolute top-4 left-4 w-full h-full bg-surface border border-muted/30' />
              <div className='absolute inset-0 bottom-4 right-4'>
                <Image
                  src={currentSlide.imgSrc}
                  alt={currentSlide.alt}
                  fill
                  sizes='(max-width: 768px) 90vw, 450px'
                  priority
                  className='object-cover'
                />
              </div>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.95 }}
              onClick={handleForwardCarousel}
              className='opacity-0 group-hover:opacity-100 absolute -right-25 bg-background p-3 rounded-full border-2 border-foreground/20 hover:bg-foreground hover:border-surface hover:text-background transition-all ease-linear duration-300 cursor-pointer max-md:hidden'>
              <ChevronRight />
            </motion.div>

          </section>
        </section>
      </main>
    </>
  )
}

export default HeroSection
