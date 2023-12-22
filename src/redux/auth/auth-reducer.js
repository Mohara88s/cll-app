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

const token = createReducer(null, {
  [signupSuccess]: (_, { payload }) => payload.token,
  [signinSuccess]: (_, { payload }) => payload.token,
  [signoutSuccess]: () => null,
});
const user = createReducer(
  { name: null, email: null, subscription: null },
  {
    [signupSuccess]: (_, { payload }) => payload.user,
    [signinSuccess]: (_, { payload }) => payload.user,
    [signoutSuccess]: () => {
      return { name: null, email: null, subscription: null };
    },
    [fetchCurrentUserSuccess]: (_, { payload }) => payload,
  },
);
const isLoggedIn = createReducer(false, {
  [signupSuccess]: () => true,
  [signinSuccess]: () => true,
  [signoutSuccess]: () => false,
  [fetchCurrentUserRequest]: () => false,
  [fetchCurrentUserSuccess]: () => true,
  [fetchCurrentUserError]: () => false,
});
const isFetchingCurrentUser = createReducer(true, {
  [fetchCurrentUserRequest]: () => true,
  [fetchCurrentUserSuccess]: () => false,
  [fetchCurrentUserError]: () => false,
});
const passwordResetApplication = createReducer('', {
  [passwordResetApplicationSuccess]: (_, { payload }) => payload.response,
  [passwordResetApplicationRequest]: () => '',
});
const passwordChange = createReducer('', {
  [passwordChangeSuccess]: (_, { payload }) => payload.response,
  [passwordChangeRequest]: () => '',
});
const loading = createReducer(false, {
  [signupRequest]: () => true,
  [signupSuccess]: () => false,
  [signupError]: () => false,
  [signinRequest]: () => true,
  [signinSuccess]: () => false,
  [signinError]: () => false,
  [passwordResetApplicationRequest]: () => true,
  [passwordResetApplicationSuccess]: () => false,
  [passwordResetApplicationError]: () => false,
  [passwordChangeRequest]: () => true,
  [passwordChangeSuccess]: () => false,
  [passwordChangeError]: () => false,
});

const authError = createReducer(null, {
  [signinSuccess]: () => null,
  [signinError]: (_, { payload }) => payload,
});
const regError = createReducer(null, {
  [signupSuccess]: () => null,
  [signupError]: (_, { payload }) => payload,
});
const passChangeError = createReducer(null, {
  [passwordResetApplicationError]: (_, { payload }) => payload,
  [passwordResetApplicationRequest]: () => null,
  [passwordChangeError]: (_, { payload }) => payload,
  [passwordChangeRequest]: () => null,
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
