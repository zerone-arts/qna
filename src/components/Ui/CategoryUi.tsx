"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const categoryArr = ["Frontend", "Algorithm", "Data Structure"];

export default function CategoryUi() {
  const [categoryHover, setCategoryHover] = useState(false);
  const pathname = usePathname().replace("/", "");
  return (
    <div
      className="fixed w-[150px] h-[90px] top-[50px] left-[10px] text-white"
      onMouseEnter={() => setCategoryHover(true)}
      onMouseLeave={() => setCategoryHover(false)}
    >
      <ul
        className={`absolute duration-200 ${
          categoryHover ? "opacity-0" : "opacity-1"
        }`}
      >
        {categoryArr.map((item) => {
          const isActive = pathname === item.replace(/\s/g, "").toLowerCase();
          return (
            <li
              key={item}
              className="h-[30px] flex items-center justify-center"
            >
              <span
                className={`w-[10px] h-[3px] ${
                  isActive ? "bg-gray-100" : "bg-zinc-600"
                }`}
              ></span>
            </li>
          );
        })}
      </ul>

      <ul
        className={`absolute duration-200 ${
          categoryHover ? "opacity-1" : "opacity-0"
        }`}
      >
        {categoryArr.map((item) => {
          const category = item.replace(/\s/g, "").toLowerCase();
          const selectedClass =
            pathname === category ? "text-gray-100" : "text-zinc-600";
          return (
            <li
              key={item}
              className={`h-[30px] flex items-center justify-start hover:text-gray-100 duration-150 ${selectedClass}`}
            >
              <Link href={`/${category}`}>{item}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
