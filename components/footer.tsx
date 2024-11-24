"use client";
import React from "react";
import { BookmarkOutline, Home, User } from "./vectors";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlusSquare } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="fixed z-40 bg-white bottom-0 left-0 w-full  justify-between py-6 px-10 shadow-[0_-4px_8px_rgba(0,0,0,0.3)] rounded-t-2xl">
      <div className="flex max-w-[600px] mx-auto justify-around">
        <Link href={"/"}>
          <Home
            className={`${
              pathname === "/" ? "stroke-primary100" : "stroke-gray4"
            }`}
          />
        </Link>
        <Link href={"/saved-recipes"}>
          <BookmarkOutline />
        </Link>
        <Link href={"/add-recipe"}>
          <PlusSquare
            className={`${
              pathname.startsWith("/add-recipe")
                ? "stroke-primary100"
                : "stroke-gray4"
            }`}
          />
        </Link>
        <Link href={"/profile"}>
          <User
            className={`${
              pathname === "/profile" ? "stroke-primary100" : "stroke-gray4"
            }`}
          />
        </Link>
      </div>
    </div>
  );
}
