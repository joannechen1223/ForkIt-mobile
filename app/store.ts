import { configureStore } from "@reduxjs/toolkit";

import menuReducer from "@/features/Menu/menuSlice";
import profileReducer from "@/features/Profile/profileSlice";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
