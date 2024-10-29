"use client";
import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import {
  BookmarkIcon,
  HomeIcon,
  LayoutGrid,
  LogOutIcon,
  NewspaperIcon,
  Search,
  UserIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const RouteSidebar_1 = [
  {
    id: 1,
    icon: HomeIcon,
    name: "Home",
    href: "/",
  },
  {
    id: 2,
    icon: BookmarkIcon,
    name: "Wishlist",
    href: "/wishlist",
  },
  {
    id: 3,
    icon: NewspaperIcon,
    name: "Reviews",
    href: "/review?page=1",
  },
];

const MobileNav = () => {
  const router = useRouter();
  const [searchState, setSearchState] = useState<string>("");
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  
  const onSignOut = async() =>{
    await signOut(auth);
    router.replace("/sign-in")
  }
  const handleSubmit = (query: string) => {
    setIsSheetOpen(false);
    setSearchState("");
    router.push(`/search?q=${query}`);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger>
        <LayoutGrid className="hidden max-md:block" />
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>
          <Link href="/">
            <Image
              className="w-[100px] h-[50px] bottom-5 relative"
              src="/static/animenia-logo.png"
              alt="logo"
              width={100}
              height={100}
            />
          </Link>
        </SheetTitle>
        <div className="flex bg-gray-100 font-[family-name:var(--font-gilroy-medium)] p-2 rounded-[5px] space-x-2 ">
          <Search className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-100  outline-none  "
            value={searchState}
            onChange={(e) => setSearchState(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(searchState);
              }
            }}
          />
        </div>
        <div className="flex flex-col gap-y-6 mt-6">
          {RouteSidebar_1.map((item) => (
            <Link
              href={item.href}
              className="flex items-center gap-4 font-[family-name:var(--font-gilroy-medium)]"
              onClick={() => setIsSheetOpen(false)}
            >
              <div>
                <item.icon className="w-7 h-7" />
              </div>
              <div className="text-[17px]">{item.name}</div>
            </Link>
          ))}
        </div>
        <hr className="my-6 h-[1px] bg-gray-300" />
        <div className="flex flex-col gap-y-6 mt-6">
          <Link
            href="/account"
            className="flex items-center gap-4 font-[family-name:var(--font-gilroy-medium)] "
            onClick={() => setIsSheetOpen(false)}
          >
            <UserIcon className="w-7 h-7" />
            <div className="text-[17px]">Account</div>
          </Link>
          <div className="flex items-center gap-4 font-[family-name:var(--font-gilroy-medium)]" onClick={onSignOut}>
            <LogOutIcon className="w-7 h-7" />
            <div className="text-[17px]">Logout</div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
