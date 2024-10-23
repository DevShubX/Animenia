"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SliderNav from "@/components/Home/SliderNav";
import {
  ArrowBigLeftDashIcon,
  ArrowBigRightDashIcon,
  ImageIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SearchSkeleton from "@/components/Skeletons/SearchSkeleton";

const FavoriteAnimePage = () => {
  const [favoriteAnime, setFavoriteAnime] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageInfo, setPageInfo] = useState<any>({});

  const page = parseInt(useSearchParams().get("page")!);

  useEffect(() => {
    getFavoriteAnime();
  }, [page]);

  const getFavoriteAnime = async () => {
    setIsLoading(true);
    const response = await axios.get(
      `/api/anime/favorite?page=${page}&count=20`
    );
    setFavoriteAnime(response.data.result.data.Page.media);
    setPageInfo(response.data.result.data.Page.pageInfo);
    setIsLoading(false);
  };

  return (
    <div className="p-6">
      <SliderNav title="Favorite Anime" icon={ImageIcon} />
      {isLoading && <SearchSkeleton />}
      {!isLoading && (
        <div className="grid grid-cols-7 max-xl:grid-cols-6 max-lg:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-3 max-[400px]:grid-cols-2 gap-5 mt-5">
          {favoriteAnime.map((item) => (
            <Link href={`/search?q=${item.title.romaji ?? item.title.userPreferred}`}>
              <Image
                src={item.coverImage.large}
                alt="favorite"
                width={300}
                height={300}
                className="rounded-lg w-[180px] h-[235px] max-md:w-[160px] max-md:h-[200px]"
              />
              <div className="text-red-600 font-[family-name:var(--font-gilroy-bold)] truncate w-[150px] max-[450px]:w-[100px] max-[400px]:w-full ">
                {item.title.romaji ?? item.title.userPreferred}
              </div>
            </Link>
          ))}
        </div>
      )}
      <hr className="bg-gray-400 h-[2px] my-5"/>
      <div className="flex justify-between items-center mt-5 font-[family-name:var(--font-gilroy-bold)]">
        <div className="bg-red-600 text-white px-4 py-2 rounded-md flex gap-x-2">
          <ArrowBigLeftDashIcon />
          <Link href={`/favorite?page=${page > 1 ? page - 1 : page}`}>
            Prev
          </Link>
        </div>
        <div className="font-[family-name:var(--font-gilroy-medium)] bg-white px-4 py-2 rounded-md">
          {page} OF {pageInfo.lastPage}
        </div>
        <div className="bg-red-600 text-white px-4 py-2 rounded-md flex gap-x-2">
          <Link href={`/favorite?page=${page + 1}`}>
            Next
          </Link>
          <ArrowBigRightDashIcon />
        </div>
      </div>
    </div>
  )
};

export default FavoriteAnimePage;
