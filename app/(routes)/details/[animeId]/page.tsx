import React from "react";
import AnimeDetails from "./_components/AnimeDetails";
import axios from "axios";
import { db } from "@/lib/db";

const AnimeDetailsPage = async ({
  params,
  searchParams,
}: {
  params: { animeId: string };
  searchParams: { [key: string] : string | undefined }
}) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/animeDetails?id=${params.animeId}`
  );
  
  const anilistId = response.data.result.anilistResponse.id;

  const animeStatus = await db.animeList.findUnique({
    where: {
      anilistId: anilistId,
      userId:searchParams.userId
    },
    select: {
      status: true,
    },
  });

  const wishList = await db.wishList.findUnique({
    where: {
      userId:searchParams.userId,
      anilistId: anilistId,
    },
  })

  return (
    <div>
      <AnimeDetails
        anilistData={response.data.result.anilistResponse}
        animeId={params.animeId}
        status={animeStatus?.status!}
        wishlist={wishList!}
      />
    </div>
  );
};

export default AnimeDetailsPage;
