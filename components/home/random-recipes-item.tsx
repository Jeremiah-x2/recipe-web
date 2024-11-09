"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/mousewheel";
import Image from "next/image";
import Link from "next/link";
import { Mousewheel } from "swiper/modules";

export interface RecipesProp {
  image: string;
  title: string;
  id: string;
  readyInMinutes: string;
}

export default function RandomRecipesItem({
  recipes,
}: {
  recipes: { recipes: RecipesProp[] };
}) {
  return (
    <Swiper
      slidesPerView={"auto"}
      style={{ height: 236 }}
      spaceBetween={15}
      className="-z-10 overflow-visible py-12 flex items-baseline"
      modules={[Mousewheel]}
      mousewheel={{ enabled: true }}
    >
      {recipes.recipes.map((item) => (
        <SwiperSlide
          key={item.id}
          style={{ width: 150, height: 176, overflow: "visible" }}
          className=" flex items-end self-end"
        >
          <Link href={`/details/${item.id}`}>
            <div className="w-[150px] h-[176px] relative bg-gray4 rounded-lg flex flex-col pt-16 px-[10px] pb-[10px]">
              <div className="w-[109px] flex-1 h-[110px] mx-auto absolute top-0 border-2 border-primary100 -translate-y-1/2 bg-gray3 rounded-full left-1/2 -translate-x-1/2 shadow-[0_0_4px_2px_rgba(0,0,0,0.3)]">
                <Image
                  src={item.image}
                  fill={true}
                  alt="Image"
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <p className="font-semibold text-center text-sm line-clamp-2 text-gray1">
                  {item.title}
                </p>
                <div className="flex justify-between items-end">
                  <div className="text-xs">
                    <p className="text-gray3">Time</p>
                    <p className="text-gray1 font-semibold">
                      {item.readyInMinutes} Mins
                    </p>
                  </div>
                  {/* <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white">
                    <BookmarkOutline width={16} height={16} />
                  </div> */}
                  {/* <SaveDeleteRecipe recipeItem={item} /> */}
                </div>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
