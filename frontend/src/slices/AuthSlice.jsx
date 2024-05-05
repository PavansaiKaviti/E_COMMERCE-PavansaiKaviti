import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  UserInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.UserInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    setlogout: (state, action) => {
      state.UserInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});
export const { setCredentials, setlogout } = authSlice.actions;
export default authSlice.reducer;
