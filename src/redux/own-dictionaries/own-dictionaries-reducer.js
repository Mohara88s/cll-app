import {
  changeCurrentDictionary,
  fetchOwnDictionariesSuccess,
  fetchOwnDictionariesRequest,
  fetchOwnDictionariesError,
  addOwnDictionaryRequest,
  addOwnDictionarySuccess,
  addOwnDictionaryError,
  deleteOwnDictionarySuccess,
  deleteOwnDictionaryRequest,
  deleteOwnDictionaryError,
} from './own-dictionaries-actions';
import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

const ownDictionaries = createReducer([], {
  [fetchOwnDictionariesSuccess]: (_, { payload }) => {
    return [...payload];
  },
  [fetchOwnDictionariesError]: () => [],
  [addOwnDictionarySuccess]: (state, { payload }) => {
    return [...state, payload];
  },
  [deleteOwnDictionarySuccess]: (state, { payload }) =>
    state.filter(({ _id }) => _id !== payload._id),
});

const currentDictionary = createReducer(
  {},
  {
    [changeCurrentDictionary]: (_, { payload }) => payload,
  },
);

const loading = createReducer(false, {
  [fetchOwnDictionariesRequest]: () => true,
  [fetchOwnDictionariesSuccess]: () => false,
  [fetchOwnDictionariesError]: () => false,
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
  [fetchOwnDictionariesError]: (_, { payload }) => payload,
  [fetchOwnDictionariesRequest]: () => null,
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
  ownDictionaries,
  currentDictionary,
  loading,
  addDictionaryLoading,
  error,
  addDictionaryError,
  addDictionarySuccess,
});
