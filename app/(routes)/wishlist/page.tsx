import SliderNav from "@/components/Home/SliderNav";
import { db } from "@/lib/db";
import { Bookmark } from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoBookmark } from "react-icons/io5";

const WishlistPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const wishlist = await db.wishList.findMany({
    where: {
      userId: searchParams.userId,
    },
  });
  return (
    <div className="p-6">
      <SliderNav title="Wishlist" icon={Bookmark} />
      <div className="grid grid-cols-7 gap-y-7 gap-x-5 mt-5 max-2xl:grid-cols-6 max-xl:grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2">
        {wishlist.map((item) => (
          <Link href={`/details/${item.animeId}?userId=${item.userId}`}>
            <Image
              className="h-[300px] rounded-[10px] object-cover max-md:h-[210px] max-md:w-[160px]"
              src={(item.coverImage as any).large}
              alt="image"
              width={200}
              height={200}
            />
            <div className="font-[family-name:var(--font-gilroy-medium)] text-xl mt-2 max-w-[200px] truncate">
              {(item.anilistTitle as any).romaji ||
                (item.anilistTitle as any).native}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
