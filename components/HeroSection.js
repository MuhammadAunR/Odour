'use client'
import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react'
import Image from 'next/image'
import { motion } from "framer-motion"
import { heroSectionSlideData } from './Assets'
import { Button1 } from './ButtonUI'

const HeroSection = () => {

  const [imgCount, setImgCount] = useState(0)
  const [yScroll, setYScroll] = useState(false)

  const currentSlide = heroSectionSlideData[imgCount]

  useEffect(() => {
    const handleYScroll = () => {
      if (window.scrollY > 200) {
        setYScroll(true)
      } else {
        setYScroll(false)
      }
    }
    window.addEventListener('scroll', handleYScroll)
    return () => window.removeEventListener('scroll', handleYScroll)
  }, [])

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

  const handleScrollToTop = () => {
    window.lenis?.scrollTo(0, { immediate: true })
    window.scrollTo(0, 0)
  }

  const GoToWhatsapp = () => {

  }

  return (
    <>
      <main className='bg-surface group relative'>

        {yScroll && <span
          onClick={handleScrollToTop}
          className='fixed bottom-7 right-7 z-90 bg-muted p-2 text-background'>
          <ChevronUp />
        </span>
        }

        <a href="https://wa.me/923286536520" target="_blank" className='fixed left-7 bottom-7 z-90 bg-green-600 text-background p-2 rounded-full'>
          <svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' width="32" height="32" viewBox="0 0 32 32">
            <path d="M25.873,6.069c-2.619-2.623-6.103-4.067-9.814-4.069C8.411,2,2.186,8.224,2.184,15.874c-.001,2.446,.638,4.833,1.852,6.936l-1.969,7.19,7.355-1.929c2.026,1.106,4.308,1.688,6.63,1.689h.006c7.647,0,13.872-6.224,13.874-13.874,.001-3.708-1.44-7.193-4.06-9.815h0Zm-9.814,21.347h-.005c-2.069,0-4.099-.557-5.87-1.607l-.421-.25-4.365,1.145,1.165-4.256-.274-.436c-1.154-1.836-1.764-3.958-1.763-6.137,.003-6.358,5.176-11.531,11.537-11.531,3.08,.001,5.975,1.202,8.153,3.382,2.177,2.179,3.376,5.077,3.374,8.158-.003,6.359-5.176,11.532-11.532,11.532h0Zm6.325-8.636c-.347-.174-2.051-1.012-2.369-1.128-.318-.116-.549-.174-.78,.174-.231,.347-.895,1.128-1.098,1.359-.202,.232-.405,.26-.751,.086-.347-.174-1.464-.54-2.788-1.72-1.03-.919-1.726-2.054-1.929-2.402-.202-.347-.021-.535,.152-.707,.156-.156,.347-.405,.52-.607,.174-.202,.231-.347,.347-.578,.116-.232,.058-.434-.029-.607-.087-.174-.78-1.88-1.069-2.574-.281-.676-.567-.584-.78-.595-.202-.01-.433-.012-.665-.012s-.607,.086-.925,.434c-.318,.347-1.213,1.186-1.213,2.892s1.242,3.355,1.416,3.587c.174,.232,2.445,3.733,5.922,5.235,.827,.357,1.473,.571,1.977,.73,.83,.264,1.586,.227,2.183,.138,.666-.1,2.051-.839,2.34-1.649,.289-.81,.289-1.504,.202-1.649s-.318-.232-.665-.405h0Z" fillRule="evenodd"></path>
          </svg>
        </a>

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

              <span>
                <Button1 text={'Shop Now'} />
              </span>

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
