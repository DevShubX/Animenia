"use client";
import React, { useEffect, useState } from "react";
import SliderNav from "@/components/Home/SliderNav";
import { TvMinimalPlayIcon } from "lucide-react";
import { useStateContext } from "@/GlobalContext/ContextProvider";
import { database } from "@/firebase/firebase";
import { onChildRemoved, onValue, ref, set } from "firebase/database";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import Link from "next/link";
import { AiFillCloseCircle } from "react-icons/ai";

const ContinueWatching = () => {
  const { currentUser } = useStateContext();
  const [animeArray, setAnimeArray] = useState<object[]>([]);
  const [isLoading , setIsLoading] = useState<boolean>(false);

  const dbRef = ref(
    database,
    `users/${currentUser?.uid}/continueWatching/animes/anime_arr`
  );

  useEffect(() => {
    const controller = new AbortController();
    getContinueWatchingAnime();
    return () => {
      controller.abort();
    };
  }, [isLoading , currentUser]);

  const getContinueWatchingAnime = () => {
    setIsLoading(true)
    onValue(dbRef, (snapshot) => {     // Snapshot:  (Firebase object) How data is stored in firebase 
        if (snapshot.exists()) {
          console.log(snapshot)
            const anime = snapshot.val();   // Val() : returns data in its initial form from DataSnapshot obj.
            setAnimeArray(anime);
        }
    });
    onChildRemoved(dbRef,(snapshot) => {
        const anime = snapshot.val();
        setAnimeArray(anime);
    })
    setIsLoading(false)
  };

  const removeContinueWatching = (index: number) => {
    const newContinueWatching = animeArray;
    newContinueWatching.splice(index, 1);
    setAnimeArray(newContinueWatching);
    set(ref(database, `users/${currentUser?.uid}/continueWatching/animes`), {
      anime_arr: newContinueWatching,
    });
  };

  return (
    <div>
      {animeArray.length > 0 && (
        <div>
          <SliderNav title="Continue Watching" icon={TvMinimalPlayIcon} />
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
              {animeArray.map((item: any, index: number) => (
                <SwiperSlide key={item.id}>
                  <Link
                    href={item.animeWatchLink}
                    className="relative font-[family-name:var(--font-gilroy-medium)] w-[250px] max-md:w-[180px] max-sm:w-[170px]"
                  >
                    <Image
                      src={item.coverImage.large}
                      alt="img"
                      width={300}
                      height={300}
                      className="w-[250px] h-[330px] max-md:w-[180px] max-md:h-[235px] max-sm:w-[170px] max-sm:h-[235px] object-cover rounded-[10px] max-md:rounded-[12px]"
                    />
                    <div className="mt-1 text-[18px] truncate line-clamp-2 text-red-600">
                      {item.title.romaji ?? item.title.userPreferred}
                    </div>
                    <div>
                      <span>Episode: </span>
                      {item.animeEpisodeId.split("-").reverse()[0]}
                    </div>
                  </Link>
                  <button
                    className="absolute top-2 right-2 "
                    onClick={() => removeContinueWatching(index)}
                  >
                    <AiFillCloseCircle className="bg-white text-red-600 text-3xl rounded-full " />
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContinueWatching;
