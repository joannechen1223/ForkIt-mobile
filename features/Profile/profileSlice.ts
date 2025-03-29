import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id: string;
  email: string | null;
  name: string | null;
};

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null as User | null,
  },
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = profileSlice.actions;
export default profileSlice.reducer;
