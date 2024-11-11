"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import SliderNav from "@/components/Home/SliderNav";
import { useStateContext } from "@/GlobalContext/ContextProvider";
import {
  FolderClosedIcon,
  LogOutIcon,
  PenLine,
  Trash2Icon,
  User2Icon,
} from "lucide-react";
import { uploadImageToFirebase } from "@/lib/firebaseMethods";
import { signOut, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { AnimeList } from "@prisma/client";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/methods";
import { AddtoListColors } from "../details/[animeId]/_components/AnimeDetails";
import Link from "next/link";
import { auth } from "@/firebase/firebase";

const AccountsPage = () => {
  const router = useRouter();
  const { currentUser } = useStateContext();

  const [animeList, setAnimeList] = useState<AnimeList[]>([]);

  useEffect(() => {
    if (currentUser) getAnimeListDetails();
  }, [currentUser]);

  const getAnimeListDetails = async () => {
    const response = await axios.get(
      `/api/anime/animeStatus?userId=${currentUser?.uid}`
    );
    setAnimeList(response.data.animeList);
  };

  const updateAnimeStatus = async (status: string, data: AnimeList) => {
    const animeData = {
      ...data,
      status: status,
    };

    const promise = axios.patch("/api/anime/animeStatus", animeData);
    toast
      .promise(promise, {
        success: "Updated Status Successfully",
        loading: "Updating Status",
        error: "Error Updating Status",
      })
      .then(() => {
        getAnimeListDetails();
      });
  };

  const updateProfilePic = async (e: any) => {
    const file = e.target.files[0];
    const photoUrl = await uploadImageToFirebase(file);
    if (!photoUrl) return;
    await updateProfile(currentUser!, {
      photoURL: photoUrl,
    }).then(() => {
      router.refresh();
    });
  };

  const deleteAnimeList = async (data: AnimeList) => {
    const promise = axios.delete(
      `/api/anime/animeStatus?anilistId=${data.anilistId}&userId=${data.userId}`
    );
    toast
      .promise(promise, {
        success: "Anime Deleted Successfully",
        loading: "Deleting Anime",
        error: "Error Deleting Anime",
      })
      .then(() => {
        getAnimeListDetails();
      });
  };

  const onSignOut = async () => {
    await signOut(auth);
    router.replace("/sign-in");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-1/2 max-lg:w-full p-6">
        <div>
          <SliderNav title="Account" icon={User2Icon} />
          <div className="flex justify-between items-center mx-5">
            <div className="flex gap-x-4 my-4">
              <div className="relative flex justify-center items-center w-[100px] h-[100px] rounded-[50%]">
                <Image
                  src={currentUser?.photoURL!}
                  alt="pfp"
                  width={100}
                  height={100}
                  className="w-[100px] h-[100px] rounded-[50%] object-cover"
                />
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    toast.promise(updateProfilePic(e), {
                      loading: "Updating Profile Pic...",
                      success: "Profile Pic Updated ✅",
                      error: "Error Updating Profile Pic ❌",
                    });
                  }}
                />
                <label
                  htmlFor="profileImage"
                  className="absolute bottom-0 right-0 outline-none rounded-[50%] p-1 bg-slate-200 cursor-pointer"
                >
                  <PenLine className="text-red-500 w-4 h-4" />
                </label>
              </div>
              <div className="flex flex-col gap-2 mt-4 ">
                <div className="text-red-600  text-2xl font-[family-name:var(--font-gilroy-bold)]">
                  {currentUser?.displayName}
                </div>
                <div className="font-[family-name:var(--font-gilroy-medium)] ">
                  {currentUser?.email}
                </div>
              </div>
            </div>
            <button
              className="border border-red-600 dark:border-white dark:text-white rounded-lg text-red-600 p-4 flex items-center gap-2"
              onClick={onSignOut}
            >
              <LogOutIcon />
              Logout
            </button>
          </div>
        </div>
        <div>
          <SliderNav title="Anime List" icon={FolderClosedIcon} />
          <div>
            {animeList.map((item) => (
              <div className="flex bg-white dark:bg-[#363636] my-3 p-2 rounded-lg justify-between ">
                <div className="flex items-start">
                  <Image
                    src={(item.coverImage as any)["large"]!}
                    alt="Image"
                    width={200}
                    height={200}
                    className="w-[100px] h-[150px] rounded-sm max-md:hidden"
                  />
                  <div className="m-8 flex flex-col gap-1 max-sm:m-2">
                    <div className="text-red-600 dark:text-white text-[18px] font-[family-name:var(--font-gilroy-bold)]">
                      {(item.anilistTitle as any)["romaji"]}
                    </div>
                    <div className="max-md:hidden text-gray-500 dark:text-white/70 font-[family-name:var(--font-gilroy-medium)]">
                      {item.genres + " "}
                    </div>
                    <div className="text-gray-500 dark:text-white/70 font-[family-name:var(--font-gilroy-medium)]">
                      <span>Episode : </span>
                      {item.episodesNumber}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-4">
                  <Select
                    value={item.status}
                    onValueChange={(status) => updateAnimeStatus(status, item)}
                  >
                    <SelectTrigger
                      className={cn(
                        "w-min border-none outline-none ring-0 focus:ring-0 shadow-none font-[family-name:var(--font-gilroy-medium)] text-red-600 ",
                        AddtoListColors[item.status]
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
                      <SelectItem
                        value="will_watch"
                        className="text-purple-600"
                      >
                        Will Watch
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <div
                    onClick={() => deleteAnimeList(item)}
                    className="bg-red-300 dark:bg-[#606060] w-full h-full p-6 rounded-lg flex items-center cursor-pointer"
                  >
                    <Trash2Icon className="text-red-600 dark:text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;
