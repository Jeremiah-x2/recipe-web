"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Timer } from "../vectors";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/mousewheel";

export default function NewRecipes() {
  const { data: recipes, isLoading } = useFetch("/random", "number=8");
  return (
    <main className="mt-5 space-y-16 overflow-x-hidden">
      <p className="font-semibold text-lg text-secondary100">New Recipes</p>
      {recipes && (
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={16}
          style={{ overflow: "visible" }}
          className="h-[140px] overflow-visible scroll no-scrollbar"
          modules={[Mousewheel]}
          mousewheel={{ enabled: true }}
        >
          {recipes &&
            recipes?.recipes.map((recipe) => (
              <SwiperSlide
                key={recipe.id}
                style={{ width: 251, height: 91, overflow: "visible" }}
                className="bg-white rounded-lg border-2 px-[10px] pb-[10px] overflow-visible shadow-[0_0_8px_rgba(0,0,0,0.2)] border-primary80"
              >
                <div className="w-full h-full flex flex-col justify-between overflow-visible">
                  <div className="text-sm relative overflow-visible py-[10px]">
                    <p className="line-clamp-1 w-8/12 font-semibold">
                      {recipe.title}
                    </p>
                    <div className="absolute bg-gray4 w-[80px] overflow-visible h-[80px] border-2 border-primary100 rounded-full top-0 right-0 -translate-y-1/2 z-40 shadow-[0_0_8px_rgba(0,0,0,0.5)]">
                      <Image
                        src={recipe.image}
                        fill={true}
                        alt="img"
                        className="rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="text-xs">Rating</div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 text-gray3 text-xs items-center">
                      <span className="inline-block w-6 h-6 bg-gray2 rounded-full"></span>{" "}
                      <p>Author/Chef</p>
                    </div>
                    <div className="text-xs text-gray3 flex items-center gap-2">
                      <Timer /> {recipe.readyInMinutes} mins
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      )}

      {isLoading && (
        <Swiper>
          {new Array(3).fill(null).map((item, index) => (
            <SwiperSlide
              key={index}
              style={{ width: 251, height: 91, overflow: "visible" }}
            >
              <Skeleton className="w-[251px] h-[91px]" />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </main>
  );
}
