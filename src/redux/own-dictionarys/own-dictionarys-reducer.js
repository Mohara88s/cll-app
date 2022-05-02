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
} from './own-dictionarys-actions';
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
  [fetchOwnDictionaryRequest]: () => true,
  [fetchOwnDictionarySuccess]: () => false,
  [fetchOwnDictionaryError]: () => false,
  [deleteOwnDictionaryRequest]: () => true,
  [deleteOwnDictionarySuccess]: () => false,
  [deleteOwnDictionaryError]: () => false,
});

const addDictionaryLoading = createReducer(false, {
  [addOwnDictionaryRequest]: () => true,
  [addOwnDictionarySuccess]: () => false,
  [addOwnDictionaryError]: () => false,
});

const error = createReducer(null, {
  [fetchOwnDictionarysError]: (_, { payload }) => payload,
  [fetchOwnDictionarysRequest]: () => null,
  [fetchOwnDictionaryError]: (_, { payload }) => payload,
  [fetchOwnDictionaryRequest]: () => null,
  [deleteOwnDictionaryError]: (_, { payload }) => payload,
  [deleteOwnDictionaryRequest]: () => null,
});

const addDictionaryError = createReducer(null, {
  [addOwnDictionaryError]: (_, { payload }) => payload,
  [addOwnDictionaryRequest]: () => null,
});

export default combineReducers({
  ownDictionarys,
  currentDictionary,
  loading,
  addDictionaryLoading,
  error,
  addDictionaryError,
});
