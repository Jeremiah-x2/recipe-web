import Image from "next/image";
import { Star } from "lucide-react";

export default function SearchRecipeItem({ recipe }) {
  return (
    <div className="w-[150px] h-[150px] relative rounded-[10px] bg-primary80 overflow-hidden">
      <Image
        src={recipe.image}
        fill={true}
        alt="Recipe image"
        className="object-cover"
      />
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
            {recipe.title}
          </p>
          <p className="text-gray3 text-[8px]">Chef</p>
        </div>
      </div>
    </div>
  );
}
