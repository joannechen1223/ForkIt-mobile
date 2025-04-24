import Constants from "expo-constants";

export const MenuType = {
  Pic: "pic",
  List: "list",
  Ask: "ask",
};

const serverUrl = Constants.expoConfig?.extra?.serverUrl;
export const MENU_UPLOAD_ENDPOINT = `${serverUrl}/camera/upload`;
export const GET_MENU_ENDPOINT = `${serverUrl}/menus`;
export const GET_DISHES_ENDPOINT = `${serverUrl}/dishes/menu`;
