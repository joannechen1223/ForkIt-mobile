import { createSlice } from "@reduxjs/toolkit";

import { MenuType } from "./constants";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menuType: MenuType.List,
  },
  reducers: {
    setMenuType: (state, action) => {
      state.menuType = action.payload;
    },
  },
});

export const { setMenuType } = menuSlice.actions;
export default menuSlice.reducer;
