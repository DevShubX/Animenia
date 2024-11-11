import { parseReviewData } from "@/lib/methods";
import axios from "axios";
import Image from "next/image";
import React from "react";

const ReviewPage = async ({ params }: { params: { reviewId: string } }) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/anime/review/${params.reviewId}`
  );
  const anilistData = response.data.result.data.Page.reviews[0];

  return (
    <div className="h-screen">
      <div className="relative p-4 max-lg:p-0 ">
        <div className="relative">
          <Image
            src={anilistData.media.bannerImage ?? "/static/noImage.jfif"}
            alt="image"
            width={2000}
            height={2000}
            className="rounded-md drop-shadow-[0_0_10px_rgba(0,0,0,0.5)] h-[600px] object-cover"
          />
          <div className="wrapper absolute top-0 text-center w-full h-full">
            <div className=" text-white relative top-[120px] text-6xl max-md:text-3xl font-[family-name:var(--font-gilroy-bold)]">
              {anilistData.media.title.romaji ??
                anilistData.media.title.userpreferred}
            </div>
          </div>
        </div>
        <div className="flex justify-center ">
          <div className="absolute top-[300px] max-lg:m-4 ">
            <div
              dangerouslySetInnerHTML={{
                __html: parseReviewData(anilistData.body),
              }}
              className="w-[900px] max-lg:w-full p-10 max-sm:p-5 bg-white rounded-md font-[family-name:var(--font-gilroy-medium)] dark:text-black"
            ></div>
            <div
              className="relative w-min bottom-8 left-[45%] max-md:bottom-5 max-md:left-[40%] max-[400px]:left-[35%] rounded-md text-white text-5xl font-[family-name:var(--font-gilroy-regular)] p-4 bg-red-600"
              style={{
                backgroundColor: `${
                  anilistData.media.coverImage.color ?? "red"
                } `,
              }}
            >
              {anilistData.score}
              <span className="text-[16px]">/100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
