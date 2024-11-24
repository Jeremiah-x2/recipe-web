"use client";
import React from "react";
import { Button } from "./ui/button";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { redirect } from "next/navigation";

export default function Logout() {
  return (
    <Button
      onClick={async () => {
        try {
          const logOut = await signOut(auth);
          redirect("/");
          console.log(logOut);
        } catch (error) {
          console.log(error);
        }
      }}
    >
      Log out
    </Button>
  );
}
