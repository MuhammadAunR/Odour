'use client'

import { policyArticles, policyContent } from '@/constants/PrivacyPolicyConst'
import { Shield } from 'lucide-react'
import { motion } from 'motion/react'
import React, { useEffect, useState } from 'react'

const PrivacyPolicy = () => {

    const [articleInView, setArticleInView] = useState('introduction')

    const navigateToArticle = (e, id) => {
        e.preventDefault()
        const target = document.getElementById(id)
        setArticleInView(id)
        if (target && window.lenis) {
            window.lenis.scrollTo(target, { offset: -300 })
        }
    }

    return (
        <>
            <header className='bg-surface flex flex-col items-center justify-center gap-4 text-center px-5 py-12 container-limit'>
                <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                    className='bg-muted/40 rounded-full p-3'>
                    <Shield size={80} />
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className='text-4xl md:text-5xl font-bold'>Privacy Policy</motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                    className='max-w-xl max-md:text-sm'>We're committed to protecting your privacy and ensuring transparency about how we collect, use, and safeguard your personal information on our educational platform.</motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className='flex items-center gap-3'>
                    <span>Last Updated :</span>
                    <span>August 1, 2026</span>
                </motion.div>
            </header>

            <main className='bg-background flex items-start gap-y-5 gap-x-10 p-5 w-10/12 mx-auto container-limit max-lg:flex-col max-lg:w-full'>
                <motion.aside
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.95, delay: 0.1 }}
                    viewport={{ once: true }}
                    className='border border-muted rounded-lg p-5  h-fit flex flex-col items-start gap-2 w-full lg:w-80 lg:sticky lg:top-30'>
                    {policyArticles.map((article, index) => {
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
                            <div id={article.id}>
                                <h2 className='text-2xl font-semibold mb-3'>{article.title}</h2>
                                {article.paragraphs.map((para, i) => (
                                    <p key={i} className='text-muted mb-2'>
                                        {para}
                                    </p>
                                ))}
                            </div>
                            <div className={`bg-surface w-full h-px ${index < policyContent.length - 1 ? 'block' : 'hidden'}`}></div>
                        </React.Fragment>
                    ))}
                </motion.section>
            </main>
        </>
    )
}

export default PrivacyPolicy