import Image from 'next/image';
import React from 'react'

interface AnimeCardProps{
    detail: any;
}

const AnimeCard = ({detail}:AnimeCardProps) => {
  return (
    <div className='flex-shrink-0 relative'>
        <Image
            src={detail.coverImage.large} 
            width={400}
            height={400}
            alt="img"
            className='w-[210px] h-[300px] object-cover' 
        />
        <div className='absolute bottom-0 left-0'>
          {detail.title.romaji}
        </div>
    </div>
  )
}

export default AnimeCard