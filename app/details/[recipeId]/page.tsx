import BackBtn from "@/components/back-button";
import ShareLink from "@/components/details/share-link";
import SaveDeleteRecipe from "@/components/save-delete-recipe";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Star, Timer } from "@/components/vectors";
import { getData } from "@/lib/getData";
// import { Item } from "@radix-ui/react-dropdown-menu";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function RecipeDetails({
  params,
}: {
  params: { recipeId: string };
}) {
  const recipe = await getData(`${params.recipeId}/information`);
  return (
    <main className="space-y-[10px] max-w-[400px] mx-auto">
      <div className="flex justify-between items-center">
        <BackBtn />
        <Popover>
          <PopoverTrigger>
            <Ellipsis />
          </PopoverTrigger>
          <PopoverContent className="space-y-4 w-auto">
            <ShareLink />
            <Dialog>
              <DialogTrigger className="flex gap-4">
                <Star fill="none" /> Rate
              </DialogTrigger>
              <DialogContent className="fixed">
                <DialogHeader className="text-xs">
                  <DialogTitle>Recipe</DialogTitle>
                </DialogHeader>
                <div className="flex justify-center gap-4">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>
                <div className="text-center">
                  <Button className="bg-primary100 font-semibold" disabled>
                    Send
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Link href={""} className="flex gap-4 items-center">
              <Mail /> Review
            </Link>
          </PopoverContent>
        </Popover>
      </div>

      <div className="max-w-[315px mb-8">
        <div className="space-y-[10px] mb-4">
          <div className="h-[150px] sm:h-[200px] relative bg-primary60 rounded-lg overflow-hidden">
            <Image
              src={recipe.image}
              fill={true}
              alt="Recipe image"
              className="object-fill"
            />
            <div className="absolute top-0 left-0 p-[10px] flex flex-col justify-between items-end w-full h-full bg-gradient-to-t from-black to-[rgba(0,0,0,0)]">
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
              <div className="text-xs text-gray4 flex items-center">
                <Timer width={17} height={17} />
                <span className="ml-[5px]">{recipe.readyInMinutes} min</span>
                <SaveDeleteRecipe recipeItem={recipe} />
              </div>
            </div>
          </div>
          <div className="text-secondary100 font-bold">{recipe.title}</div>
        </div>

        <Tabs defaultValue="ingredient">
          <TabsList className="w-full flex">
            <TabsTrigger value="ingredient" className=" flex-1">
              Ingredient
            </TabsTrigger>
            <TabsTrigger value="procedure" className="flex-1">
              Procedure
            </TabsTrigger>
          </TabsList>

          {/* {JSON.stringify(recipe.extendedIngredients)} */}

          <TabsContent value="ingredient">
            <div className="space-y-4">
              {recipe.extendedIngredients.map(
                (
                  item: { image: string; originalName: string; amount: string },
                  index: string
                ) => (
                  <div
                    key={index}
                    className="min-h-[76px] px-[15px] py-3 rounded-lg bg-gray4 flex gap-4 items-center"
                  >
                    <div className="w-[52px] h-[52px]  rounded-lg bg-white flex items-center justify-center">
                      <div className="w-10 h-10 bg-gray4 rounded-md relative">
                        <Image
                          src={`https://img.spoonacular.com/ingredients_250x250/${item.image}`}
                          fill={true}
                          alt="img"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <p className="font-semibold text-base">
                      {item.originalName}
                    </p>
                    <p className="ml-auto text-xs">{item.amount} tsp</p>
                  </div>
                )
              )}
            </div>
          </TabsContent>

          <TabsContent value="procedure">
            <div className="space-y-4">
              {recipe.analyzedInstructions[0].steps.map(
                (item: { number: string; step: string }, index: number) => (
                  <div
                    key={index}
                    className="px-4 py-[10px] space-y-1 bg-gray4 rounded-lg"
                  >
                    <h3 className="text-[#121212] text-xs font-semibold">
                      Step {item.number}
                    </h3>
                    <p className="text-xs text-gray1">{item.step}</p>
                  </div>
                )
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
