import { db } from "@/lib/db";
import { WishList } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data: WishList = await req.json();
    await db.wishList.delete({
      where: {
        anilistId: data.anilistId,
        userId: data.userId,
      },
    });

    return NextResponse.json({ msg: "Removed Successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Internal Server Error" });
  }
}
