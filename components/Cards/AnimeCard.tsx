import Image from 'next/image';
import React from 'react'
import { FaStar } from 'react-icons/fa';

interface AnimeCardProps{
    detail: any;
}

const AnimeCard = ({detail}:AnimeCardProps) => {
  return (
    <div className='flex-shrink-0 relative w-[250px] h-[330px]'>
        <Image
            src={detail.coverImage.large} 
            width={400}
            height={400}
            alt="img"
            className='w-full h-full object-cover rounded-[22px]' 
        />
        <div className='absolute bottom-0 w-full pb-3 pt-3 animecard'>
          <div className=' pl-6 mb-2 left-0 truncate text-xl text-red-500 font-[family-name:var(--font-gilroy-bold)]'>
            {detail.title.romaji}
          </div>
          <div className='flex items-center pl-4 truncate font-[family-name:var(--font-gilroy-medium)]'>
            {detail.genres.slice(0,3).map((item:string) => (
              <div className='bg-white p-1 m-1 text-[14px] rounded-lg'>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className='flex items-center justify-center gap-x-2 rounded-lg text-red-500 text-md font-[family-name:var(--font-gilroy-medium)] absolute top-4 right-0 mr-3 p-2 card'>
          <FaStar 
            className='text-red-500'
          />
          <div>{((detail.averageScore)/10).toFixed(1)}</div>
        </div>
    </div>
  )
}

export default AnimeCard