'use client'
import { useStateContext } from '@/GlobalContext/ContextProvider'
import React from 'react'
import Image from 'next/image'


const PopularPage = () => {

  const {currentUser} = useStateContext()

  return (
    <div>PopularPage
      Current User: <Image src={currentUser?.photoURL!} alt="dvdhvv" width={300} height={300} />
    </div>
  )
}

export default PopularPage