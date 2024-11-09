import React from "react";

export default function AuthDivider() {
  return (
    <div className="flex items-center gap-2 my-5 justify-center">
      <div className="w-[50px] h-[1px] bg-gray4"></div>
      <p className="text-xs font-semibold text-gray4">Or Sign in With</p>
      <div className="w-[50px] h-[1px] bg-gray4"></div>
    </div>
  );
}
