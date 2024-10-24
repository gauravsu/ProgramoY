import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  is_lit_authenticated: false,
  type: "worker", // "worker" or "distributor"
  address: null,
  public_key: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLitAuthenticated: (state, action) => {
      state.is_lit_authenticated = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setPublicKey: (state, action) => {
      state.public_key = action.payload;
    },
    resetUser: (state) => {
      state.is_lit_authenticated = false;
      state.type = null;
      state.address = null;
      state.public_key = null;
    },
  },
});

export const {
  setIsLitAuthenticated,
  setType,
  setAddress,
  setPublicKey,
  resetUser,
} = userSlice.actions;

export default userSlice.reducer;
