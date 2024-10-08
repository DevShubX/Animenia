import React from 'react'
import { BsArrowRightSquareFill } from "react-icons/bs";
import { Image } from "lucide-react";
import Link from "next/link";

interface SliderNavProps{
    title: string,
    href: string
}

const SliderNav = ({title , href}:SliderNavProps) => {
  return (
    <div className="bg-white mt-5 p-4 rounded-lg flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-red-600 flex items-center p-2 rounded-lg">
            <Image className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl text-red-600 font-bold font-[family-name:var(--font-gilroy-medium)]">
            {title}
          </h1>
        </div>
        <div>
          <Link
            href={href}
            className="text-red-600 flex items-center align-middle gap-x-2 font-[family-name:var(--font-gilroy-medium)]"
          >
            View More
            <BsArrowRightSquareFill className="w-6 h-6" />
          </Link>
        </div>
      </div>
  )
}

export default SliderNav