"use client";
import SearchSkeleton from "@/components/Skeletons/SearchSkeleton";
import { useStateContext } from "@/GlobalContext/ContextProvider";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchPage = () => {
  const { currentUser } = useStateContext();
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const query = useSearchParams().get("q");

  useEffect(() => {
    searchAnime();
  }, [query]);

  const searchAnime = async () => {
    setIsLoading(true);
    const response = await axios.get(`/api/search?name=${query}`);
    setSearchResult(response.data.result);
    setIsLoading(false);
  };

  return (
    <div className="p-6 h-screen">
      <div className="font-[family-name:var(--font-gilroy-medium)] text-2xl">
        Search Result for: <span className="capitalize italic">{query}</span>{" "}
      </div>
      {isLoading ? (
        <SearchSkeleton />
      ) : (
        <div className="grid grid-cols-7 gap-y-5 mt-5 max-2xl:grid-cols-6 max-xl:grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2">
          {searchResult.map((item,index) => (
            <Link key={index} href={`/details/${item.animeId}?userId=${currentUser?.uid}`}>
              <Image
                className="h-[300px] rounded-[10px] object-cover max-md:h-[210px] max-md:w-[160px]"
                src={item.image}
                alt="image"
                width={200}
                height={200}
              />
              <div className="font-[family-name:var(--font-gilroy-medium)] text-xl mt-2 max-w-[200px] truncate">
                {item.title}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
