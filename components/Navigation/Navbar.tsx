import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {

  return (
    <nav className='bg-white flex items-center w-full h-full justify-between p-2'>
      <div>
        <Image className='w-[8rem] h-[2rem]' src="/static/Animenia 1.png" alt ="logo" width={100} height={100}/>
      </div>
      <div className="hidden md:flex space-x-6">
        <Link href="#" className="hover:text-gray-400">All</Link>
        <Link href="#" className="hover:text-gray-400">Action</Link>
        <Link href="#" className="hover:text-gray-400">Genre</Link>
      </div>
      <div>

      </div>
    </nav>
  )
}

export default Navbar