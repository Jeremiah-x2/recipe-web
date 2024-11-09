"use client";
import useFetch from "@/hooks/useFetch";
import React from "react";

export default function SearchResult({ time }: { time: string }) {
  let timeSort;
  if (time === "newest") {
    timeSort = `sort=time&sortDirection=asc`;
  } else if (time === "oldest") {
    timeSort = `sort=time&sortDirection=asc`;
  } else if (time === "popularity") {
    timeSort = "sort=popularity";
  }
  const { data } = useFetch("/complexSearch", timeSort);
  return <div>{JSON.stringify(data)}</div>;
}
