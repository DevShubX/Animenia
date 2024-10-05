'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useStateContext } from '@/GlobalContext/ContextProvider'
import { Bookmark, BookMarked, LayoutGrid, Moon, Search } from 'lucide-react'

const Navbar = () => {

  const {currentUser} = useStateContext()

  return (
    <nav className='bg-white flex items-center w-full h-full justify-between p-3'>
      <div>
        <Image className='w-[100px] h-[50px]' src="/static/animenia-logo.png" alt ="logo" width={100} height={100}/>
      </div>
      <div className="hidden md:flex space-x-6 font-[family-name:var(--font-gilroy-medium)]">
        <Link href="#" className="hover:text-gray-400">Home</Link>
        <Link href="#" className="hover:text-gray-400">All</Link>
        <Link href="#" className="hover:text-gray-400">Action</Link>
        <Link href="#" className="hover:text-gray-400">Genre</Link>
        <Link href="#" className="hover:text-gray-400">Articles</Link>
      </div>
      <div className='flex items-center justify-center space-x-3'>
        <Search />
        <Moon />
        <Bookmark />
        <Image src={currentUser?.photoURL!} alt="pfp" width={100} height={100} 
          className="w-10 h-10 rounded-[50%] border-2 border-purple-500 object-cover p-[1px]" 
        />
        <LayoutGrid className='hidden max-md:block' />
      </div>
    </nav>
  )
}

export default Navbar