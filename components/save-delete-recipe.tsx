"use client";

import { auth, db } from "@/config/firebase";
import { BookmarkOutline } from "./vectors";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function SaveDeleteRecipe({
  recipeItem,
}: {
  recipeItem: { id: string; image: string };
}) {
  async function saveRecipe() {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      toast.error("Sign In to save a recipe!");
      return;
    }

    try {
      const recipeRef = doc(
        db,
        `users/${currentUser.uid}/favorites`,
        recipeItem.id.toString()
      );
      console.log(recipeRef, recipeItem);
      const recipeDoc = await getDoc(recipeRef);
      if (recipeDoc.exists()) {
        toast.error("Recipe already exists as favorite");
        return;
      } else {
        setDoc(recipeRef, recipeItem);
        toast.success("Saved Recipe");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured while saving recipe.");
    }
  }
  return (
    <>
      <div
        className="w-6 h-6 flex items-center ml-[10px] justify-center rounded-full bg-white"
        onClick={saveRecipe}
      >
        <BookmarkOutline width={16} height={16} className="stroke-primary80" />
      </div>
      <ToastContainer />
    </>
  );
}
