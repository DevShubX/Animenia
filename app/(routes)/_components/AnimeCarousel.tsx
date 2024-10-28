"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { CirclePlayIcon, MonitorPlayIcon } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const AnimeCarousel = () => {
  const [carouselData, setCarouselData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getCarouselData();
  }, []);

  const getCarouselData = async () => {
    setIsLoading(true);
    const response = await axios.get("/api/anime/trending");
    setCarouselData(response.data.result?.data?.Page?.media);
    setIsLoading(false);
  };

  return (
    <div className="p-6">
      {isLoading && (
        <Skeleton className="w-full h-[500px] rounded-lg animate-pulse"/>
      )}
      {!isLoading && <Swiper
        className="mySwiper"
        modules={[Autoplay, Navigation, Pagination, Scrollbar]}
        slidesPerView={1}
        spaceBetween={50}
        pagination={{ dynamicBullets: true, dynamicMainBullets: 4 }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {carouselData.map(
          (item: any, index: any) =>
            (item.bannerImage !== null || undefined || "") && (
              <SwiperSlide key={item.id}>
                <div>
                  <Image
                    src={item.bannerImage}
                    alt="slider"
                    width={2500}
                    height={2500}
                    className="w-full h-[400px] object-cover rounded-xl"
                  />
                  <div className="rounded-xl absolute top-0 left-0 w-full h-full wrapper p-6 ">
                    <div className="text-red-600 text-4xl font-[family-name:var(--font-gilroy-bold)] max-sm:text-2xl">
                      {item.title.romaji ?? item.title.userPreferred}
                    </div>
                    <div className="flex text-white my-5 gap-x-3 font-[family-name:var(--font-gilroy-medium)]">
                      <MonitorPlayIcon />
                      Episode: {item.episodes ?? "NA"}
                    </div>
                    <div
                      dangerouslySetInnerHTML={{ __html: item.description }}
                      className="text-[17px] max-w-[50%] max-h-[150px] overflow-y-scroll text-white font-[family-name:var(--font-gilroy-medium)] max-sm:max-w-full max-sm:max-h-[100px]"
                    ></div>
                  </div>
                </div>
                <Link
                  href={`/search?q=${
                    item.title.romaji ?? item.title.userPreferred
                  }`}
                  className="absolute bottom-[30px] left-[20px] w-fit flex gap-x-2 bg-red-600 text-white px-2 py-4 rounded-md font-[family-name:var(--font-gilroy-bold)] "
                >
                  <CirclePlayIcon />
                  <div>Watch Now</div>
                </Link>
                <div className="absolute top-0 right-0 transform -translate-x-1/2 translate-y-[10%] max-lg:hidden">
                  <img
                    src={item.coverImage.large}
                    alt="poster"
                    className="rounded-md drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                  />
                </div>
              </SwiperSlide>
            )
        )}
      </Swiper>}
    </div>
  );
};

export default AnimeCarousel;
