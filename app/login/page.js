'use client'
import React, { useState } from 'react'
import { Button1 } from '@/components/ButtonUI'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <path d="M29.44,16.318c0-.993-.089-1.947-.255-2.864h-13.185v5.422h7.535c-.331,1.744-1.324,3.22-2.813,4.213v3.525h4.544c2.647-2.444,4.175-6.033,4.175-10.296Z" opacity=".4"></path>
        <path d="M16,30c3.78,0,6.949-1.247,9.265-3.385l-4.544-3.525c-1.247,.84-2.838,1.349-4.722,1.349-3.64,0-6.733-2.456-7.84-5.765l-2.717,2.09-1.941,1.525c2.304,4.569,7.025,7.713,12.498,7.713Z"></path>
        <path d="M8.16,18.66c-.28-.84-.445-1.731-.445-2.66s.165-1.82,.445-2.66v-3.615H3.502c-.955,1.884-1.502,4.009-1.502,6.275s.547,4.391,1.502,6.275h3.332s1.327-3.615,1.327-3.615Z" opacity=".4"></path>
        <path d="M16,7.575c2.062,0,3.895,.713,5.358,2.087l4.009-4.009c-2.431-2.265-5.587-3.653-9.367-3.653-5.473,0-10.195,3.144-12.498,7.725l4.658,3.615c1.107-3.309,4.2-5.765,7.84-5.765Z"></path>
    </svg>
)

const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <path d="M16,2c-7.732,0-14,6.268-14,14,0,6.566,4.52,12.075,10.618,13.588v-9.31h-2.887v-4.278h2.887v-1.843c0-4.765,2.156-6.974,6.835-6.974,.887,0,2.417,.174,3.043,.348v3.878c-.33-.035-.904-.052-1.617-.052-2.296,0-3.183,.87-3.183,3.13v1.513h4.573l-.786,4.278h-3.787v9.619c6.932-.837,12.304-6.74,12.304-13.897,0-7.732-6.268-14-14-14Z"></path>
    </svg>
)

const SocialButtons = () => (
    <div className='flex items-center justify-center gap-5'>
        <span className='border border-foreground/20 p-2 hover:border-foreground/70 transition-all ease-linear cursor-pointer rounded-full'>
            <GoogleIcon />
        </span>
        <span className='border border-foreground/20 p-2 hover:border-foreground/70 transition-all ease-linear cursor-pointer rounded-full'>
            <FacebookIcon />
        </span>
    </div>
)

const Divider = () => (
    <div className='flex items-center gap-3 w-10/12'>
        <div className='flex-1 h-[0.5px] bg-foreground/20'></div>
        <span className='text-xs tracking-[0.2em] uppercase text-foreground/30'>or</span>
        <div className='flex-1 h-[0.5px] bg-foreground/20'></div>
    </div>
)

const leftAnimationProps = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 500 },
    transition: { duration: 0.4, ease: 'easeInOut' }
}
const rightAnimationProps = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -500 },
    transition: { duration: 0.4, ease: 'easeInOut' }
}

const AuthPage = () => {

    const [signInPasswordVisible, setSignInPasswordVisible] = useState(false)
    const [signUpPasswordVisible, setSignUpPasswordVisible] = useState(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
    const [activeAuthWay, setActiveAuthWay] = useState('signin')

    const toggleActiveAuthWay = () => {
        setActiveAuthWay(prev => prev === 'signin' ? 'signup' : 'signin')
    }

    const isSignIn = activeAuthWay === 'signin'

    return (
        <main className='w-full min-h-screen h-fit flex flex-col items-center justify-center gap-3 py-5'>

            <Link href={'/'} className='text-6xl font-display font-bold'>Odour</Link>

            <section className='w-full lg:w-250 min-h-160 h-fit flex items-center justify-center lg:bg-foreground/5 overflow-hidden'>

                <AnimatePresence mode='wait'>
                    {isSignIn ? (
                        <motion.div
                            key='signin-form'
                            {...leftAnimationProps}
                            className='bg-surface w-10/12 lg:w-1/2 min-h-160 h-fit flex flex-col gap-5 items-center justify-center py-7 px-3'>

                            <span onClick={toggleActiveAuthWay} className='lg:hidden'>
                                <Button1 text={'Create Account'} />
                            </span>

                            <h1 className='font-black text-4xl font-serif tracking-wide'>Sign In</h1>

                            <SocialButtons />
                            <Divider />

                            <h5 className='text-foreground/50 text-sm tracking-wide'>Sign in with email and password</h5>

                            <div className='w-full lg:w-10/12 space-y-2'>
                                <input
                                    type='email'
                                    required
                                    placeholder='Email Address'
                                    className='bg-background px-5 py-2 w-full outline-none text-foreground/60 border border-foreground/10 hover:border-foreground/30 transition-colors ease-linear' />
                                <span className='relative flex items-center'>
                                    <input
                                        type={signInPasswordVisible ? 'text' : 'password'}
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

                            <Button1 text={'Sign In'} />

                        </motion.div>
                    ) : (
                        <motion.div
                            key='signup-form'
                            {...leftAnimationProps}
                            className='bg-surface w-10/12 lg:w-1/2 min-h-160 h-fit flex flex-col gap-5 items-center justify-center py-7 px-3'>

                            <span onClick={toggleActiveAuthWay} className='lg:hidden'>
                                <Button1 text={'Sign In'} />
                            </span>

                            <h1 className='font-black text-4xl font-serif tracking-wide'>Create Account</h1>

                            <SocialButtons />
                            <Divider />

                            <div className='w-full lg:w-10/12 space-y-2'>
                                <input
                                    type='text'
                                    required
                                    placeholder='Full Name'
                                    className='bg-background px-5 py-2 w-full outline-none text-foreground/60 border border-foreground/10 hover:border-foreground/30 transition-colors ease-linear' />
                                <input
                                    type='email'
                                    required
                                    placeholder='Email Address'
                                    className='bg-background px-5 py-2 w-full outline-none text-foreground/60 border border-foreground/10 hover:border-foreground/30 transition-colors ease-linear' />
                                <span className='relative flex items-center'>
                                    <input
                                        type={signUpPasswordVisible ? 'text' : 'password'}
                                        required
                                        placeholder='Create Password'
                                        className='bg-background px-5 py-2 w-full outline-none text-foreground/60 border border-foreground/10 hover:border-foreground/30 transition-colors ease-linear' />
                                    <span onClick={() => setSignUpPasswordVisible(p => !p)} className='absolute right-3 cursor-pointer'>
                                        {signUpPasswordVisible ? <EyeOff size={18} color='grey' /> : <Eye size={18} color='grey' />}
                                    </span>
                                </span>
                                <span className='relative flex items-center'>
                                    <input
                                        type={confirmPasswordVisible ? 'text' : 'password'}
                                        required
                                        placeholder='Confirm Password'
                                        className='bg-background px-5 py-2 w-full outline-none text-foreground/60 border border-foreground/10 hover:border-foreground/30 transition-colors ease-linear' />
                                    <span onClick={() => setConfirmPasswordVisible(p => !p)} className='absolute right-3 cursor-pointer'>
                                        {confirmPasswordVisible ? <EyeOff size={18} color='grey' /> : <Eye size={18} color='grey' />}
                                    </span>
                                </span>
                            </div>

                            <p className='text-xs text-foreground/40 text-center max-w-xs leading-relaxed'>
                                By creating an account you agree to our{' '}
                                <span className='text-foreground/70 underline underline-offset-2 cursor-pointer hover:text-foreground transition-colors'>
                                    Terms of Service
                                </span>{' '}
                                and{' '}
                                <span className='text-foreground/70 underline underline-offset-2 cursor-pointer hover:text-foreground transition-colors'>
                                    Privacy Policy
                                </span>
                            </p>

                            <Button1 text={'Create Account'} />

                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence mode='wait'>
                    {isSignIn ? (
                        <motion.div
                            key='signin-panel'
                            {...rightAnimationProps}
                            className='w-1/2 min-h-160 h-fit flex flex-col gap-5 items-center justify-center py-7 px-3 max-lg:hidden'>
                            <span className='text-xs font-semibold tracking-[0.3em] uppercase text-foreground/40'>
                                Begin Your Journey
                            </span>
                            <h1 className='font-black text-5xl font-serif tracking-wider text-center'>
                                Join The House of Odour
                            </h1>
                            <p className='text-foreground/50 text-center text-sm tracking-wide max-w-xs leading-relaxed'>
                                Become a member and unlock access to our world of rare, handpicked fragrances crafted for the discerning few.
                            </p>
                            <span onClick={toggleActiveAuthWay}>
                                <Button1 text={'Create Account'} />
                            </span>
                        </motion.div>
                    ) : (
                        <motion.div
                            key='signup-panel'
                            {...rightAnimationProps}
                            className='w-1/2 min-h-160 h-fit flex flex-col gap-5 items-center justify-center py-7 px-3 max-lg:hidden'>
                            <span className='text-xs font-semibold tracking-[0.3em] uppercase text-foreground/40'>
                                Welcome Back
                            </span>
                            <h1 className='font-black text-5xl font-serif tracking-wider text-center'>
                                Enter Your World
                            </h1>
                            <p className='text-foreground/50 text-center text-sm tracking-wide max-w-xs leading-relaxed'>
                                Sign in to continue your journey through our curated world of rare and distinguished fragrances.
                            </p>
                            <span onClick={toggleActiveAuthWay}>
                                <Button1 text={'Sign In'} />
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

            </section>
        </main>
    )
}

export default AuthPage