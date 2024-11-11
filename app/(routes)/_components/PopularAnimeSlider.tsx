"use client";
import AnimeCard from "@/components/Cards/AnimeCard";
import SliderNav from "@/components/Home/SliderNav";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SliderSkeleton from "@/components/Skeletons/SliderSkeleton";
import { Image } from "lucide-react";

const PopularAnimeSlider = () => {
  const [popularAnime, setPopularAnime] = useState<object[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getPopularAnime();
  }, []);

  const getPopularAnime = async () => {
    setIsLoading(true);
    const response = await axios.get("/api/anime/popular");
    setPopularAnime(response.data.result?.data?.Page?.media);
    setIsLoading(false);
  };

  return (
    <div>
      <SliderNav icon= {Image} title="Popular Anime" href="/popular?page=1" />
      {isLoading && <SliderSkeleton />}
      {!isLoading && (
        <div className="w-full p-5 max-sm:px-2">
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
                slidesPerView: 5,
                spaceBetween: 45,
              },
            }}
          >
            {popularAnime?.map((item: any) => (
              <SwiperSlide key={item.id}>
                <AnimeCard detail={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default PopularAnimeSlider;
