'use client'
import { auth } from '@/firebase/firebase'
import { GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { GoUnlock } from 'react-icons/go'
import { HiOutlineMail } from 'react-icons/hi'

const SignInPage = () => {

  const router = useRouter();
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isSigninWithGoogle, setIsSigninWithGoogle] = useState<boolean>(false);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);


  const handleLogIn = () => {
    try{
      if (email && password) {
        setIsSigningIn(true);
        const signInPromise = signInWithEmailAndPassword(auth, email, password);
        toast.promise(signInPromise, {
          loading: "Signing in...",
          success: "Login Successfull",
          error: "Error signing in...😞",
        }).then(() => {
          router.push('/');
        }).finally(() => {
          setIsSigningIn(false);
        });
      }
    }catch(error){
      toast.error("Something went wrong!");
    }
  }

  const onGoogleSignin = async () => {
    setIsSigninWithGoogle(true);
    const googleProvider = new GoogleAuthProvider();
    const promise = signInWithPopup(auth, googleProvider);
    toast.promise(promise, {
      loading: "Signing in with google.",
      success: "Login Successfull",
      error: "Error signing in with google.😞",
    }).then(() => {
      router.push('/');
    }).finally(() => {
      setIsSigninWithGoogle(false);
    });
  }


  return (
    <div className='card w-full px-[4rem] py-[2rem] max-md:px-[2rem] max-md:mx-[1rem] rounded-[20px] shadow-lg max-w-md flex flex-col items-center '>
      <h1 className='text-center text-4xl mb-6 font-[family-name:var(--font-gilroy-bold)]'>Login</h1>
      <div className='space-y-4 w-full'>
        <div className='bg-white w-full flex items-center p-2 border rounded-lg'>
          <span>
            <HiOutlineMail className='w-6 h-6 text-gray-600' />
          </span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-2 outline-none font-[family-name:var(--font-gilroy-medium)]'
          />
        </div>
        <div className='bg-white flex items-center p-2 border rounded-lg'>
          <span>
            <GoUnlock className='w-6 h-6 text-gray-600' />
          </span>
          <input
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-2 outline-none font-[family-name:var(--font-gilroy-medium)]'
          />
          <span onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
            {isPasswordVisible && <AiOutlineEye className='w-6 h-6 text-gray-400' />}
            {!isPasswordVisible && <AiOutlineEyeInvisible className='w-6 h-6 text-gray-400' />}
          </span>
        </div>
      </div>
      <div className='w-full text-start mb-3 mt-1'>
        <Link href={'/forgot-password'} className='text-gray-600 text-[15px] font-[family-name:var(--font-gilroy-medium)]'>
          Forgot password
        </Link>
      </div>
      <button
        onClick={handleLogIn}
        disabled={isSigningIn}
        className='bg-red-600 flex items-center justify-center w-full p-3 rounded-lg my-2 text-white text-[19px] font-[family-name:var(--font-gilroy-medium)]'>
        {isSigningIn ? (
          <div className='flex items-center justify-center gap-x-2'>
            <Loader2 className='animate-spin' />
            <span>Loading...</span>
          </div>
        ) : (
          <>
            Login
          </>
        )}

      </button>
      <span className='mt-2 mb-4 font-[family-name:var(--font-gilroy-medium)]'>
        Don&apos;t have an account?
        <Link href={"/sign-up"} className=' ml-2 underline font-[family-name:var(--font-gilroy-bold)]'>
          Register
        </Link>
      </span>
      <button
        type='button'
        onClick={onGoogleSignin}
        disabled={isSigninWithGoogle}
        className='flex items-center w-full bg-white p-3 justify-center space-x-2 mt-4 rounded-lg font-[family-name:var(--font-gilroy-medium)]'>
        <FcGoogle className='w-8 h-8' />
        <span className='text-[17px]'>
          Sign in with Google
        </span>
      </button>
    </div>
  )
}

export default SignInPage