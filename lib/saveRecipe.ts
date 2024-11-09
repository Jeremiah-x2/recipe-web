import { auth, db } from "@/config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export async function saveRecipe(recipeItem: { id: number }) {
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
