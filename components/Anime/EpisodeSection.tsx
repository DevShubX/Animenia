'use client'
import { database } from "@/firebase/firebase";
import { useStateContext } from "@/GlobalContext/ContextProvider";
import { get, ref, set } from "firebase/database";
import Link from "next/link";
import React from "react";

interface EpisodeSectionProps {
  anilistData: any;
  animeId: string,
}

const EpisodeSection = ({ anilistData, animeId }: EpisodeSectionProps) => {
    const { currentUser } = useStateContext();

    const updateContineWatching = (animeWatchLink:string , animeEpisodeId:string) => {
        const animeData = {
            id: anilistData.id,
            title: anilistData.title,
            coverImage: anilistData.anilistPoster,
            animeId: animeId,
        }
        const db = database;
        const dbRef = ref(db,`users/${currentUser?.uid}/continueWatching/animes`);
        let arr: any[] = [];
        get(ref(db,`users/${currentUser?.uid}/continueWatching/animes/anime_arr`)).then(async (snapshot) => {
            if(snapshot.exists()){
                snapshot.forEach((snap) => {
                    if(snap.val().id !== anilistData.id){
                        arr.push(snap.val())
                    }
                });
                arr.push({...animeData,animeWatchLink,animeEpisodeId});
                set(dbRef,{
                    anime_arr: arr
                });
            }else{
                arr.push({...animeData,animeWatchLink,animeEpisodeId});
                set(dbRef,{
                    anime_arr: arr
                });
            }
        })
    }

  return (
    <div>
      <div className="text-2xl text-red-600 font-[family-name:var(--font-gilroy-bold)] mt-6 ">
        Episodes
      </div>
      <div className="grid grid-cols-7 gap-4 max-lg:grid-cols-6 max-md:grid-cols-4 max-sm:grid-cols-3 mt-2 max-h-[270px] overflow-y-scroll">
        {anilistData?.animeEpisodes?.map((url: any, index: number) => (
          <Link 
            onClick={() => updateContineWatching(`/watch/${url}?animeId=${animeId}`,url)}
            key={index}
            href={`/watch/${url}?animeId=${animeId}`}
            className="dark:bg-[#333333] dark:hover:bg-gray-500 bg-white whitespace-nowrap p-2 hover:bg-red-100 font-[family-name:var(--font-gilroy-medium)] rounded-md"
          >
            Episode {index + 1}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EpisodeSection;
