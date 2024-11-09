"use client";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React from "react";

export default function BackBtn() {
  const router = useRouter();
  return (
    <div>
      <ArrowLeftIcon onClick={() => router.back()} width={20} height={20} />
    </div>
  );
}
