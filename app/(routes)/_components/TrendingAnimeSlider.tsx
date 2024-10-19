'use client'
import React, { useEffect, useState } from "react";
import AnimeCard from "@/components/Cards/AnimeCard";
import SliderNav from "@/components/Home/SliderNav";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import SliderSkeleton from "@/components/Skeletons/SliderSkeleton";
import 'swiper/css';
import { Image } from "lucide-react";

const TrendingAnimeSlider = () => {

    const [trendingAnime , setTrendingAnime] = useState<any[]>([]);
    const [isLoading , setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        getTrendingAnime()
    },[])

    const getTrendingAnime = async () => {
        setIsLoading(true)
        const response = await axios.get("/api/anime/trending")
        setTrendingAnime(response.data.result.data.Page.media)
        setIsLoading(false)
    }

  return (
    <div>
            <SliderNav
                icon= {Image}
                title="Trending Anime"
                href="/trending "
            />
            {isLoading && <SliderSkeleton/>}
            {!isLoading && (<div className="w-full p-5 max-sm:px-2">
                <Swiper
                    className="MySwiper"
                    breakpoints={{
                      // when window width is >= 320px
                      320: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                      },
                      // when window width is >= 480px
                      480: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                      },
                      // when window width is >= 640px
                      640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                      },
                      900: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                      },
                      1500: {
                        slidesPerView: 4,
                        spaceBetween: 45,
                      },
                    }}
                >
                    {trendingAnime.map((item: any) => (
                        <SwiperSlide key={item.id}>
                            <AnimeCard detail={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>)}
        </div>
  )
}

export default TrendingAnimeSlider;