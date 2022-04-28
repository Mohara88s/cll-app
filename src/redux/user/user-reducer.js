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
});

const error = createReducer(null, {
  [fetchOwnDictionarysError]: (_, { payload }) => payload,
  [fetchOwnDictionarysRequest]: () => null,
  [addOwnDictionaryError]: (_, { payload }) => payload,
  [addOwnDictionaryRequest]: () => null,
  [fetchOwnDictionarysError]: (_, { payload }) => payload,
  [fetchOwnDictionaryRequest]: () => null,
});

export default combineReducers({
  ownDictionarys,
  currentDictionary,
  loading,
  error,
});
