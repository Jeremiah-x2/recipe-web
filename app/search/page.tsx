import BackBtn from "@/components/back-button";
import SearchInput from "@/components/search-input";
import React from "react";
import SearchResult from "@/components/search/search-result";
// import { cookies } from "next/headers";
// import SearchRecipeItem from "@/components/search/search-recipe-item";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  console.log(searchParams);
  const query = await searchParams;
  // const cookie = cookies();
  // const recentSearch = cookie.get("recent-search");
  return (
    <main className="space-y-5">
      <div className="flex items-center">
        <BackBtn />
        <h4 className="font-semibold flex-1 text-center text-lg">
          Search Recipe
        </h4>
      </div>
      <SearchInput />
      <SearchResult time={query.time as string} query={query} />
      <h3 className="font-semibold text-lg">Recent Search</h3>
      <div className="grid grid-cols-2 gap-4">
        {/* {recentSearch && 
          ? JSON.parse(recentSearch.value).results.map((recipe) => (
              <SearchRecipeItem key={recipe.id} recipe={recipe} />
            ))
          : ""} */}
      </div>
    </main>
  );
}
