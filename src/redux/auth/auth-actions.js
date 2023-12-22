import { createAction } from '@reduxjs/toolkit';

export const signupRequest = createAction('auth/signupRequest');
export const signupSuccess = createAction('auth/signupSuccess');
export const signupError = createAction('auth/signupError');

export const signinRequest = createAction('auth/signinRequest');
export const signinSuccess = createAction('auth/signinSuccess');
export const signinError = createAction('auth/signinError');

export const signoutRequest = createAction('auth/signoutRequest');
export const signoutSuccess = createAction('auth/signoutSuccess');
export const signoutError = createAction('auth/signoutError');

export const fetchCurrentUserRequest = createAction(
  'auth/fetchCurrentUserRequest',
);
export const fetchCurrentUserSuccess = createAction(
  'auth/fetchCurrentUserSuccess',
);
export const fetchCurrentUserError = createAction('auth/fetchCurrentUserError');

export const passwordResetApplicationRequest = createAction(
  'auth/passwordResetApplicationRequest',
);
export const passwordResetApplicationSuccess = createAction(
  'auth/passwordResetApplicationSuccess',
);
export const passwordResetApplicationError = createAction(
  'auth/passwordResetApplicationError',
);

export const passwordChangeRequest = createAction('auth/passwordChangeRequest');
export const passwordChangeSuccess = createAction('auth/passwordChangeSuccess');
export const passwordChangeError = createAction('auth/passwordChangeError');
