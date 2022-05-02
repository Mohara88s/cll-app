import { createAction } from '@reduxjs/toolkit';

export const fetchOwnDictionarysRequest = createAction(
  'own-dictionarys/fetchOwnDictionarysRequest',
);
export const fetchOwnDictionarysSuccess = createAction(
  'own-dictionarys/fetchOwnDictionarysSuccess',
);
export const fetchOwnDictionarysError = createAction(
  'own-dictionarys/fetchOwnDictionarysError',
);

export const addOwnDictionaryRequest = createAction(
  'own-dictionarys/addOwnDictionaryRequest',
);
export const addOwnDictionarySuccess = createAction(
  'own-dictionarys/addOwnDictionarySuccess',
);
export const addOwnDictionaryError = createAction('user/addOwnDictionaryError');

export const fetchOwnDictionaryRequest = createAction(
  'own-dictionarys/fetchOwnDictionaryRequest',
);
export const fetchOwnDictionarySuccess = createAction(
  'own-dictionarys/fetchOwnDictionarySuccess',
);
export const fetchOwnDictionaryError = createAction(
  'own-dictionarys/fetchOwnDictionaryError',
);

export const deleteOwnDictionaryRequest = createAction(
  'own-dictionarys/deleteOwnDictionaryRequest',
);
export const deleteOwnDictionarySuccess = createAction(
  'own-dictionarys/deletehOwnDictionarySuccess',
);
export const deleteOwnDictionaryError = createAction(
  'own-dictionarys/deleteOwnDictionaryError',
);
