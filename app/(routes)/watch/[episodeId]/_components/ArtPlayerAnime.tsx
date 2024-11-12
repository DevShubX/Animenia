'use client'
import React, { useEffect, useRef } from 'react'
import ArtPlayer from 'artplayer'
import Hls from 'hls.js'

interface ArtPlayerAnimeProps{
    sources: any,
}

const ArtPlayerAnime = ({sources} : ArtPlayerAnimeProps) => {

    let reverseSources = [...sources.sources].reverse()
    reverseSources = reverseSources.filter((item) => item.quality !== 'default')

    const src = `${reverseSources[0].url}`
    const artRef = useRef<any>()

    useEffect(() => {
        const art = new ArtPlayer({
            container : artRef.current,
            url: src,
            autoOrientation: true,
            fullscreen: true,
            lock: true,
            setting: true,
            playbackRate: true,
            moreVideoAttr: {
                crossOrigin: 'anonymous'
            },
            quality:reverseSources.map((item:any) => {
                const container:any = {};
                container['html'] = item.quality;
                container['url'] = `${item.url}`;
                return container;
            }),
            customType: {
                m3u8: function (video,url){
                    if(Hls.isSupported()){
                        const hls = new Hls();
                        hls.loadSource(url);
                        hls.attachMedia(video);
                    } else if(video.canPlayType('application/vnd.apple.mpegurl')){
                        video.src = url;
                    } else {
                        art.notice.show = 'Does not support playback of m3u8'
                    }
                }
            },
        });
        return () => {
            if(art && art.destroy){
                art.destroy(false)
            }
        }
    },[src])


  return (
    <div ref={artRef} className='w-full h-[500px] max-md:h-[300px]'></div>
  )
}

export default ArtPlayerAnime