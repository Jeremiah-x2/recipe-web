"use server";

import { auth } from "@/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function signUpWithPasswordAction(
  email: string,
  password: string
) {
  console.log("Signing up...");
  console.log(email, password);
  try {
    const createUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(createUser);
  } catch (error) {
    console.log(error);
  }
}
