'use client'
import SectionHeader from '@/components/SectionHeader'
import { Mail, MapPin } from 'lucide-react'
import { motion } from "framer-motion"
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    const handleFormData = (e) => {
        const { name, value } = e.target
        setFormData(prev => (
            { ...prev, [name]: value }
        ))
    }

    const handleSubmit = () => {

        for (const [key, val] of Object.entries(formData)) {
            if (!val.trim()) {
                toast.warning(`${key.charAt(0).toLocaleUpperCase() + key.slice(1)} is required.`)
                return
            }
        }
        const { name, email, subject, message } = formData
        const mailtoLink = `mailto:maunrasheed.dev@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`
        toast.success('Message Sent.')
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
        })
        window.open(mailtoLink)
    }
    return (
        <main className='lg:w-10/12 lg:mx-auto lg:px-0 px-5 w-full max-w-7xl'>

            <SectionHeader headerContent={{ subHeading: 'Get In Touch', mainHeading: 'Contact Us' }} />

            <header className='flex items-center justify-center pb-10 gap-10 max-lg:flex-col'>

                <motion.section
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className='lg:w-1/2 w-full'>
                    <div className='flex flex-col gap-3 mb-8'>
                        <h3 className='text-4xl tracking-wider font-serif font-bold text-foreground'>Let us Talk</h3>
                        <p className='text-muted leading-relaxed'>
                            Have a question about a scent, an order, or just want to say hello?
                            We would love to hear from you.
                        </p>
                    </div>
                    <div className='w-full h-[0.5px] bg-muted opacity-40 mb-8' />
                    <div className='flex flex-col gap-7'>
                        <div className='flex items-center gap-3'>
                            <span><MapPin /></span>
                            <span className='font-semibold text-muted'>Faisalabad, Punjab, Pakistan</span>
                        </div>
                        <div className='flex items-center gap-3'>
                            <span><Mail /></span>
                            <Link
                                href={'mailto:maunrasheed.dev@gmail.com'}
                                className='font-semibold text-muted hover:underline underline-offset-2'>
                                maunrasheed.dev@gmail.com
                            </Link>
                        </div>
                        <div className='flex items-center gap-3'>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' width="26" height="26" viewBox="0 0 32 32">
                                    <path d="M25.873,6.069c-2.619-2.623-6.103-4.067-9.814-4.069C8.411,2,2.186,8.224,2.184,15.874c-.001,2.446,.638,4.833,1.852,6.936l-1.969,7.19,7.355-1.929c2.026,1.106,4.308,1.688,6.63,1.689h.006c7.647,0,13.872-6.224,13.874-13.874,.001-3.708-1.44-7.193-4.06-9.815h0Zm-9.814,21.347h-.005c-2.069,0-4.099-.557-5.87-1.607l-.421-.25-4.365,1.145,1.165-4.256-.274-.436c-1.154-1.836-1.764-3.958-1.763-6.137,.003-6.358,5.176-11.531,11.537-11.531,3.08,.001,5.975,1.202,8.153,3.382,2.177,2.179,3.376,5.077,3.374,8.158-.003,6.359-5.176,11.532-11.532,11.532h0Zm6.325-8.636c-.347-.174-2.051-1.012-2.369-1.128-.318-.116-.549-.174-.78,.174-.231,.347-.895,1.128-1.098,1.359-.202,.232-.405,.26-.751,.086-.347-.174-1.464-.54-2.788-1.72-1.03-.919-1.726-2.054-1.929-2.402-.202-.347-.021-.535,.152-.707,.156-.156,.347-.405,.52-.607,.174-.202,.231-.347,.347-.578,.116-.232,.058-.434-.029-.607-.087-.174-.78-1.88-1.069-2.574-.281-.676-.567-.584-.78-.595-.202-.01-.433-.012-.665-.012s-.607,.086-.925,.434c-.318,.347-1.213,1.186-1.213,2.892s1.242,3.355,1.416,3.587c.174,.232,2.445,3.733,5.922,5.235,.827,.357,1.473,.571,1.977,.73,.83,.264,1.586,.227,2.183,.138,.666-.1,2.051-.839,2.34-1.649,.289-.81,.289-1.504,.202-1.649s-.318-.232-.665-.405h0Z" fillRule="evenodd"></path>
                                </svg>
                            </span>
                            <Link
                                href={'https://wa.me/923286536520'}
                                target="_blank"
                                className='font-semibold text-muted cursor-pointer hover:underline underline-offset-2'>
                                +92 328-6536520
                            </Link>
                        </div>
                    </div>
                    <div className='w-full h-[0.5px] bg-muted opacity-40 my-8' />
                    <p className='text-muted/60 mt-8 tracking-wide uppercase'>
                        We typically respond within 24 hours
                    </p>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className='w-full lg:w-1/2 shadow-xl flex flex-col gap-5 items-center border border-foreground/10 p-10'>
                    <input
                        onChange={handleFormData}
                        value={formData.name}
                        name='name'
                        type="text"
                        placeholder='Name'
                        className='text-foreground/60 px-5 py-3 w-full outline-none border border-foreground/30' />
                    <input
                        onChange={handleFormData}
                        value={formData.email}
                        name='email'
                        type="email"
                        placeholder='Email'
                        className='text-foreground/60 px-5 py-3 w-full outline-none border border-foreground/30' />
                    <input
                        onChange={handleFormData}
                        value={formData.subject}
                        name='subject'
                        type="text"
                        placeholder='Subject'
                        className='text-foreground/60 px-5 py-3 w-full outline-none border border-foreground/30' />

                    <textarea
                        onChange={handleFormData}
                        value={formData.message}
                        name='message'
                        cols="30"
                        rows="5"
                        placeholder='Your message'
                        className='text-foreground/60 px-5 py-3 w-full outline-none border border-foreground/30' />

                    <motion.button
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 100, y: 0 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        viewport={{ once: true }}
                        onClick={handleSubmit}
                        className='relative group/btn bg-foreground w-full px-7 py-3 uppercase tracking-wider text-lg cursor-pointer border border-foreground/30'>
                        <span className='relative z-10 font-semibold text-background group-hover/btn:text-foreground transition-colors ease-linear duration-200'>Send Message</span>
                        <span className='absolute left-0 bottom-0 w-full h-0 group-hover/btn:h-full transition-all ease-linear duration-300 bg-background'></span>
                    </motion.button>
                </motion.section>
            </header>
        </main>
    )
}

export default ContactPage
