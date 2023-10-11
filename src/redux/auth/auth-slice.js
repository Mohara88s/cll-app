import { createSlice } from '@reduxjs/toolkit';
import authOperations from './auth-operations';

const initialState = {
  user: { name: null, email: null, subscription: null },
  token: null,
  isLoggedIn: false,
  isFetchingCurrentUser: true,
  authError: null,
  regError: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [authOperations.signup.pending](state) {
      state.loading = true;
    },
    [authOperations.signup.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.regError = null;
      state.loading = false;
    },
    [authOperations.signup.rejected](state, action) {
      state.regError = action.payload;
      state.loading = false;
    },
    [authOperations.signin.pending](state) {
      state.loading = true;
    },
    [authOperations.signin.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.authError = null;
      state.loading = false;
    },
    [authOperations.signin.rejected](state, action) {
      state.authError = action.payload;
      state.loading = false;
    },
    [authOperations.signout.fulfilled](state, action) {
      state.user = { name: null, email: null, subscription: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    [authOperations.fetchCurrentUser.pending](state) {
      state.isFetchingCurrentUser = true;
      state.isLoggedIn = false;
    },
    [authOperations.fetchCurrentUser.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isFetchingCurrentUser = false;
    },
    [authOperations.fetchCurrentUser.rejected](state) {
      state.isFetchingCurrentUser = false;
      state.isLoggedIn = false;
    },
  },
});

export default authSlice.reducer;
