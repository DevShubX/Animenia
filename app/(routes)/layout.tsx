import Navbar from '@/components/Navigation/Navbar'
import React from 'react'

const HomeLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='w-full '>
      <div>
        <Navbar />
      </div>
        <main className='w-full h-full'>
          {children}
        </main>
    </div>
  )
}

export default HomeLayout