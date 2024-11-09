import BackBtn from "@/components/back-button";
import SearchInput from "@/components/search-input";
import React from "react";
import { Star } from "lucide-react";
import SearchResult from "@/components/search/search-result";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  console.log(searchParams);
  const query = await searchParams;
  return (
    <main className="space-y-5">
      <div className="flex items-center">
        <BackBtn />
        <h4 className="font-semibold flex-1 text-center text-lg">
          Search Recipe
        </h4>
      </div>
      <SearchInput />
      <SearchResult time={searchParams.time} />
      <h3 className="font-semibold text-lg">Recent Search</h3>
      <div className="grid grid-cols-2 gap-4">
        {new Array(12).fill(null).map((item, index) => (
          <div
            key={index}
            className="w-[150px] h-[150px] relative rounded-[10px] bg-primary80 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-[rgba(0,0,0,0)] p-[10px] flex flex-col justify-between">
              <div className="px-[7px] py-[2px] rounded-full flex items-center gap-1 bg-secondary20 self-end">
                <Star
                  fill="#ff9c00"
                  stroke="none"
                  className="fill-secondary100"
                  width={7}
                  height={7}
                />{" "}
                <span className="text-[8px]">4.0</span>
              </div>

              <div className="space-y-[3px]">
                <p className="font-semibold text-white text-xs line-clamp-2">
                  Title
                </p>
                <p className="text-gray3 text-[8px]">Chef</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
