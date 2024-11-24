"use client";
import useFetch from "@/hooks/useFetch";
import Cookies from "js-cookie";
import SearchRecipeItem from "./search-recipe-item";
import { RecipesProp } from "../home/random-recipes-item";
import { Skeleton } from "../ui/skeleton";

export default function SearchResult({
  time,
  query,
}: {
  time: string;
  query: { time: string; query: string };
}) {
  let timeSort;
  if (time === "newest") {
    timeSort = `sort=time&sortDirection=asc`;
  } else if (time === "oldest") {
    timeSort = `sort=time&sortDirection=asc`;
  } else if (time === "popularity") {
    timeSort = "sort=popularity";
  } else {
    timeSort = "";
  }
  const { data, isLoading } = useFetch(
    `complexSearch`,
    `query=${query.query}&${timeSort}`
  );
  if (data && !Cookies.get("recent-search")) {
    Cookies.set("recent-search", JSON.stringify(data));
  }
  return (
    <div className="grid grid-cols-2 gap-4 max-w-[600px] mx-auto sm:grid-cols-3 justify-items-center">
      {/* dsfsdk */}
      {data &&
        data.results.map((recipe: RecipesProp) => (
          <>
            {/* {JSON.stringify(data)} */}
            <SearchRecipeItem key={recipe.id} recipe={recipe} />
          </>
        ))}
      {isLoading && (
        <>
          {new Array(12).fill(null).map((_item, i) => (
            <Skeleton key={i} className="w-[150px] h-[150px]" />
          ))}
        </>
      )}
    </div>
  );
}
