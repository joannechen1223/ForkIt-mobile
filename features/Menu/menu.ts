import axios from "axios";

import { GET_MENU_ENDPOINT } from "./constants";
import { setMenuReady } from "./menuSlice";

export const checkMenuReady = async (menuId: string, dispatch: any) => {
  console.log("checking menu ready");
  try {
    const response = await axios.get(`${GET_MENU_ENDPOINT}/${menuId}`);
    const isReady =
      response.data.is_processing === false && response.data.is_error === false;
    dispatch(setMenuReady({ isReady }));
    return isReady;
  } catch (error) {
    console.error("Error checking menu ready", error);
    return false;
  }
};
