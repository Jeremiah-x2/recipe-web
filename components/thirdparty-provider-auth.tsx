import React from "react";
import { FacebookIcon, GoogleIcon } from "./vectors";
import { signInWithPopup } from "firebase/auth";
import { auth, fbProvider, googleProvider } from "@/config/firebase";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";

export function ThirdPartyAuth() {
  return (
    <div className="flex gap-6 justify-center">
      <div
        className="w-11 h-11 rounded-[10px] flex items-center justify-center shadow-[0_0_8px_rgba(0,0,0,0.4)] hover:scale-95"
        onClick={async () => {
          try {
            const user = signInWithPopup(auth, googleProvider);
            Cookies.set(
              "userToken",
              (await (await user).user.getIdToken()).toString()
            );
            redirect("/");
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <GoogleIcon />
      </div>
      <div
        onClick={() => {
          try {
            signInWithPopup(auth, fbProvider);
          } catch (error) {
            console.log(error);
          }
        }}
        className="w-11 h-11 rounded-[10px] flex items-center justify-center shadow-[0_0_8px_rgba(0,0,0,0.4)] hover:scale-95"
      >
        <FacebookIcon />
      </div>
    </div>
  );
}
