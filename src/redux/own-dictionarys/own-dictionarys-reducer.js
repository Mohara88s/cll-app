import {
  changeCurrentDictionary,
  fetchOwnDictionarysSuccess,
  fetchOwnDictionarysRequest,
  fetchOwnDictionarysError,
  addOwnDictionaryRequest,
  addOwnDictionarySuccess,
  addOwnDictionaryError,
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
    [changeCurrentDictionary]: (_, { payload }) => payload,
  },
);

const loading = createReducer(false, {
  [fetchOwnDictionarysRequest]: () => true,
  [fetchOwnDictionarysSuccess]: () => false,
  [fetchOwnDictionarysError]: () => false,
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
  [deleteOwnDictionaryError]: (_, { payload }) => payload,
  [deleteOwnDictionaryRequest]: () => null,
});

const addDictionaryError = createReducer(null, {
  [addOwnDictionaryError]: (_, { payload }) => payload,
  [addOwnDictionaryRequest]: () => null,
});

const addDictionarySuccess = createReducer(false, {
  [addOwnDictionaryRequest]: () => false,
  [addOwnDictionarySuccess]: () => true,
  [addOwnDictionaryError]: () => false,
});

export default combineReducers({
  ownDictionarys,
  currentDictionary,
  loading,
  addDictionaryLoading,
  error,
  addDictionaryError,
  addDictionarySuccess,
});
