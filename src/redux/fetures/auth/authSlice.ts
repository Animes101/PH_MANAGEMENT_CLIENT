import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

type IUser = {
  id: string;
  role:string;
};

type IInitialState = {
  user: IUser | null;
  accessToken: string | null;
};

const initialState: IInitialState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: IUser; accessToken: string }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const userCurrentToken=(state:RootState)=> state.auth.accessToken;
export const userCurrentUser=(state:RootState)=> state.auth.user;