"use client";
import React from "react";
import { CirclesWithBar } from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
export default function Loading() {
  return (
    <div className="loader max-w-[600px] mx-auto flex flex-col h-[100dvh] items-center justify-center">
      <CirclesWithBar
        height="100"
        width="100"
        color="#4fa94d"
        outerCircleColor="#4fa94d"
        innerCircleColor="#4fa94d"
        barColor="#4fa94d"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <h1 className="font-bold text-3xl">Loading</h1>
    </div>
  );
}
