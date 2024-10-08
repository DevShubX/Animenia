'use client'
import AnimeCard from "@/components/Cards/AnimeCard";
import SliderNav from "@/components/Home/SliderNav";
import axios from "axios";
import React, { useEffect, useState } from "react";

const PopularAnimeSlider = () => {

    const [popularAnime , setPopularAnime] = useState<any[]>([]);
    const [isLoading , setIsLoading] = useState<boolean>(false);

    useEffect(()=> {
        getPopularAnime()
    },[])

    const getPopularAnime = async () => {
        setIsLoading(true)
        const response = await axios.get("/api/anime/popular")
        setPopularAnime(response.data.result.data.Page.media)
        setIsLoading(false)
    }

  return (
    <div className="max-lg:mx-[50px] mx-[200px] w-full h-full">
        <SliderNav 
            title= "Popular Anime" 
            href= "/popular"
        />
        <div className="flex gap-x-2 w-full h-full">
            {popularAnime.map((item) => (
                <AnimeCard detail={item}/>
            ))}
        </div>
    </div>
  );
};

export default PopularAnimeSlider;
