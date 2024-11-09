"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Share } from "../vectors";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

export default function ShareLink() {
  const pathname = usePathname();
  return (
    <Dialog>
      <DialogTrigger className="flex gap-4">
        <Share /> Share
      </DialogTrigger>
      <DialogContent className="max-w-[90%]">
        <DialogHeader className="font-semibold text-xl">
          Recipe Link
        </DialogHeader>
        <DialogDescription>
          Copy recipe link and share your recipe link with friends and family.
        </DialogDescription>
        <div className="bg-gray4 flex items-center rounded-lg text-xs justify-between">
          <div className="px-[14px] py-3">{pathname}</div>
          <Button className="bg-primary100 font-semibold text-white h-full">
            Copy link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
