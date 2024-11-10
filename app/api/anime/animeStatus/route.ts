import { db } from "@/lib/db";
import { AnimeList } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
  try{
    const userId = req.nextUrl.searchParams.get("userId")!;

    const animeList = await db.animeList.findMany({
      where:{
        userId: userId
      },
    });
    return NextResponse.json({ msg: "Success" , animeList})
  }catch(error){
    console.log(error)
    return NextResponse.json({ msg: "Internal server error"})
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const data: AnimeList = await req.json();
    await db.animeList.upsert({
      where: {
        anilistId: data.anilistId,
        userId: data.userId,
      },
      create: {
        anilistId: data.anilistId,
        userId: data.userId,
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
    return NextResponse.json({ msg: "Status Updated Successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Internal server error" });
  }
}

export async function DELETE(req: NextRequest) {
  try{
    const anilistId = req.nextUrl.searchParams.get("anilistId")!;
    const userId = req.nextUrl.searchParams.get("userId")!;
    await db.animeList.delete({
      where:{
        anilistId:parseInt(anilistId),
        userId: userId,
      }
    })
    return NextResponse.json({ msg: "Succesully Deleted"})
  }catch(error){
    console.log(error);
    return NextResponse.json({ msg: "Internal server error" });
  }
}