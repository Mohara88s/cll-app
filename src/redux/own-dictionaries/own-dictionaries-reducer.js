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
  fetchOwnDictionaryRequest,
  fetchOwnDictionarySuccess,
  fetchOwnDictionaryError,
  updateOwnDictionaryRequest,
  updateOwnDictionarySuccess,
  updateOwnDictionaryError,
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
  [updateOwnDictionarySuccess]: (state, { payload }) => {
    return [...state.filter(({ _id }) => _id !== payload._id), payload];
  },
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
const updateDictionaryLoading = createReducer(false, {
  [updateOwnDictionaryRequest]: () => true,
  [updateOwnDictionarySuccess]: () => false,
  [updateOwnDictionaryError]: () => false,
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

const updateDictionaryError = createReducer(null, {
  [updateOwnDictionaryError]: (_, { payload }) => payload,
  [updateOwnDictionaryRequest]: () => null,
});
const addDictionarySuccess = createReducer(false, {
  [addOwnDictionaryRequest]: () => false,
  [addOwnDictionarySuccess]: () => true,
  [addOwnDictionaryError]: () => false,
});

const ownDictionary = createReducer(
  {},
  {
    [fetchOwnDictionarySuccess]: (_, { payload }) => payload,
    [fetchOwnDictionaryRequest]: () => {},
    [fetchOwnDictionariesError]: () => {},
  },
);

const ownDictionaryLoading = createReducer(false, {
  [fetchOwnDictionaryRequest]: () => true,
  [fetchOwnDictionarySuccess]: () => false,
  [fetchOwnDictionaryError]: () => false,
});
const ownDictionaryError = createReducer(null, {
  [fetchOwnDictionaryError]: (_, { payload }) => payload,
  [fetchOwnDictionaryRequest]: () => null,
});

export default combineReducers({
  ownDictionaries,
  currentDictionary,
  loading,
  error,
  addDictionaryLoading,
  addDictionaryError,
  addDictionarySuccess,
  updateDictionaryLoading,
  updateDictionaryError,
  ownDictionary,
  ownDictionaryLoading,
  ownDictionaryError,
});
