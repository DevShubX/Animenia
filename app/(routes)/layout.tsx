import Navbar from '@/components/Navigation/Navbar'
import React from 'react'

const HomeLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='w-full'>
        <Navbar />
        <main className='w-full'>
          {children}
        </main>
    </div>
  )
}

export default HomeLayout