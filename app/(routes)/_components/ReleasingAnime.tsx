"use client";
import SliderNav from "@/components/Home/SliderNav";
import { timeUntilAiring } from "@/lib/methods";
import axios from "axios";
import { ChevronDown, ChevronUp, Newspaper } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const ReleasingAnime = () => {
  const [releasingAnime, setReleasingAnime] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chevronIndex, setChevronIndex] = useState<number | null>(0);

  useEffect(() => {
    getReleasingAnime();
  }, []);

  const getReleasingAnime = async () => {
    setIsLoading(true);
    const response = await axios.get("/api/anime/releasing?status=RELEASING");
    setReleasingAnime(response.data.result?.data?.Page?.media);
    setIsLoading(false);
  };

  const toggle = (index: number) => {
    setChevronIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <SliderNav title="Releasing" icon={Newspaper}/>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        releasingAnime?.slice(0, 5)?.map((item, index) => (
          <div className="max-sm:flex max-sm:justify-between max-sm:p-2">
            <div>
              <div className="flex text-red-500 font-[family-name:var(--font-gilroy-bold)] gap-x-3 mt-6 max-sm:mt-2">
                <div>{item.title.romaji ?? item.title.userPreferred}</div>
                <div onClick={() => toggle(index)} className="cursor-pointer">
                  {chevronIndex === index ? <ChevronUp /> : <ChevronDown />}
                </div>
              </div>
              <div className="text-[15px] text-[#696969] font-[family-name:var(--font-gilroy-medium)]">
                {item.genres.slice(0, 3) + ""}
              </div>
              {item?.nextAiringEpisode && (
                <div className='flex items-center gap-x-2'>
                  <div className="text-[15px] text-[#696969] font-[family-name:var(--font-gilroy-medium)]">
                    Airing Ep: {item.nextAiringEpisode?.episode ?? "NA"}
                  </div>
                  <div className="text-[15px] font-[family-name:var(--font-gilroy-medium)]">
                    {timeUntilAiring(item.nextAiringEpisode?.timeUntilAiring)}
                  </div>
                </div>
              )}
            </div>
            <div>
              {chevronIndex === index && (
                <div className="mt-2 mb-2">
                  <Image
                    className="rounded-[20px] w-[200px] max-sm:w-[80px] max-sm:rounded-[10px]"
                    src={item.coverImage.extraLarge}
                    alt="image"
                    width={200}
                    height={300}
                  />
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default ReleasingAnime;
