import {
  fetchOwnDictionarysSuccess,
  fetchOwnDictionarysRequest,
  fetchOwnDictionarysError,
  addOwnDictionaryRequest,
  addOwnDictionarySuccess,
  addOwnDictionaryError,
  fetchOwnDictionarySuccess,
  fetchOwnDictionaryRequest,
  fetchOwnDictionaryError,
  deleteOwnDictionarySuccess,
  deleteOwnDictionaryRequest,
  deleteOwnDictionaryError,
} from './user-actions';
import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

const ownDictionarys = createReducer([], {
  [fetchOwnDictionarysSuccess]: (_, { payload }) => {
    return [...payload];
  },
  [fetchOwnDictionarysError]: () => [],
  [addOwnDictionarySuccess]: (_, { payload }) => {
    return [...payload];
  },
  [deleteOwnDictionarySuccess]: (_, { payload }) => {
    return [...payload];
  },
});

const currentDictionary = createReducer(
  {},
  {
    [fetchOwnDictionarySuccess]: (_, { payload }) => payload,
    [fetchOwnDictionaryError]: () => {},
  },
);

const loading = createReducer(false, {
  [fetchOwnDictionarysRequest]: () => true,
  [fetchOwnDictionarysSuccess]: () => false,
  [fetchOwnDictionarysError]: () => false,
  [addOwnDictionaryRequest]: () => true,
  [addOwnDictionarySuccess]: () => false,
  [addOwnDictionaryError]: () => false,
  [fetchOwnDictionaryRequest]: () => true,
  [fetchOwnDictionarySuccess]: () => false,
  [fetchOwnDictionaryError]: () => false,
  [deleteOwnDictionaryRequest]: () => true,
  [deleteOwnDictionarySuccess]: () => false,
  [deleteOwnDictionaryError]: () => false,
});

const error = createReducer(null, {
  [fetchOwnDictionarysError]: (_, { payload }) => payload,
  [fetchOwnDictionarysRequest]: () => null,
  [addOwnDictionaryError]: (_, { payload }) => payload,
  [addOwnDictionaryRequest]: () => null,
  [fetchOwnDictionaryError]: (_, { payload }) => payload,
  [fetchOwnDictionaryRequest]: () => null,
  [deleteOwnDictionaryError]: (_, { payload }) => payload,
  [deleteOwnDictionaryRequest]: () => null,
});

export default combineReducers({
  ownDictionarys,
  currentDictionary,
  loading,
  error,
});
