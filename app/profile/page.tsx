import { EditBio, EditUsername } from "@/components/profile/edit-profile";

import admin, { adminAuth, adminDB } from "@/config/firebaseAdmin";
import { Ellipsis } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

export default async function ProfilePage() {
  console.log("Firebase admin sdk", typeof admin.app.length);
  const cookie = cookies();
  const token = cookie.get("userToken");
  if (!token) {
    return (
      <div className="w-full h-[100dvh] flex justify-center items-center">
        <Link href={"/auth/sign-in"}></Link>
      </div>
    );
  } else {
    const userId = await adminAuth.verifyIdToken(token.value);
    const userRef = adminDB.collection("users").doc(userId.uid);
    const user = (await userRef.get()).data();
    return (
      <main>
        <div className="flex items-center mb-3">
          <h4 className="flex-1 text-center font-semibold text-lg">Profile</h4>
          <Ellipsis />
        </div>

        <div className="flex gap-6 items-center">
          <div className="w-[99px] h-[99px] rounded-full bg-gray4 shadow-[0_0_4px_rgba(0,0,0,0.2)]"></div>
          <div>
            <p className="text-xs text-gray4">Recipe</p>
            <p className="text-xl font-semibold">4</p>
          </div>
          <div>
            <p className="text-xs text-gray4">Followers</p>
            <p className="text-xl font-semibold">2.5M</p>
          </div>
          <div>
            <p className="text-xs text-gray4">Following</p>
            <p className="text-xl font-semibold">259</p>
          </div>
        </div>

        <div className="my-4">
          <p className="font-semibold text-xl space-x-4 flex gap-4 items-center">
            {user?.username}
            <EditUsername />
          </p>
          <p className="text-gray4 text-xs">Title</p>
        </div>

        <div>
          <div className="font-semibold text-xl space-x-4 flex gap-4 items-center">
            Bio
            <EditBio />
          </div>
          {user?.bio && <p>{user.bio}</p>}
        </div>
      </main>
    );
  }
}
