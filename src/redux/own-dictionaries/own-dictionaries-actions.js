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

export const fetchOwnDictionaryRequest = createAction(
  'own-dictionaries/fetchOwnDictionaryRequest',
);
export const fetchOwnDictionarySuccess = createAction(
  'own-dictionaries/fetchOwnDictionarySuccess',
);
export const fetchOwnDictionaryError = createAction(
  'own-dictionaries/fetchOwnDictionaryError',
);

export const updateOwnDictionaryRequest = createAction(
  'own-dictionaries/updateOwnDictionaryRequest',
);
export const updateOwnDictionarySuccess = createAction(
  'own-dictionaries/updateOwnDictionarySuccess',
);
export const updateOwnDictionaryError = createAction(
  'own-dictionaries/updateOwnDictionaryError',
);
