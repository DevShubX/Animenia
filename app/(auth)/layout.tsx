import React from 'react'
import Image from 'next/image'

const AuthLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='w-full h-full relative'>
      <Image className="w-full h-full" src="/static/Background.jpg" alt="bg" width={1920} height={1080}  />
      <main className='absolute top-0 left-0 w-full h-full'>
        <div className='flex justify-center items-center w-full h-full'>
          {children}
        </div>
      </main>
    </div>
  )
}

export default AuthLayout