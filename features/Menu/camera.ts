import axios from "axios";
import * as FileSystem from "expo-file-system";
import FormData from "form-data";

import { MENU_UPLOAD_ENDPOINT } from "./constants";
import { setDishes, setMenu } from "./menuSlice";

export const uploadMenu = async (photoUri: string, dispatch: any) => {
  console.log("Uploading menu");
  const fileInfo = await FileSystem.getInfoAsync(photoUri);
  if (!fileInfo.exists) {
    console.error("File does not exist at", photoUri);
    return;
  }

  const form = new FormData();
  form.append("menuImage", {
    uri: photoUri,
    name: "test-menu.jpg",
    type: "image/jpeg",
  } as any);
  console.log("endpoint", MENU_UPLOAD_ENDPOINT);

  try {
    const response = await axios.post(MENU_UPLOAD_ENDPOINT, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Upload success:", response.data);
    dispatch(setMenu(response.data.menu));
    dispatch(setDishes(response.data.dishes));
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Upload failed:", error.message);
    } else {
      console.error("Upload failed:", String(error));
    }
  }
};
