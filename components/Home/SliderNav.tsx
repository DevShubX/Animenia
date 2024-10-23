import React from 'react'
import { BsArrowRightSquareFill } from "react-icons/bs";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface SliderNavProps{
  icon: LucideIcon,
  title: string,
  href?: string,
  path?: string,
  subTitle?: string
}

const SliderNav = ({icon:Icon , title , href , path , subTitle}:SliderNavProps) => {
  return (
    <div className="bg-white mt-5 p-4 rounded-lg flex items-center justify-between w-full">
        <div className="flex items-center space-x-2">
          <div className="bg-red-600 flex items-center p-2 rounded-lg">
            <Icon className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl text-red-600 font-bold font-[family-name:var(--font-gilroy-medium)] ">
            {title}
          </h1>
        </div>
        <div>
          {href && (
            <Link
              href={href}
              className="text-red-600 flex items-center align-middle gap-x-2 font-[family-name:var(--font-gilroy-medium)]"
            >
              View More
              <BsArrowRightSquareFill className="w-6 h-6" />
            </Link>
          )}
        </div>
          {path && (
            <Link
              href={path}
              className="text-red-600 flex items-center align-middle gap-x-2 font-[family-name:var(--font-gilroy-medium)]"
            >
              {subTitle}
              <BsArrowRightSquareFill className="w-6 h-6" />
            </Link>
          )}
      </div>
  )
}

export default SliderNav