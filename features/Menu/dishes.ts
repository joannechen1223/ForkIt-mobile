import axios from "axios";

import { GET_DISHES_ENDPOINT } from "./constants";
import { setDishesDetails } from "./menuSlice";

export type Dish = {
  id: number;
  name: string;
  translationName: string;
  description?: string;
  ingredients?: string[];
  allergens?: string[];
  history?: string;
  price?: number;
  imageUrls?: string[];
  position?: {
    x: number;
    y: number;
  } | null;
};

const getDishes = async (menuId: string, dispatch: any) => {
  const response = await axios.get(`${GET_DISHES_ENDPOINT}/${menuId}`);
  dispatch(setDishesDetails(response.data));
};

export default getDishes;
