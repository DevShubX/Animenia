import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { GoUnlock } from 'react-icons/go'
import { HiOutlineMail } from 'react-icons/hi'

const SignInPage = () => {

  //font-[family-name:var(--font-gilroy-bold)]

  return (
    <div className='card w-full px-[4rem] py-[2rem] rounded-[20px] shadow-lg max-w-md flex flex-col items-center'>
      <h1 className='text-center text-4xl mb-6'>Login</h1>
      <div className='space-y-4 w-full'>
        <div className='bg-white w-full flex items-center p-2 border rounded-lg '>
          <span>
            <HiOutlineMail className='w-6 h-6 text-gray-600' />
          </span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className='w-full p-2 outline-none' />
        </div>
        <div className='bg-white flex items-center p-2 border rounded-lg'>
          <span>
            <GoUnlock className='w-6 h-6 text-gray-600' />
          </span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className='w-full p-2 outline-none' />
          <span>
            <AiOutlineEyeInvisible className='w-6 h-6 text-gray-400' />
          </span>
        </div>
      </div>
      <div className='w-full text-start'>
        <button className='text-gray-600 mb-5 mt-1 text-[15px]'>Forgot password</button>
      </div>
      <button className='bg-red-600 w-full p-3 rounded-lg my-2 text-white text-[19px]'>
        Login
      </button>
      <span className='mt-2 mb-4'>
        Don&apos;t have an account?
        <Link href={"/sign-up"} className=' ml-2 underline font-medium'>
          Register
        </Link>
      </span>
      <button className='flex items-center w-full bg-white p-3 justify-center space-x-2 mt-4 rounded-lg'>
        <FcGoogle className='w-8 h-8' />
        <span className='text-[17px]'>
          Sign in with Google
        </span>
      </button>
    </div>
  )
}

export default SignInPage