import { createAction } from '@reduxjs/toolkit';

export const fetchOwnUDictionaryRequest = createAction(
  'user/fetchOwnUDictionaryRequest',
);
export const fetchOwnUDictionarySuccess = createAction(
  'user/fetchOwnUDictionarySuccess',
);
export const fetchOwnUDictionaryError = createAction(
  'user/fetchOwnUDictionaryError',
);

export const addToOwnUDictionaryRequest = createAction(
  'user/addToOwnUDictionaryRequest',
);
export const addToOwnUDictionarySuccess = createAction(
  'user/addToOwnUDictionarySuccess',
);
export const addToOwnUDictionaryError = createAction(
  'user/addToOwnUDictionaryError',
);
