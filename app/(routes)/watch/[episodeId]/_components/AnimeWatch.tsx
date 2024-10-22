import SliderNav from '@/components/Home/SliderNav'
import {Link2, TvMinimalPlayIcon, VideoIcon } from 'lucide-react'
import React from 'react'
import ArtPlayerAnime from './ArtPlayerAnime'
import Link from 'next/link'

interface AnimeWatchProps{
  data: any
}

const AnimeWatch = ({data} : AnimeWatchProps) => {
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
          <div className="text-2xl text-red-600 font-[family-name:var(--font-gilroy-bold)] mt-6 ">
            Episodes
          </div>
          <div className="grid grid-cols-7 gap-4 max-lg:grid-cols-6 max-md:grid-cols-4 max-sm:grid-cols-3 mt-2 max-h-[270px] overflow-y-scroll">
            {data.episodes.map((url: any, index: number) => (
              <Link
                key={index}
                href={`/watch/${url}`}
                className="bg-white whitespace-nowrap p-2 hover:bg-red-100 font-[family-name:var(--font-gilroy-medium)] rounded-md"
              >
                Episode {index + 1}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className='w-full'>
        <SliderNav title='External Links' icon={Link2} />
        <Link href={data.vidstreaming} target='_blank' className='flex bg-white mt-5 p-3 rounded-md gap-x-2 hover:bg-slate-100 font-[family-name:var(--font-gilroy-medium)]'>
          <TvMinimalPlayIcon />
          <div>Vidstreaming</div>
        </Link>
        <Link href={data.gogoserver} target='_blank' className='flex bg-white mt-5 p-3 rounded-md gap-x-2 hover:bg-slate-100 font-[family-name:var(--font-gilroy-medium)]'>
          <TvMinimalPlayIcon />
          <div>Gogoserver</div>
        </Link>
        <Link href={data.streamsb} target='_blank' className='flex bg-white mt-5 p-3 rounded-md gap-x-2 hover:bg-slate-100 font-[family-name:var(--font-gilroy-medium)]'>
          <TvMinimalPlayIcon />
          <div>Streamsb</div>
        </Link>
        <Link href={data.xstreamcdn} target='_blank' className='flex bg-white mt-5 p-3 rounded-md gap-x-2 hover:bg-slate-100 font-[family-name:var(--font-gilroy-medium)]'>
          <TvMinimalPlayIcon />
          <div>Xstreamcdn</div>
        </Link>
        <Link href={data.mixdrop} target='_blank' className='flex bg-white mt-5 p-3 rounded-md gap-x-2 hover:bg-slate-100 font-[family-name:var(--font-gilroy-medium)]'>
          <TvMinimalPlayIcon />
          <div>Mixdrop</div>
        </Link>
      </div>
    </div>
  )
}

export default AnimeWatch