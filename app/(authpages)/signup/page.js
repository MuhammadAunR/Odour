'use client'
import { BackToHome, container, FacebookIcon, GoogleIcon, item, SimpleLoader } from '@/components/admin/AuthPagesCompos'
import { SecondaryButton } from '@/components/UI/Buttons'
import { Eye, EyeOff } from 'lucide-react'
import { motion } from 'motion/react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { redirect, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const SignUpPage = () => {

    const [signUpPasswordVisible, setSignUpPasswordVisible] = useState(false)
    const [signUpConfirmPasswordVisible, setSignUpConfirmPasswordVisible] = useState(false)
    const [credentialsLoading, setCredentialsLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [userCredentials, setUserCredentials] = useState({
        name: "",
        email: "",
        password: "",
    })
    const searchParams = useSearchParams()

    const handleUserInputCredentials = (e) => {
        const { name, value } = e.target
        setUserCredentials(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    useEffect(() => {
        const error = searchParams.get('error')
        if (error === 'AccountAlreadyExists') {
            toast.warning('Account already exists. Sign In Please')
        }
    }, [searchParams])


    async function handleSignUp() {

        if (
            !userCredentials.name.trim() ||
            !userCredentials.email.trim() ||
            !userCredentials.password.trim()
        ) {
            toast.warning('All fields are required')
            return
        }

        if (userCredentials.password !== confirmPassword) {
            toast.warning('Password does not match')
            return
        }
        setCredentialsLoading(true)
        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userCredentials),
        })
        const data = await res.json()
        if (!res.ok) {
            toast.warning(data.message)
            setLoader(false)
            return
        }
        setCredentialsLoading(false)
        setUserCredentials({
            name: "",
            email: "",
            password: "",
        })
        setConfirmPassword("")
        redirect('/signin')
    }

    const handleGoogleSignUp = () => {
        setGoogleLoading(true)
        document.cookie = 'authIntent=signup; path=/; max-age=300; SameSite=Lax';
        signIn('google', {
            callbackUrl: '/signin'
        })
    }

    return (
        <motion.main
            variants={container}
            initial="hidden"
            animate="show"
            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface h-fit w-full md:w-130 p-10 px-5'>

            <section className='flex flex-col gap-7 items-center justify-center relative'>

                <BackToHome />

                <motion.div
                    variants={item}
                    className='flex flex-col items-center justify-center gap-2'>
                    <h1 className='text-5xl font-display font-bold'>SCENTRA</h1>
                    <h2 className='text-4xl font-serif font-black tracking-wider'>Sign Up</h2>
                    <div className='flex items-center justify-center gap-1'>
                        <p>Already have account ? </p>
                        <Link
                            href={'/signin'}
                            className='text-muted font-semibold cursor-pointer underline underline-offset-2'>
                            Sign In
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    variants={item}
                    className='w-full flex flex-col items-center justify-center gap-2'>
                    <h5 className='text-foreground/50 text-sm tracking-wide'>Sign Up with email and password</h5>
                    <div className='w-full lg:w-10/12 space-y-2'>
                        <input
                            type='name'
                            onChange={handleUserInputCredentials}
                            value={userCredentials.name}
                            name='name'
                            required
                            placeholder='Enter your name'
                            className='bg-background px-5 py-2 w-full outline-none text-foreground/60 border border-foreground/10 hover:border-foreground/30 transition-colors ease-linear' />
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
                                type={signUpPasswordVisible ? 'text' : 'password'}
                                onChange={handleUserInputCredentials}
                                value={userCredentials.password}
                                name='password'
                                required
                                placeholder='Enter a password'
                                className='bg-background px-5 py-2 w-full outline-none text-foreground/60 border border-foreground/10 hover:border-foreground/30 transition-all ease-linear' />
                            <span onClick={() => setSignUpPasswordVisible(p => !p)} className='absolute right-3 cursor-pointer'>
                                {signUpPasswordVisible ? <EyeOff size={18} color='grey' /> : <Eye size={18} color='grey' />}
                            </span>
                        </span>
                        <span className='relative flex items-center'>
                            <input
                                type={signUpConfirmPasswordVisible ? 'text' : 'password'}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                required
                                placeholder='Confirm your password'
                                className='bg-background px-5 py-2 w-full outline-none text-foreground/60 border border-foreground/10 hover:border-foreground/30 transition-all ease-linear' />
                            <span onClick={() => setSignUpConfirmPasswordVisible(p => !p)} className='absolute right-3 cursor-pointer'>
                                {signUpConfirmPasswordVisible ? <EyeOff size={18} color='grey' /> : <Eye size={18} color='grey' />}
                            </span>
                        </span>
                    </div>

                    <div className='flex flex-col items-center justify-center'>
                        <p className='text-foreground/40 text-sm transition-colors ease-linear'>
                            By creating account, you agree to our
                        </p>
                        <span className='text-foreground/40 text-sm cursor-pointer underline underline-offset-2 font-semibold'>
                            Terms of Services
                        </span>
                    </div>

                </motion.div>

                {credentialsLoading ?
                    <SimpleLoader />
                    :
                    <motion.span
                        key='button'
                        variants={item}
                        onClick={handleSignUp}
                    >
                        <SecondaryButton text={'Sign Up'} />
                    </motion.span>
                }

                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.50, ease: "linear" }}
                    viewport={{ once: false }}
                    className='bg-muted/40 w-full h-px'></motion.div>
                <motion.div
                    variants={item}
                    className='flex flex-col items-center justify-center gap-3 w-full'>
                    <h5 className='text-foreground/50 text-sm tracking-wide'>Or Sign Up using: </h5>
                    {googleLoading ?
                        <SimpleLoader />
                        :
                        <motion.button
                            onClick={handleGoogleSignUp}
                            whileTap={{ scale: 0.97 }}
                            className='flex items-center justify-center gap-5 border w-full lg:w-10/12 px-7 py-2 border-muted/40 hover:border-muted hover:bg-background transition-all ease-linear duration-300 cursor-pointer'>
                            <span><GoogleIcon /></span>
                            <span className='font-semibold'>Continue with Google</span>
                        </motion.button>
                    }
                </motion.div>
            </section>

        </motion.main>
    )
}

export default SignUpPage