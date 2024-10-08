import Image from 'next/image';
import React from 'react'

interface AnimeCardProps{
    detail: any;
}

const AnimeCard = ({detail}:AnimeCardProps) => {
  return (
    <div className='w-full h-full'>
        <img
            src={detail.coverImage.large} 
            alt="img" 
            // width={800} 
            // height={800}
            // className=' w-[200px] h-[400px]'
        />
    </div>
  )
}

export default AnimeCard