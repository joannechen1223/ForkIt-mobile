import { createSlice } from "@reduxjs/toolkit";

import menuData from "@/data/menu";

import { MenuType } from "./constants";
import { Dish } from "./dishes";

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
    menuType: MenuType.Pic,
    groups: getMenuGroups(),
    items: getMenuItems(),
    photo: {
      uri: null,
      orientation: null,
      dimensions: null,
    },
    menu: {
      id: null,
      restaurantName: null,
      isReady: false,
    },
    dishes: {} as Record<number, Dish>,
  },
  reducers: {
    setMenuType: (state, action) => {
      state.menuType = action.payload;
    },
    setPhoto: (state, action) => {
      state.photo = action.payload;
    },
    setMenu: (state, action) => {
      const menu = {
        id: action.payload.menu_id,
        restaurantName: action.payload.restaurant_name,
        isReady: false,
      };
      state.menu = menu;
    },
    setDishes: (state, action) => {
      const dishes: Record<number, Dish> = {};
      action.payload.forEach((dish: any) => {
        dishes[dish.dish_id] = {
          id: dish.dish_id,
          name: dish.dish_name,
          translationName: dish.translation_name,
          position: dish.position,
          highlight: false,
        };
      });
      state.dishes = dishes;
    },
    setDishesDetails: (state, action) => {
      const dishes: Record<number, any> = {};
      action.payload.forEach((dish: any) => {
        dishes[dish.id] = {
          ...state.dishes[dish.id],
          description: dish.description,
          ingredients: dish.ingredients,
          allergens: dish.allergens,
          history: dish.history,
          newFlavor: dish.new_flavor,
          flavorMapping: dish.flavor_profile,
          price: dish.price,
          imageUrl: dish.image_url,
          translationName: dish.translation_name,
        };
      });
      state.dishes = dishes;
    },
    resetMenu: (state) => {
      state.menu = {
        id: null,
        restaurantName: null,
        isReady: false,
      };
      state.photo = {
        uri: null,
        orientation: null,
        dimensions: null,
      };
      state.dishes = {};
    },
    setMenuReady: (state, action) => {
      state.menu.isReady = action.payload.isReady;
    },
    setHighlight: (state, action) => {
      state.dishes[action.payload.dishId].highlight = action.payload.highlight;
    },
  },
});

export const {
  setMenuType,
  setPhoto,
  setMenu,
  setDishes,
  resetMenu,
  setMenuReady,
  setDishesDetails,
  setHighlight,
} = menuSlice.actions;
export default menuSlice.reducer;
