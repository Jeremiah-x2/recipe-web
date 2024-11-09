import React from "react";
import { FacebookIcon, GoogleIcon } from "./vectors";

export function ThirdPartyAuth() {
  return (
    <div className="flex gap-6 justify-center">
      <div className="w-11 h-11 rounded-[10px] flex items-center justify-center shadow-[0_0_8px_rgba(0,0,0,0.4)]">
        <GoogleIcon />
      </div>
      <div className="w-11 h-11 rounded-[10px] flex items-center justify-center shadow-[0_0_8px_rgba(0,0,0,0.4)]">
        <FacebookIcon />
      </div>
    </div>
  );
}
