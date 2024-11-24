import { Button } from "@/components/ui/button";
import { BookmarkOutline, Star, Timer } from "@/components/vectors";
import { adminAuth, adminDB } from "@/config/firebaseAdmin";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SavedRecipe {
  image: string;
  title: string;
  readyInMinutes: string;
}

export default async function SavedRecipes() {
  const cookie = cookies();
  const userToken = cookie.get("userToken");

  if (!userToken) {
    return (
      <main className="flex items-center justify-center h-[100dvh] flex-col gap-4">
        <h3 className="font-semibold text-xl">
          Login to see your saved recipes
        </h3>
        <Link href={"/auth/sign-in"}>
          <Button className="bg-primary100 font-semibold">Login</Button>
        </Link>
      </main>
    );
  } else {
    const authUser = await adminAuth.verifyIdToken(userToken.value);
    // console.log(authUser);
    const savedRecipesRef = adminDB.collection(
      `users/${authUser.uid}/favorites`
    );
    const savedRecipes: {
      id: string;
      image: string;
      title: string;
      readyInMinutes: string;
    }[] = [];
    const data = await savedRecipesRef.get();
    data.forEach((doc) => {
      savedRecipes.push({ id: doc.id, ...(doc.data() as SavedRecipe) });
    });

    return (
      <main>
        <h3 className="text-center font-semibold text-lg mb-4">
          Saved Recipes
        </h3>

        <div className="flex flex-col gap-5 w-full items-center justify-center">
          {savedRecipes.map((item, index) => (
            <div
              key={index}
              className="h-[150px] relative w-[315px] bg-primary80 rounded-lg overflow-hidden"
            >
              dfhkjhdfgkfdjk
              <Image src={item.image} fill={true} alt="Recipe" />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-[rgba(0,0,0,0)] flex flex-col justify-between p-[10px]">
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

                <div className="flex items-end justify-between">
                  <div className="w-[60%]">
                    <p className="text-white text-sm font-semibold ">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray4">By Recipe Chef</p>
                  </div>
                  <div className="text-xs text-gray4 flex items-center">
                    <Timer width={17} height={17} />
                    <span className="ml-[5px]">{item.readyInMinutes} min</span>
                    <div className="w-6 h-6 flex items-center ml-[10px] justify-center rounded-full bg-white">
                      <BookmarkOutline
                        width={16}
                        height={16}
                        className="stroke-primary80"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }
}
