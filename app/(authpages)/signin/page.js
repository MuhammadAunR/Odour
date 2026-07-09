'use client'
import { BackToHome, container, FacebookIcon, GoogleIcon, item } from '@/components/admin/AuthPagesCompos'
import { SecondaryButton } from '@/components/UI/Buttons'
import { Eye, EyeOff } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const SignInPage = () => {

    const [signInPasswordVisible, setSignInPasswordVisible] = useState(false)
    const [userCredentials, setUserCredentials] = useState({
        email: "",
        password: "",
    })

    const handleUserInputCredentials = (e) => {
        const { name, value } = e.target
        setUserCredentials(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleSignIn() {
        if (!userCredentials.email.trim() || !userCredentials.password.trim()) {
            toast.warning('All input fields required')
            return
        }
        const res = await fetch('/api/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userCredentials)
        })
        const data = await res.json()
        if (!res.ok) {
            toast.error(data.message)
            return
        }
        setUserCredentials({
            email: "",
            password: "",
        })
        redirect('/signup')
    }

    return (
        <motion.main
            variants={container}
            initial="hidden"
            animate="show"
            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface h-fit w-1/3 py-10 px-5'>

            <section className='flex flex-col gap-7 items-center justify-center relative'>

                <BackToHome />

                <motion.div
                    variants={item}
                    className='flex flex-col items-center justify-center gap-2'>
                    <h1 className='text-5xl font-display font-bold'>Odour</h1>
                    <h2 className='text-4xl font-serif font-black tracking-wider'>Sign Up</h2>
                    <div className='flex items-center justify-center gap-1'>
                        <p>New to our store? </p>
                        <Link
                            href={'/signup'}
                            className='text-muted font-semibold cursor-pointer underline underline-offset-2'>
                            Sign Up
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    variants={item}
                    className='w-full flex flex-col items-center justify-center gap-2'>
                    <h5 className='text-foreground/50 text-sm tracking-wide'>Sign in with email and password</h5>
                    <div className='w-full lg:w-10/12 space-y-2'>
                        <input
                            type='email'
                            onChange={handleUserInputCredentials}
                            value={userCredentials.email}
                            name='email'
                            required
                            placeholder='Email Address'
                            className='bg-background px-5 py-2 w-full outline-none text-foreground/60 border border-foreground/10 hover:border-foreground/30 transition-colors ease-linear' />
                        <span className='relative flex items-center'>
                            <input
                                type={signInPasswordVisible ? 'text' : 'password'}
                                onChange={handleUserInputCredentials}
                                value={userCredentials.password}
                                name='password'
                                required
                                placeholder='Enter your password'
                                className='bg-background px-5 py-2 w-full outline-none text-foreground/60 border border-foreground/10 hover:border-foreground/30 transition-colors ease-linear' />
                            <span onClick={() => setSignInPasswordVisible(p => !p)} className='absolute right-3 cursor-pointer'>
                                {signInPasswordVisible ? <EyeOff size={18} color='grey' /> : <Eye size={18} color='grey' />}
                            </span>
                        </span>
                    </div>

                    <h5 className='text-foreground/40 text-sm hover:text-red-500 transition-colors ease-linear cursor-pointer'>
                        Forgot Password?
                    </h5>
                </motion.div>
                <motion.span
                    variants={item}
                    onClick={handleSignIn}
                >
                    <SecondaryButton text={'Sign In'} />
                </motion.span>

                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.50, ease: "linear" }}
                    viewport={{ once: false }}
                    className='bg-muted/40 w-full h-px'></motion.div>


                <motion.div
                    variants={item}
                    className='flex flex-col items-center justify-center gap-3 w-full'>
                    <h5 className='text-foreground/50 text-sm tracking-wide'>Or Sign In using: </h5>

                    <motion.button
                        initial
                        whileTap={{ scale: 0.97 }}
                        className='flex items-center justify-center gap-5 border w-10/12 px-7 py-2 border-muted/40 hover:border-muted hover:bg-background transition-all ease-linear duration-300 cursor-pointer'>
                        <span><GoogleIcon /></span>
                        <span className='font-semibold'>Continue with Google</span>
                    </motion.button>
                    <motion.button
                        initial
                        whileTap={{ scale: 0.97 }}
                        className='flex items-center justify-center gap-5 border w-10/12 px-7 py-2 border-muted/40 hover:border-muted hover:bg-background transition-all ease-linear duration-300 cursor-pointer'>
                        <span><FacebookIcon /></span>
                        <span className='font-semibold'>Continue with Facebook</span>
                    </motion.button>
                </motion.div>
            </section>

        </motion.main>
    )
}

export default SignInPage