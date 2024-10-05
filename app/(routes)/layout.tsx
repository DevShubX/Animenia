import Navbar from '@/components/Navigation/Navbar'
import React from 'react'

const HomeLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <Navbar />
        {children}
    </div>
  )
}

export default HomeLayout