import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SearchFilterState {
  value: {
    time: string | null;
  };
}

const initialState: SearchFilterState = {
  value: {
    time: null,
  },
};

export const searchFilterSlice = createSlice({
  name: "searchFilter",
  initialState,
  reducers: {
    setTimeFilter: (state, action: PayloadAction<string>) => {
      state.value.time = action.payload;
    },
  },
});

export const { setTimeFilter } = searchFilterSlice.actions;
export default searchFilterSlice.reducer;
