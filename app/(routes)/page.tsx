'use client'
import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";
import PopularAnimeSlider from "./_components/PopularAnimeSlider";
import Top100AnimeSlider from "./_components/Top100AnimeSlider";
import FavoriteAnimeSlider from "./_components/FavoriteAnimeSlider";
import TrendingAnimeSlider from "./_components/TrendingAnimeSlider";
import ReleasingAnime from "./_components/ReleasingAnime";
import ReviewAnime from "./_components/ReviewAnime";
import AnimeCarousel from "./_components/AnimeCarousel";

export default function Homepage() {
  // const onSignOut = async() =>{
  //   await signOut(auth);
  // }

  return (
    <div>
      <AnimeCarousel />
      <div className="max-sm:mx-5 max-lg:mx-[50px] lg:ml-[50px] lg:mr-[50px]">
        <div className="flex items-start justify-center gap-x-8 max-sm:block">
          <div className="grow max-w-[80%] max-sm:max-w-[100%]">
            <PopularAnimeSlider />
            <Top100AnimeSlider />
            <TrendingAnimeSlider />
            <FavoriteAnimeSlider />
          </div>
          <div className="w-full">
            <ReleasingAnime />
            <ReviewAnime />
          </div>
        </div>

        {/* <button onClick={onSignOut}>
        Sign out
        </button> */}
      </div>
    </div>
  );
}
