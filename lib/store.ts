import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./features/recipes-type/recipesTypeSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      recipeType: recipeReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
