"use client";
import SliderNav from "@/components/Home/SliderNav";
import ReviewSkeleton from "@/components/Skeletons/ReviewSkeleton";
import axios from "axios";
import {
  ArrowBigLeftDashIcon,
  ArrowBigRightDashIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const AnimeReviewPage = () => {
  const [reviewAnime, setReviewAnime] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageInfo, setPageInfo] = useState<any>({});

  const page = parseInt(useSearchParams().get("page")!);

  useEffect(() => {
    getReviewAnime();
  }, [page]);

  const getReviewAnime = async () => {
    setIsLoading(true);
    const response = await axios.get(
      `/api/anime/review?type=ANIME&page=${page}&count=50`
    );
    setReviewAnime(response.data.result?.data?.Page?.reviews);
    setPageInfo(response.data.result?.data?.Page?.pageInfo);
    setIsLoading(false);
  };
  return (
    <div className="p-6 ">
      <SliderNav title="Reviews" icon={StarIcon} />
      {isLoading && <ReviewSkeleton />}
      {!isLoading && (
        <div className="grid grid-cols-5 gap-8 my-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {reviewAnime.map((item: any, index: number) => (
            <Link key={index} href={`review/${item.id}`}>
              <Image
                src={item?.media?.bannerImage ?? "/static/noImage.jfif"}
                alt="Review"
                width={1000}
                height={1000}
                className=" w-full h-[100px] object-cover rounded-tl-md rounded-tr-md"
              />
              <div className="dark:bg-[#333333] bg-white p-3 h-[100px] font-[family-name:var(--font-gilroy-medium)]">
                <div className="text-red-600 text-[17px] break-words truncate">
                  <span>Review of </span>
                  {item.media?.title?.romaji ??
                    item.media?.title?.userPreferred}
                </div>
                <div className="dark:text-gray-400 text-gray-500 line-clamp-2">
                  {item?.summary}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      <hr className="bg-gray-400 h-[2px] my-5" />
      <div className="flex justify-between items-center mt-5 font-[family-name:var(--font-gilroy-bold)]">
        <div className="bg-red-600 text-white px-4 py-2 rounded-md flex gap-x-2">
          <ArrowBigLeftDashIcon />
          <Link href={`/review?page=${page > 1 ? page - 1 : page}`}>Prev</Link>
        </div>
        <div className="font-[family-name:var(--font-gilroy-medium)] dark:bg-black bg-white px-4 py-2 rounded-md">
          {page} OF {pageInfo?.lastPage}
        </div>
        <div className="bg-red-600 text-white px-4 py-2 rounded-md flex gap-x-2">
          <Link href={`/review?page=${page + 1}`}>Next</Link>
          <ArrowBigRightDashIcon />
        </div>
      </div>
    </div>
  );
};

export default AnimeReviewPage;
