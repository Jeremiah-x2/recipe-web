"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-state-hooks";
import { setType } from "@/lib/features/recipes-type/recipesTypeSlice";
import { RootState } from "@/lib/store";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/mousewheel";

const list = [
  "All",
  "Bread",
  "Breakfast",
  "Sauce",
  "Dessert",
  "Appetizer",
  "Salad",
  "Main course",
  "Snack",
  "Fingerfood",
  "Soup",
  "Beverage",
];

export default function RecipesFilterList() {
  const recipeType = useAppSelector(
    (state: RootState) => state.recipeType.value
  );
  const dispatch = useAppDispatch();
  return (
    <Swiper
      slidesPerView={"auto"}
      className=""
      modules={[Mousewheel]}
      mousewheel={{ enabled: true }}
    >
      {list.map((item, index) => (
        <SwiperSlide
          style={{ width: "auto" }}
          key={index}
          className={`inline-block px-5 py-[7px] text-xs ${
            recipeType === item
              ? "bg-primary100 text-white rounded-lg"
              : " text-primary100"
          } text-primary100 font-semibold`}
          onClick={() => dispatch(setType(item))}
        >
          {item}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
