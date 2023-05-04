import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  users: null,
  token: null,
  account: null,
  email:null

};


export const authSlice = createSlice({
  name: "PROPAY_APP",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.users = action.payload.users;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.users = null;
      state.token = null;
    },
    isLoggedIn: (state, action) => {
      state.users = action.payload.users;
      state.token = action.payload.token;
    },
    setAccount:(state, action)=>{
      state.users= action.payload.users;
      state.account= action.payload.account
    },
    setEmailSend:(state, action)=>{
      state.users= action.payload.users;
      state.email= action.payload.email
    },
 
  },
});

export const { setMode, setLogin, setLogout, isLoggedIn, setAccount, setEmailSend } = authSlice.actions;
export default authSlice.reducer;