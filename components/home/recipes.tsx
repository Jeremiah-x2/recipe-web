"use client";
import { useState } from "react";
import { recipesOffline } from "@/lib/recipes";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

export default function Recipes() {
  const [num, setNum] = useState<number>(20);
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 justify-items-center gap-y-4">
        {recipesOffline.recipes.slice(1, num).map((item) => (
          <Link
            href={`/details/${item.id}`}
            key={item.id}
            className="w-[150px] bg-gray flex flex-col space-y-4 pb4 rounded-lg overflow-hidden shadow-[0px_4px_3px_rgba(0,0,0,0.4)]"
          >
            <div className="w-full h-[150px] relative rounded-lg overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src={item.image!}
                  fill={true}
                  alt="Recipe photo"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full px-2 py-4 bg-secondary60 flex-1">
              <p className="line-clamp-2 font-semibold text-sm">{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
      <Button onClick={() => setNum((prev: number) => prev + 20)}>
        See More
      </Button>
    </div>
  );
}
