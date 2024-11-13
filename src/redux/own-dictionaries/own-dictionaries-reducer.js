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

const ownDictionaries = createReducer([], (builder) => {
  builder
  .addCase(fetchOwnDictionariesSuccess, (_, { payload }) => {
    return [...payload];
  })
  .addCase(fetchOwnDictionariesError, () => [])
  .addCase(addOwnDictionarySuccess, (state, { payload }) => {
    return [...state, payload];
  })
  .addCase(deleteOwnDictionarySuccess, (state, { payload }) =>
    state.filter(({ _id }) => _id !== payload._id))
  .addCase(updateOwnDictionarySuccess, (state, { payload }) => {
    return [...state.filter(({ _id }) => _id !== payload._id), payload];
  })
});

const currentDictionary = createReducer(
  {}, (builder) => {
    builder
    .addCase(changeCurrentDictionary, (_, { payload }) => payload)
  });

const loading = createReducer(false, (builder) => {
  builder
  .addCase(fetchOwnDictionariesRequest, () => true)
  .addCase(fetchOwnDictionariesSuccess, () => false)
  .addCase(fetchOwnDictionariesError, () => false)
  .addCase(deleteOwnDictionaryRequest, () => true)
  .addCase(deleteOwnDictionarySuccess, () => false)
  .addCase(deleteOwnDictionaryError, () => false)
});

const addDictionaryLoading = createReducer(false, (builder) => {
  builder
  .addCase(addOwnDictionaryRequest, () => true)
  .addCase(addOwnDictionarySuccess, () => false)
  .addCase(addOwnDictionaryError, () => false)
});
const updateDictionaryLoading = createReducer(false, (builder) => {
  builder
  .addCase(updateOwnDictionaryRequest, () => true)
  .addCase(updateOwnDictionarySuccess, () => false)
  .addCase(updateOwnDictionaryError, () => false)
});

const error = createReducer(null, (builder) => {
  builder
  .addCase(fetchOwnDictionariesError, (_, { payload }) => payload)
  .addCase(fetchOwnDictionariesRequest, () => null)
  .addCase(deleteOwnDictionaryError, (_, { payload }) => payload)
  .addCase(deleteOwnDictionaryRequest, () => null)
});

const addDictionaryError = createReducer(null, (builder) => {
  builder
  .addCase(addOwnDictionaryError, (_, { payload }) => payload)
  .addCase(addOwnDictionaryRequest, () => null)
});

const updateDictionaryError = createReducer(null, (builder) => {
  builder
  .addCase(updateOwnDictionaryError, (_, { payload }) => payload)
  .addCase(updateOwnDictionaryRequest, () => null)
});
const addDictionarySuccess = createReducer(false, (builder) => {
  builder
  .addCase(addOwnDictionaryRequest, () => false)
  .addCase(addOwnDictionarySuccess, () => true)
  .addCase(addOwnDictionaryError, () => false)
});

const ownDictionary = createReducer(
  {}, (builder) => {
    builder
    .addCase(fetchOwnDictionarySuccess, (_, { payload }) => payload)
    .addCase(fetchOwnDictionaryRequest, () => {})
    .addCase(fetchOwnDictionariesError, () => {})
  },
);

const ownDictionaryLoading = createReducer(false, (builder) => {
  builder
  .addCase(fetchOwnDictionaryRequest, () => true)
  .addCase(fetchOwnDictionarySuccess, () => false)
  .addCase(fetchOwnDictionaryError, () => false)
});
const ownDictionaryError = createReducer(null, (builder) => {
  builder
  .addCase(fetchOwnDictionaryError, (_, { payload }) => payload)
  .addCase(fetchOwnDictionaryRequest, () => null)
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
