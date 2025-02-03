import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaStar } from 'react-icons/fa';

interface AnimeCardProps{
    detail: any;
}

const AnimeCard = ({detail}:AnimeCardProps) => {
  return (
    <Link href={`/search?q=${detail.title.romaji ?? detail.title.userPreferred}`} className='flex-shrink-0 relative w-[250px] h-[330px] max-md:w-[180px] max-md:h-[235px] max-sm:w-[170px] max-sm:h-[235px]'>
        <Image
            src={detail.coverImage.large ?? detail.coverImage.extraLarge} 
            width={400}
            height={400}
            alt="img"
            className='w-[250px] h-[330px] max-md:w-[180px] max-md:h-[235px] max-sm:w-[170px] max-sm:h-[235px] object-cover rounded-[10px] max-md:rounded-[12px]' 
        />
        <div className='absolute bottom-0 w-full pb-3 pt-3 animecard'>
          <div className=' pl-6 mb-2 left-0 truncate text-xl text-red-500 dark:text-white font-[family-name:var(--font-gilroy-bold)] max-sm:pl-2 max-sm:text-[18px]'>
            {detail.title.romaji ?? detail.title.english ?? detail.title.native ?? detail.title.userPreferred}
          </div>
          <div className='dark:text-black flex items-center pl-4 truncate font-[family-name:var(--font-gilroy-medium)] max-sm:hidden'>
            {detail.genres.slice(0,3).map((item:string, index:string) => (
              <div key={index} className='bg-white p-1 m-1 text-[14px] rounded-lg'>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className='flex items-center justify-center gap-x-2 max-sm:gap-x-1 rounded-lg text-red-500 dark:text-white text-md max-sm:text-sm font-[family-name:var(--font-gilroy-medium)] absolute top-4 right-0 mr-3 p-2 max-sm:p-1 card'>
          <FaStar 
            className='dark:text-yellow-600 text-red-500 max-sm:mb-1'
          />
          <div>
            {((detail.averageScore)/10).toFixed(1)}
          </div>
        </div>
    </Link>
  )
}

export default AnimeCard