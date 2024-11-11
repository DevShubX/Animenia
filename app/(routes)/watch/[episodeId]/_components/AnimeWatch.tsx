import SliderNav from '@/components/Home/SliderNav'
import {Link2, TvMinimalPlayIcon, VideoIcon } from 'lucide-react'
import React from 'react'
import ArtPlayerAnime from './ArtPlayerAnime'
import Link from 'next/link'
import EpisodeSection from '@/components/Anime/EpisodeSection'

interface AnimeWatchProps{
  data: any,
  anilistData: any,
  animeId: any,
}

const AnimeWatch = ({data, anilistData, animeId} : AnimeWatchProps) => {

  return (
    <div className='p-6 flex gap-x-5 max-lg:flex-col'>
      <div className='w-[85%] flex-shrink-0 max-lg:w-full'>
        <SliderNav title={`Watch`} icon={VideoIcon} path={`/details/${data.baseEpisodeLink.replace("-episode-","")}`} subTitle='Back to Details'/>
        <div className='mt-5'>
          <ArtPlayerAnime sources={data.sources}/>
          <div className='mt-5 text-2xl text-red-600 font-[family-name:var(--font-gilroy-medium)]'>
            {data.titleName}
          </div>
        </div>
        <div>
          <EpisodeSection anilistData={anilistData}  animeId={animeId} />
        </div>
      </div>
      <div className='w-full '>
        <SliderNav title='External Links' icon={Link2} />
        <Link href={data?.vidstreaming ?? "#"} target='_blank' className='flex dark:bg-[#333333] dark:hover:bg-gray-500 bg-white mt-5 p-3 rounded-md gap-x-2 hover:bg-slate-100 font-[family-name:var(--font-gilroy-medium)]'>
          <TvMinimalPlayIcon />
          <div>Vidstreaming</div>
        </Link>
        <Link href={data?.gogoserver ?? "#"} target='_blank' className='flex dark:bg-[#333333] dark:hover:bg-gray-500 bg-white mt-5 p-3 rounded-md gap-x-2 hover:bg-slate-100 font-[family-name:var(--font-gilroy-medium)]'>
          <TvMinimalPlayIcon />
          <div>Gogoserver</div>
        </Link>
        <Link href={data?.streamsb ?? "#"} target='_blank' className='flex dark:bg-[#333333] dark:hover:bg-gray-500 bg-white mt-5 p-3 rounded-md gap-x-2 hover:bg-slate-100 font-[family-name:var(--font-gilroy-medium)]'>
          <TvMinimalPlayIcon />
          <div>Streamsb</div>
        </Link>
        <Link href={data?.xstreamcdn ?? "#"} target='_blank' className='flex dark:bg-[#333333] dark:hover:bg-gray-500 bg-white mt-5 p-3 rounded-md gap-x-2 hover:bg-slate-100 font-[family-name:var(--font-gilroy-medium)]'>
          <TvMinimalPlayIcon />
          <div>Xstreamcdn</div>
        </Link>
        <Link href={data?.mixdrop ?? "#"} target='_blank' className='flex dark:bg-[#333333] dark:hover:bg-gray-500 bg-white mt-5 p-3 rounded-md gap-x-2 hover:bg-slate-100 font-[family-name:var(--font-gilroy-medium)]'>
          <TvMinimalPlayIcon />
          <div>Mixdrop</div>
        </Link>
      </div>
    </div>
  )
}

export default AnimeWatch