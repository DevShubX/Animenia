import axios from "axios";
import React from "react";
import AnimeWatch from "./_components/AnimeWatch";

const AnimeWatchPage = async ({
  params,
  searchParams,
}: {
  params: { episodeId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  
  const response = await axios.get(
    `http://localhost:3000/api/animeEpisodeLinks?episodeId=${params.episodeId}`
  );

  const response_2 = await axios.get(`http://localhost:3000/api/animeDetails?id=${searchParams?.animeId}`)
  console.log(response.data.result)

  return (
    <div>
      <AnimeWatch data={response.data.result} anilistData={response_2.data.result.anilistResponse} gogoData={response_2.data.result.gogoResponse} animeId={searchParams?.animeId!} />
    </div>
  );
};

export default AnimeWatchPage;
