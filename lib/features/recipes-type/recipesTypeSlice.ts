import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RecipesTypeState {
  value: string;
}

const initialState: RecipesTypeState = {
  value: "All",
};

export const recipeTypeSlice = createSlice({
  name: "recipeType",
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setType } = recipeTypeSlice.actions;
export default recipeTypeSlice.reducer;
