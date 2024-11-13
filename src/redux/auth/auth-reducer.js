import {
  signupRequest,
  signupSuccess,
  signupError,
  signinRequest,
  signinSuccess,
  signinError,
  // signoutRequest,
  signoutSuccess,
  // signoutError,
  fetchCurrentUserRequest,
  fetchCurrentUserSuccess,
  fetchCurrentUserError,
  passwordResetApplicationRequest,
  passwordResetApplicationSuccess,
  passwordResetApplicationError,
  passwordChangeRequest,
  passwordChangeSuccess,
  passwordChangeError,
} from './auth-actions';
import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

const token = createReducer(null, (builder) => {
  builder
  .addCase(signupSuccess, (_, { payload }) => payload.token)
  .addCase(signinSuccess, (_, { payload }) => payload.token)
  .addCase(signoutSuccess, () => null)
});
const user = createReducer(
  { name: null, email: null, subscription: null }, (builder) => {
    builder
    .addCase(signupSuccess, (_, { payload }) => payload.user)
    .addCase(signinSuccess, (_, { payload }) => payload.user)
    .addCase(signoutSuccess, () => {
      return { name: null, email: null, subscription: null };
    })
    .addCase(fetchCurrentUserSuccess, (_, { payload }) => payload)
  },
);
const isLoggedIn = createReducer(false, (builder) => {
  builder
  .addCase(signupSuccess, () => true)
  .addCase(signinSuccess, () => true)
  .addCase(signoutSuccess, () => false)
  .addCase(fetchCurrentUserRequest, () => false)
  .addCase(fetchCurrentUserSuccess, () => true)
  .addCase(fetchCurrentUserError, () => false)
});
const isFetchingCurrentUser = createReducer(true, (builder) => {
  builder
  .addCase(fetchCurrentUserRequest, () => true)
  .addCase(fetchCurrentUserSuccess, () => false)
  .addCase(fetchCurrentUserError, () => false)
});
const passwordResetApplication = createReducer('', (builder) => {
  builder
  .addCase(passwordResetApplicationSuccess, (_, { payload }) => payload.response)
  .addCase(passwordResetApplicationRequest, () => '')
});
const passwordChange = createReducer('', (builder) => {
  builder
  .addCase(passwordChangeSuccess, (_, { payload }) => payload.response)
  .addCase(passwordChangeRequest, () => '')
});
const loading = createReducer(false, (builder) => {
  builder
  .addCase(signupRequest, () => true)
  .addCase(signupSuccess, () => false)
  .addCase(signupError, () => false)
  .addCase(signinRequest, () => true)
  .addCase(signinSuccess, () => false)
  .addCase(signinError, () => false)
  .addCase(passwordResetApplicationRequest, () => true)
  .addCase(passwordResetApplicationSuccess, () => false)
  .addCase(passwordResetApplicationError, () => false)
  .addCase(passwordChangeRequest, () => true)
  .addCase(passwordChangeSuccess, () => false)
  .addCase(passwordChangeError, () => false)
});

const authError = createReducer(null, (builder) => {
  builder
  .addCase(signinSuccess, () => null)
  .addCase(signinError, (_, { payload }) => payload)
});
const regError = createReducer(null, (builder) => {
  builder
  .addCase(signupSuccess, () => null)
  .addCase(signupError, (_, { payload }) => payload)
});
const passChangeError = createReducer(null, (builder) => {
  builder
  .addCase(passwordResetApplicationError, (_, { payload }) => payload)
  .addCase(passwordResetApplicationRequest, () => null)
  .addCase(passwordChangeError, (_, { payload }) => payload)
  .addCase(passwordChangeRequest, () => null)
});

export default combineReducers({
  token,
  user,
  isLoggedIn,
  isFetchingCurrentUser,
  passwordResetApplication,
  passwordChange,
  loading,
  authError,
  regError,
  passChangeError,
});
