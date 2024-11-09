"use client";
import React, { ChangeEvent, useState } from "react";
import { Input } from "./ui/input";
import { Filter, Search, Star } from "./vectors";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
const time2 = ["Newest", "Oldest", "Popularity"];
export default function SearchInput() {
  const [time, setTime] = useState([
    { time: "Newest", isSelected: true },
    { time: "Oldest", isSelected: false },
    { time: "Popularity", isSelected: false },
  ]);
  // const [selectedTime]
  const [rating, setRating] = useState<number | null>(null);
  const [search, setSearch] = useState<string>("");
  return (
    <div className="py-5 flex gap-5">
      <div className="relative flex-1">
        <Search className="absolute top-1/2 -translate-y-1/2 left-[10px]" />
        <Input
          className="h-10 pl-8 w-full border-gray4"
          placeholder="Search recipe"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
        {search !== "" && (
          <Button className="absolute right-0 top-1/2 -translate-y-1/2 h-full bg-primary100">
            <SearchIcon size={32} className="" onClick={() => {}} />
          </Button>
        )}
      </div>
      <Drawer>
        <DrawerTrigger>
          <div className="w-10 h-10 bg-primary100 rounded-lg flex items-center justify-center">
            <Filter />
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>Filter Recipe</DrawerHeader>

          <div className="px-[30px] space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Time</h4>
              <div className={`flex gap-[10px]`}>
                {time.map((item, index) => (
                  <div
                    key={index}
                    className={`text-xs px-[10px] py-[5px] rounded-lg ${
                      item.isSelected
                        ? "bg-primary100 text-white"
                        : "bg-white text-primary100 border border-primary100 "
                    }`}
                    onClick={() => {
                      setTime((prev) =>
                        [...prev].map((time, i) => {
                          if (index === i) {
                            if (time.isSelected) {
                              return { ...time, isSelected: false };
                            } else {
                              return { ...time, isSelected: true };
                            }
                          } else {
                            return { ...time, isSelected: false };
                          }
                        })
                      );
                    }}
                  >
                    {item.time}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Rate</h3>
              <div className="flex gap-[10px]">
                {new Array(5).fill(null).map((item, index) => (
                  <div
                    key={index}
                    className={`rounded-lg  px-[10px] py-[5px] flex items-center gap-2 ${
                      rating !== null
                        ? rating === index + 1
                          ? "bg-primary100 text-white"
                          : "text-primary100 bg-white border border-primary100"
                        : "text-primary100 bg-white border border-primary100"
                    }`}
                    onClick={() =>
                      setRating((prev) => {
                        if (prev === index + 1) return null;
                        else {
                          return index + 1;
                        }
                      })
                    }
                  >
                    {index + 1}{" "}
                    <Star width={18} height={18} fill={`${rating}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose>
              <Button className="bg-primary100 w-40 font-semibold">
                Filter
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
