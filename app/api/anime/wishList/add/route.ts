import { db } from "@/lib/db";
import { WishList } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data: WishList = await req.json();
    await db.wishList.create({
      data: {
        anilistId: data.anilistId,
        anilistTitle: data.anilistTitle!,
        animeId: data.animeId,
        coverImage: data.coverImage!,
        userId: data.userId,
      },
    });

    return NextResponse.json({ msg: "Added Successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Internal Server Error" });
  }
}
