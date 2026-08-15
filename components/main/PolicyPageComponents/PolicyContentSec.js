'use client'

import { motion } from 'motion/react'
import React, { useEffect, useState } from 'react'


const PolicyContentSec = ({ policyArticle, policyContent }) => {

  const [articleInView, setArticleInView] = useState(null)

  useEffect(() => {
    const article = policyArticle[0].id
    if (article) {
      setArticleInView(article)
    }
  }, [policyArticle])

  const navigateToArticle = (e, id) => {
    e.preventDefault()
    const target = document.getElementById(id)
    setArticleInView(id)
    if (target && window.lenis) {
      window.lenis.scrollTo(target, { offset: -300 })
    }
  }

  return (
    <main className='bg-background flex items-start gap-y-5 gap-x-10 p-5 w-10/12 mx-auto container-limit max-lg:flex-col max-lg:w-full'>
      <motion.aside
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.95, delay: 0.1 }}
        viewport={{ once: true }}
        className='border border-muted rounded-lg p-5  h-fit flex flex-col items-start gap-2 w-full lg:w-80 lg:sticky lg:top-30'>
        {policyArticle.map((article, index) => {
          return <span
            key={article.id}
            onClick={(e) => navigateToArticle(e, article.id)}
            className={`text-lg cursor-pointer hover:text-foreground transition-all ease-linear select-none
                            ${articleInView === article.id ? 'text-foreground font-semibold' : 'text-muted'}`}>
            {index + 1}. {article.label}
          </span>
        })}
      </motion.aside>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.95, delay: 0.1 }}
        viewport={{ once: true }}
        className='border border-muted rounded-lg w-full p-7 flex flex-col items-start gap-7'>
        {policyContent.map((article, index) => (
          <React.Fragment key={index}>
            <div
              id={article.id} className='relative'>
              <h2 className='text-2xl font-semibold mb-3'>{article.title}</h2>
              {article.paragraphs.map((para, i) => (
                <p key={i} className='text-muted mb-2'>
                  {para}
                </p>

              ))}
              <span className={`absolute -left-3 -top-1 w-0.5 bg-linear-to-b from-muted to-background transition-all ease-linear duration-300
                ${articleInView === article.id ? 'h-full' : 'h-0'}`}></span>
              <span className={`absolute -left-3 -top-1 h-0.5 bg-linear-to-r from-muted to-background transition-all ease-linear duration-300
                ${articleInView === article.id ? 'w-full' : 'w-0'}`}></span>
            </div>
            <div className={`bg-surface w-full h-px ${index < policyContent.length - 1 ? 'block' : 'hidden'}`}></div>
          </React.Fragment>
        ))}
      </motion.section>
    </main>
  )
}

export default PolicyContentSec