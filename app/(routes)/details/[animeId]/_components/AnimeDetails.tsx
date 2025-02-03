"use client";
import EpisodeSection from "@/components/Anime/EpisodeSection";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useStateContext } from "@/GlobalContext/ContextProvider";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { WishList } from "@prisma/client";

interface AnimeDetailProps {
  anilistData: any;
  animeId: string;
  status: string;
  wishlist: WishList;
}

export const AddtoListColors: any = {
  thrown: "text-red-600",
  viewed: "text-blue-600",
  currently_watching: "text-yellow-600",
  will_watch: "text-purple-600",
};

const AnimeDetails = ({
  anilistData,
  animeId,
  status,
  wishlist,
}: AnimeDetailProps) => {
  const { currentUser } = useStateContext();
  const router = useRouter();

  const [showMore, setShowMore] = useState<boolean>(false);
  const [animeStatus, setAnimeStatus] = useState<string>(status || "");

  const updateAnimeStatus = async (status: string) => {
    const animeData = {
      anilistId: anilistData.id,
      genres: anilistData.genres,
      episodesNumber: anilistData.numOfEpisodes,
      anilistTitle: anilistData.title,
      coverImage: anilistData.coverImage,
      status: status,
      userId: currentUser?.uid,
    };

    const promise = axios.patch("/api/anime/animeStatus", animeData);
    toast
      .promise(promise, {
        success: "Updated Status Successfully",
        loading: "Updating Status",
        error: "Error Updating Status",
      })
      .then(() => {
        router.refresh();
      });
  };

  const updateWishList = async () => {
    const animeData = {
      anilistId: anilistData.id,
      animeId: animeId,
      anilistTitle: anilistData.title,
      coverImage: anilistData.coverImage,
      userId: currentUser?.uid,
    };

    if (wishlist) {
      const removePromise = axios.post("/api/anime/wishList/remove", animeData);
      toast.promise(removePromise, {
        success: "Removed from Wishlist",
        loading: "Updating Wishlist",
        error: "Error Updating Wishlist",
      });
    } else {
      const addPromise = axios.post("/api/anime/wishList/add", animeData);
      toast.promise(addPromise, {
        success: "Wishlist Updated",
        loading: "Updating Wishlist",
        error: "Error Updating Wishlist",
      });
    }

    router.refresh();
  };

  return (
    <div className="p-6 max-md:p-3 flex flex-shrink-0 gap-x-5 max-lg:block">
      <div className="w-[85%] max-lg:w-full">
        <div className="dark:bg-[#333333] bg-white mt-5 p-4 rounded-lg flex items-center justify-between ">
          <div className="flex items-center space-x-2">
            <div className="bg-red-600 flex items-center p-2 rounded-lg">
              <ImgIcon className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl text-red-600 font-bold font-[family-name:var(--font-gilroy-medium)]">
              Anime
            </h1>
          </div>
          <Select
            value={animeStatus}
            onValueChange={(value) => {
              setAnimeStatus(value);
              updateAnimeStatus(value);
            }}
          >
            <SelectTrigger
              className={cn(
                "w-min border-none outline-none ring-0 focus:ring-0 shadow-none font-[family-name:var(--font-gilroy-medium)] text-red-600 ",
                AddtoListColors[animeStatus]
              )}
            >
              <SelectValue placeholder="Add to List" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thrown" className="text-red-600">
                Thrown
              </SelectItem>
              <SelectItem value="viewed" className="text-blue-600">
                Viewed
              </SelectItem>
              <SelectItem
                value="currently_watching"
                className="text-yellow-600"
              >
                Currently Watching
              </SelectItem>
              <SelectItem value="will_watch" className="text-purple-600">
                Will Watch
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex mt-3 gap-x-5 max-md:flex-col">
          <div className="flex flex-col w-[250px] max-md:w-full max-md:items-center">
            <div className="relative">
              <Image
                src={anilistData.coverImage.large}
                alt="img"
                width={200}
                height={100}
                className="rounded-[10px] h-[350px] w-[250px]"
              />
              <div
                className="bg-white/90 rounded-lg absolute top-4 right-4 p-2 cursor-pointer"
                onClick={updateWishList}
              >
                {wishlist ? (
                  <IoBookmark className="text-red-600 text-2xl" />
                ) : (
                  <IoBookmarkOutline className="text-red-600 text-2xl" />
                )}
              </div>
            </div>
            <Link
              href={`https://www.youtube.com/watch?v=${anilistData.trailer?.id}`}
              target="_blank"
              className=" w-[250px] flex items-center justify-center gap-x-2 mt-3 bg-black text-white text-[18px] p-4 rounded-[10px] font-[family-name:var(--font-gilroy-bold)]"
            >
              <FaYoutube className="text-red-600 w-8 h-8" />
              <div>Watch Trailer</div>
            </Link>
          </div>
          <div className="flex flex-col items-start max-md:mt-3">
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
                "mt-4 font-[family-name:var(--font-gilroy-medium)] text-[18px] dark:text-gray-400 text-gray-600 overflow-hidden",
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
          <EpisodeSection
            anilistData={anilistData}
            animeId={animeId}
          />
        </div>
        <div>
          <div className="text-2xl text-red-600 font-[family-name:var(--font-gilroy-bold)] mt-6 ">
            Characters
          </div>
          <div className="flex items-center overflow-scroll gap-x-4">
            {anilistData.characters.edges.map((item: any, index: any) => (
              <div
                key={index}
                className="flex-shrink-0 text-center font-[family-name:var(--font-gilroy-medium)]"
              >
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
        <div>
          <div className="text-2xl text-red-600 font-[family-name:var(--font-gilroy-bold)] mt-6 ">
            Recommendations
          </div>
          <div className="flex overflow-scroll gap-x-5 mt-2">
            {anilistData.recommendations.edges.map((item: any, index: any) => (
              <Link
                key={index}
                href={`/search?q=${
                  item.node.mediaRecommendation.title.romaji ??
                  item.node.mediaRecommendation.title.userpreferred
                }`}
                className="flex-shrink-0 w-[160px]"
              >
                <Image
                  src={item.node.mediaRecommendation.coverImage.large}
                  alt="image"
                  width={200}
                  height={200}
                  className="w-[160px] h-[235px] rounded-md"
                />
                <div className="text-red-400 truncate font-[family-name:var(--font-gilroy-bold)]">
                  {item.node.mediaRecommendation.title.romaji ??
                    item.node.mediaRecommendation.title.userpreferred}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full">
        <div>
          <SliderNav icon={LinkIcon} title="External Links" />
          <div>
            {anilistData?.externalLinks?.map((item: any, index: any) => (
              <Link key={index} href={item?.url} target="_blank">
                <div className="flex items-center gap-x-3 dark:bg-[#333333] dark:hover:bg-gray-500 bg-white my-3 p-[6px] rounded-md hover:bg-slate-300">
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
            {anilistData.malReviews.slice(0, 5).map((item: any, index: any) => (
              <Link
                key={index}
                href={item.url}
                target="_blank"
                className="w-full dark:bg-[#333333] dark:hover:bg-gray-500 bg-white cursor-pointer rounded-md p-2 font-[family-name:var(--font-gilroy-medium)]"
              >
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
                <div className="mt-2">{item.review.substring(0, 50)}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;
