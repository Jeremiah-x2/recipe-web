"use client";
import React from "react";
import RandomRecipesItem from "./random-recipes-item";
// import Cookies from "js-cookie";
import useFetch from "@/hooks/useFetch";
// import { Swiper } from "swiper/react";
import { Skeleton } from "../ui/skeleton";
import { useAppSelector } from "@/hooks/redux-state-hooks";
import { RootState } from "@/lib/store";

// async function getRandomRecipes() {
//   try {
//     const res: Response = await fetch(
//       `https://api.spoonacular.com/recipes/random?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR}&number=8`
//     );
//     const data = await res.json();

//     Cookies.set("recipes", JSON.stringify(data));
//     console.log("data", data);
//   } catch (error) {
//     console.log("Random recipes error", error.message);
//   }
// }
export default function RandomRecipes() {
  const recipeType = useAppSelector(
    (state: RootState) => state.recipeType.value
  );
  const { data, isLoading } = useFetch(
    "random",
    recipeType === "All"
      ? "number=5"
      : `type=${recipeType.toLowerCase()}&number=5`
  );
  return (
    <div className="mt-4 min-h-[150px]">
      {data && <RandomRecipesItem recipes={data} />}
      {isLoading && (
        <div className="flex gap-[10px] overflow-auto w-full">
          {new Array(3).fill(null).map((item, index) => (
            <Skeleton key={index} className="w-[150px] h-[236px]"></Skeleton>
          ))}
        </div>
      )}
    </div>
  );
}
