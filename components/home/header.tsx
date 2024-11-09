import { adminAuth, adminDB } from "@/config/firebaseAdmin";
import { cookies } from "next/headers";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default async function Header() {
  const cookie = cookies();
  const userToken = cookie.get("userToken");
  if (userToken) {
    try {
      const isValidUser = await adminAuth.verifyIdToken(userToken.value);
      const userDocRef = adminDB.collection("users").doc(isValidUser.uid);
      const userData = (await userDocRef.get()).data();
      return (
        <div className="flex justify-between">
          <div>
            <h4 className="font-bold text-xl">
              Hello{" "}
              {userData && userData.username ? <>{userData.username}</> : ""}
            </h4>
            <p className="text-xs text-gray4">What are you cooking today?</p>
          </div>

          {userData ? (
            <>
              {userData.avatar !== "" ? (
                <Image src={userData.avatar} width={40} height={40} alt="DP" />
              ) : (
                <Image
                  src={"/images/blank-profile.webp"}
                  width={40}
                  height={40}
                  alt="DP"
                  className="rounded-lg object-cover"
                />
              )}
            </>
          ) : (
            <Link href={"/auth/sign-in"}>
              <Button className="bg-primary100 text-white font-semibold">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      );
    } catch (error) {
      console.log(error);
    }
  }
  return <div>Header</div>;
}