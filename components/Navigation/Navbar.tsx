"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStateContext } from "@/GlobalContext/ContextProvider";
import { Bookmark, BookMarked, LayoutGrid, Moon, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter()
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchState, setSearchState] = useState<string>('')
  const { currentUser } = useStateContext();

  const handleSubmit = (query:string) => {
    router.push(`/search?q=${query}`)
  }

  return (
    <nav className="bg-white flex items-center w-full h-full justify-between p-3">
      <Link href='/'>
        <Image
          className="w-[100px] h-[50px]"
          src="/static/animenia-logo.png"
          alt="logo"
          width={100}
          height={100}
        />
      </Link>
      <div className="hidden md:flex space-x-6 font-[family-name:var(--font-gilroy-medium)]">
        <Link href="/" className="hover:text-gray-400">
          Home
        </Link>
        <Link href="#" className="hover:text-gray-400">
          All
        </Link>
        <Link href="#" className="hover:text-gray-400">
          Action
        </Link>
        <Link href="#" className="hover:text-gray-400">
          Genre
        </Link>
        <Link href="/review?page=1" className="hover:text-gray-400">
          Reviews
        </Link>
      </div>
      <div className="relative flex items-center justify-center space-x-3">
        {isSearchOpen && (
          <div className="flex absolute top-[] right-[160px] bg-gray-100 font-[family-name:var(--font-gilroy-medium)] p-2 rounded-[5px] space-x-2 ">
            <Search className="text-gray-500"/>
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-100  outline-none  "
              value={searchState}
              onChange={(e) => setSearchState(e.target.value)}
              onKeyDown={(e) => {
                if(e.key === 'Enter'){
                  handleSubmit(searchState)
                }
              }}
            />
          </div>
        )}
        <div onClick={() => setIsSearchOpen(!isSearchOpen)} className="cursor-pointer ">
          {isSearchOpen ? <X className="text-red-500 w-8 h-8" />: <Search />}
        </div>
        <Moon />
        <Bookmark />
        <Image
          src={currentUser?.photoURL!}
          alt="pfp"
          width={100}
          height={100}
          className="w-10 h-10 rounded-[50%] border-2 border-purple-500 object-cover p-[1px]"
        />
        <LayoutGrid className="hidden max-md:block" />
      </div>
    </nav>
  );
};

export default Navbar;
