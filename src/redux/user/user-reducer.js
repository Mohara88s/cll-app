import {
  fetchOwnUDictionarySuccess,
  fetchOwnUDictionaryRequest,
  fetchOwnUDictionaryError,
  addToOwnUDictionaryRequest,
  addToOwnUDictionarySuccess,
  addToOwnUDictionaryError,
} from './user-actions';
import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

const ownUDictionary = createReducer([], {
  [fetchOwnUDictionarySuccess]: (_, { payload }) => {
    return [...payload];
  },
  [fetchOwnUDictionaryError]: () => [],
  [addToOwnUDictionarySuccess]: (_, { payload }) => {
    return [...payload];
  },
});

const loading = createReducer(false, {
  [fetchOwnUDictionaryRequest]: () => true,
  [fetchOwnUDictionarySuccess]: () => false,
  [fetchOwnUDictionaryError]: () => false,
  [addToOwnUDictionaryRequest]: () => true,
  [addToOwnUDictionarySuccess]: () => false,
  [addToOwnUDictionaryError]: () => false,
});

const error = createReducer(null, {
  [fetchOwnUDictionaryError]: (_, { payload }) => payload,
  [fetchOwnUDictionaryRequest]: () => null,
  [addToOwnUDictionaryError]: (_, { payload }) => payload,
  [addToOwnUDictionaryRequest]: () => null,
});

export default combineReducers({
  ownUDictionary,
  loading,
  error,
});
