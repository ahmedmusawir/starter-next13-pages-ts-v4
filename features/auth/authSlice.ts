import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
  loginModalOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
      state.error = null; // Reset any previous errors.
    },
    authenticationSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isLoading = false;
    },
    authenticationFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
      state.isLoading = false;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.isLoading = false;
    },
    setUser: (state, action) => {
      // In case you need to manually set the user.
      state.user = action.payload;
    },
    setError: (state, action) => {
      // For setting error messages.
      state.error = action.payload;
    },
    openLoginModal: (state) => {
      state.loginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.loginModalOpen = false;
    },
  },
});

export const {
  startLoading,
  authenticationSuccess,
  authenticationFailure,
  logoutSuccess,
  setUser,
  setError,
  openLoginModal,
  closeLoginModal,
} = authSlice.actions;

export default authSlice.reducer;
