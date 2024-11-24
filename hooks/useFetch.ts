"use client";
import { RecipesProp } from "@/components/home/random-recipes-item";
import { useEffect, useState } from "react";

export default function useFetch(url: string, query?: string) {
  const [data, setData] = useState<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    results: any;
    recipes: RecipesProp[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/${url}?apiKey=${
            process.env.NEXT_PUBLIC_SPOONACULAR
          }&${query && `${query}`}`
        );
        const data = await res.json();
        console.log(data);
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [url, query]);
  return { data, isLoading, error };
}
