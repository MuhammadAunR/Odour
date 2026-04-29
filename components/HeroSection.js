'use client'
import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { motion } from "framer-motion"
import { heroSectionSlideData } from './Assets'

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

  return (
    <>
      <main className='bg-surface group'>

        <section className='h-screen w-10/12 mx-auto flex items-center justify-between'>

          <section className='flex items-center gap-5 relative'>

            <motion.div
              whileTap={{ scale: 0.95 }}
              onClick={handleBackwardCarousel}
              className='opacity-0 group-hover:opacity-100 absolute -left-25 bg-background p-3 rounded-full border-2 border-foreground/20 hover:bg-foreground hover:border-surface hover:text-background transition-all ease-linear duration-300 cursor-pointer'>
              <ChevronLeft />
            </motion.div>

            <motion.div
              key={imgCount}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className='w-10/12 flex flex-col items-start gap-5'>

              <h1 className='text-8xl font-bold font-serif tracking-wider'>{currentSlide.title}</h1>

              <p className=''>{currentSlide.desc}</p>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className='text-lg border-2 border-foreground px-10 py-3 uppercase hover:bg-foreground hover:border-surface hover:text-background transition-all ease-linear duration-300 cursor-pointer'>
                Shop Now
              </motion.button>

            </motion.div>

          </section>

          <section className='w-1/2 flex items-center gap-5 relative'>

            <motion.div
              key={imgCount}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className='relative w-100 h-100 rounded-full overflow-hidden'>
              <Image
                src={currentSlide.imgSrc}
                alt={currentSlide.alt}
                fill
                sizes='3000px'
                loading='lazy'
                className='object-cover'
              />
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.95 }}
              onClick={handleForwardCarousel}
              className='opacity-0 group-hover:opacity-100 absolute -right-25 bg-background p-3 rounded-full border-2 border-foreground/20 hover:bg-foreground hover:border-surface hover:text-background transition-all ease-linear duration-300 cursor-pointer'>
              <ChevronRight />
            </motion.div>
          </section>
        </section>
      </main>
    </>
  )
}

export default HeroSection
