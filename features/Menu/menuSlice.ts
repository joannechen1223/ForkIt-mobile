import { createSlice } from "@reduxjs/toolkit";

import menuData from "@/data/menu";

import { MenuType } from "./constants";

const getMenuGroups = () => {
  return menuData.map((item: any) => ({
    groupId: item.groupId,
    groupName: item.groupName,
    itemIds: item.items.map((item: any) => item.itemId),
  }));
};

const getMenuItems = () => {
  const items: any = {};
  menuData.forEach((group: any) => {
    group.items.forEach((item: any) => {
      items[item.itemId] = item;
    });
  });
  return items;
};

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menuType: MenuType.List,
    groups: getMenuGroups(),
    items: getMenuItems(),
  },
  reducers: {
    setMenuType: (state, action) => {
      state.menuType = action.payload;
    },
  },
});

export const { setMenuType } = menuSlice.actions;
export default menuSlice.reducer;
