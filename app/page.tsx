import { cookies } from "next/headers";
import { adminAuth } from "@/config/firebaseAdmin";
import Header from "@/components/home/header";
import SearchInput from "@/components/search-input";
import RecipesFilterList from "@/components/home/recipes-filter-list";
import RandomRecipes from "@/components/home/random-recipes";
import NewRecipes from "@/components/home/new-recipes";
export default async function Home() {
  // const cookie = cookies();
  // const token = cookie.get("userToken");
  // console.log(token);
  // if (token) {
  //   const decodedToken = await adminAuth.verifyIdToken(token.value);
  //   console.log(decodedToken);
  // }
  return (
    <main>
      {/* <Header /> */}
      <SearchInput />
      <RecipesFilterList />
      <RandomRecipes />
      <NewRecipes />
    </main>
  );
}
