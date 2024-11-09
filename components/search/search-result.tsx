"use client";
import useFetch from "@/hooks/useFetch";
import React from "react";
import Cookies from "js-cookie";
import SearchRecipeItem from "./search-recipe-item";

export default function SearchResult({
  time,
  query,
}: {
  time: string;
  query: any;
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
  const { data } = useFetch(
    `complexSearch`,
    `query=${query.query}&${timeSort}`
  );
  if (data) {
    Cookies.set("recent-search", JSON.stringify(data));
  }
  return (
    <div className="grid grid-cols-2 gap-4">
      {data &&
        data.results.map((recipe) => (
          <SearchRecipeItem key={recipe.id} recipe={recipe} />
        ))}
    </div>
  );
}
