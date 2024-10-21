"use client";
import SliderNav from "@/components/Home/SliderNav";
import { cn } from "@/lib/methods";
import {
  ChevronDown,
  ChevronUp,
  Image as ImgIcon,
  LinkIcon,
  ScrollText,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaStar, FaYoutube } from "react-icons/fa";

interface AnimeDetailProps {
  gogoData: any;
  anilistData: any;
}

const AnimeDetails = ({ gogoData, anilistData }: AnimeDetailProps) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  console.log(anilistData.malReviews);

  return (
    <div className="p-6 flex flex-shrink-0 w-screen gap-x-5">
      <div className="w-[85%]">
        <div className="bg-white mt-5 p-4 rounded-lg flex items-center justify-between ">
          <div className="flex items-center space-x-2">
            <div className="bg-red-600 flex items-center p-2 rounded-lg">
              <ImgIcon className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl text-red-600 font-bold font-[family-name:var(--font-gilroy-medium)]">
              Anime
            </h1>
          </div>
          <div className="flex text-red-600 items-center align-middle gap-x-2 font-[family-name:var(--font-gilroy-medium)]">
            <div>Add to List</div>
            <ChevronDown />
          </div>
        </div>
        <div className="flex mt-3 gap-x-5">
          <div className="flex flex-col w-[250px]">
            <Image
              src={anilistData.coverImage.large}
              alt="img"
              width={200}
              height={100}
              className="rounded-[10px] h-[350px] w-[250px]"
            />
            <Link
              href={`https://www.youtube.com/watch?v=${anilistData.trailer?.id}`}
              target="_blank"
              className="w-[250px] flex items-center justify-center gap-x-2 mt-3 bg-black text-white text-[18px] p-4 rounded-[10px] font-[family-name:var(--font-gilroy-bold)]"
            >
              <FaYoutube className="text-red-600 w-8 h-8" />
              <div>Watch Trailer</div>
            </Link>
          </div>
          <div className="flex flex-col items-start">
            <div className="text-red-600 text-3xl font-[family-name:var(--font-gilroy-bold)]">
              {anilistData.title.romaji ?? anilistData.title.userPreferred}
            </div>
            <div className="font-[family-name:var(--font-gilroy-medium)] text-[#696969] ">
              {anilistData.genre + ""}
            </div>
            <div className="bg-white flex items-center gap-x-2 p-2 font-bold mt-2 rounded-[5px] font-[family-name:var(--font-gilroy-medium)] text-red-600">
              <FaStar />
              {anilistData.averageScore / 10}
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: anilistData.description }}
              className={cn(
                "mt-4 font-[family-name:var(--font-gilroy-medium)] text-[18px] text-gray-600 overflow-hidden",
                showMore && "h-full",
                !showMore && "h-[220px] max-h-[220px]"
              )}
            />
            <button onClick={() => setShowMore(!showMore)}>
              {!showMore ? (
                <div className="flex items-center justify-center gap-x-1 text-red-600 font-[family-name:var(--font-gilroy-medium)]">
                  <div>Read More</div>
                  <ChevronDown />
                </div>
              ) : (
                <div className="flex items-center justify-center gap-x-1 text-red-600 font-[family-name:var(--font-gilroy-medium)]">
                  <div>Show Less</div>
                  <ChevronUp />
                </div>
              )}
            </button>
          </div>
        </div>
        <div>
          <div className="text-2xl text-red-600 font-[family-name:var(--font-gilroy-bold)] mt-6 ">
            Episodes
          </div>
          <div className="grid grid-cols-7 gap-4 mt-2 max-h-[270px] overflow-y-scroll">
            {anilistData.animeEpisodes.map((item: any, index: number) => (
              <Link
                href={""}
                className="bg-white p-2 hover:bg-red-100 font-[family-name:var(--font-gilroy-medium)] rounded-md"
              >
                Episode {index + 1}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="text-2xl text-red-600 font-[family-name:var(--font-gilroy-bold)] mt-6 ">
            Characters
          </div>
          <div className="flex items-center overflow-scroll gap-x-4">
            {anilistData.characters.edges.map((item: any) => (
              <div className="flex-shrink-0 text-center font-[family-name:var(--font-gilroy-medium)]">
                <Image
                  src={item.node.image.large}
                  alt="role"
                  className="w-[120px] h-[150px] rounded-[5px] object-cover"
                  width={300}
                  height={300}
                />
                <div>{item.role}</div>
                <div className="truncate">
                  {item.node.name.full ?? item.node.name.userPreferred}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full">
        <div>
          <SliderNav icon={LinkIcon} title="External Links" />
          <div>
            {anilistData?.externalLinks?.map((item: any) => (
              <Link href={item?.url} target="_blank">
                <div className="flex items-center gap-x-3 bg-white my-3 p-[6px] rounded-md hover:bg-slate-300">
                  {item.icon ? (
                    <div
                      style={{ backgroundColor: item.color }}
                      className="object-cover p-2 rounded-md"
                    >
                      <Image
                        src={item?.icon ?? ""}
                        alt="icon"
                        width={20}
                        height={20}
                      />
                    </div>
                  ) : (
                    <div className="object-cover p-2 rounded-md bg-blue-300">
                      <LinkIcon className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div className="font-[family-name:var(--font-gilroy-medium)] ">
                    {item?.site}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <SliderNav icon={ScrollText} title="Review" />
          <div className="flex flex-col gap-y-3 mt-4">
            {anilistData.malReviews.slice(0, 5).map((item: any) => (
              <Link href={item.url} target="_blank" className="w-full bg-white cursor-pointer rounded-md p-2 font-[family-name:var(--font-gilroy-medium)]">
                <div className="flex items-center gap-x-3">
                  <Image
                    src={
                      item.user.images.jpg.image_url ??
                      item.user.images.webp.image_url
                    }
                    alt="pfp"
                    width={50}
                    height={50}
                    className="rounded-[50%] w-[30px] h-[30px] object-cover"
                  />
                  <div>{item.user.username}</div>
                </div>
                <div className="mt-2">
                  {item.review.substring(0, 50)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;
