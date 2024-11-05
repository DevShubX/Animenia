import { db } from "@/lib/db";
import { AnimeList } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const data: AnimeList = await req.json();
    const updateData = await db.animeList.upsert({
      where: {
        anilistId: data.anilistId.toString(),
      },
      create: {
        anilistId: data.anilistId.toString(),
        genres: data.genres,
        episodesNumber: data.episodesNumber,
        anilistTitle: data.anilistTitle!,
        coverImage: data.coverImage!,
        status: data.status,
      },
      update: {
        status: data.status,
      },
    });
    console.log(updateData);
    return NextResponse.json({ msg: "Status Updated Successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Internal server error" });
  }
}
