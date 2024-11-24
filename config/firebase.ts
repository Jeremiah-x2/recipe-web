import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDUQ2zmdJKwXEoCUDk5zO1Cy_apioaKt6M",
  authDomain: "recipes-b4425.firebaseapp.com",
  projectId: "recipes-b4425",
  storageBucket: "recipes-b4425.firebasestorage.app",
  messagingSenderId: "304181623448",
  appId: "1:304181623448:web:cbc223ee42f998e533aeed",
  measurementId: "G-LR7YG3SGEG",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const fbProvider = new FacebookAuthProvider();
