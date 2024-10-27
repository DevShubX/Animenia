"use client";
import SliderNav from "@/components/Home/SliderNav";
import axios from "axios";
import { Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ReviewAnime = () => {
  const [reviewAnime, setReviewAnime] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getAnimeReview();
  }, []);

  const getAnimeReview = async () => {
    setIsLoading(true);
    const response = await axios.get("/api/anime/review?type=ANIME&count=5");
    setReviewAnime(response.data.result.data.Page.reviews);
    setIsLoading(false);
  };
  return (
    <>
      <SliderNav icon={Video} title="Reviews" />
      {isLoading ? (
        <div>Loading.....</div>
      ) : (
        reviewAnime.map((item) => (
          <Link href={`/review/${item.id}`} className="relative font-[family-name:var(--font-gilroy-medium)]">
            <Image
              className=" w-full h-[150px] my-4 rounded-[10px] object-cover cursor-pointer"
              src={item.media.bannerImage}
              alt="image"
              width={600}
              height={600}
            />
            <div className="animeReviewcard w-full absolute bottom-0 p-2 text-white line-clamp-1">
                {item.summary}
            </div>
          </Link>
        ))
      )}
    </>
  );
};

export default ReviewAnime;
