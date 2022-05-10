import { createAction } from '@reduxjs/toolkit';

export const changeCurrentDictionary = createAction(
  'own-dictionaries/changeCurrentDictionary',
);

export const fetchOwnDictionariesRequest = createAction(
  'own-dictionaries/fetchOwnDictionariesRequest',
);
export const fetchOwnDictionariesSuccess = createAction(
  'own-dictionaries/fetchOwnDictionariesSuccess',
);
export const fetchOwnDictionariesError = createAction(
  'own-dictionaries/fetchOwnDictionariesError',
);

export const addOwnDictionaryRequest = createAction(
  'own-dictionaries/addOwnDictionaryRequest',
);
export const addOwnDictionarySuccess = createAction(
  'own-dictionaries/addOwnDictionarySuccess',
);
export const addOwnDictionaryError = createAction(
  'own-dictionaries/addOwnDictionaryError',
);

export const deleteOwnDictionaryRequest = createAction(
  'own-dictionaries/deleteOwnDictionaryRequest',
);
export const deleteOwnDictionarySuccess = createAction(
  'own-dictionaries/deletehOwnDictionarySuccess',
);
export const deleteOwnDictionaryError = createAction(
  'own-dictionaries/deleteOwnDictionaryError',
);
