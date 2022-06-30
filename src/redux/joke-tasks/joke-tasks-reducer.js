import {
  changeFilter,
  setOriginalLanguage,
  setTranslationLanguage,
  fetchJokeTasksSuccess,
  fetchJokeTasksRequest,
  fetchJokeTasksError,
  fetchJokeTasksLanguagesSuccess,
  fetchJokeTasksLanguagesRequest,
  fetchJokeTasksLanguagesError,
} from './joke-tasks-actions';
import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

const filter = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});

const tasks = createReducer([], {
  [fetchJokeTasksSuccess]: (_, { payload }) => payload,
  [fetchJokeTasksError]: () => [],
});

const loading = createReducer(false, {
  [fetchJokeTasksRequest]: () => true,
  [fetchJokeTasksSuccess]: () => false,
  [fetchJokeTasksError]: () => false,
});

const error = createReducer(null, {
  [fetchJokeTasksError]: (_, { payload }) => payload,
  [fetchJokeTasksRequest]: () => null,
});

const languages = createReducer([], {
  [fetchJokeTasksLanguagesSuccess]: (_, { payload }) => payload,
  [fetchJokeTasksLanguagesError]: () => [],
});

const languagesLoading = createReducer(false, {
  [fetchJokeTasksLanguagesRequest]: () => true,
  [fetchJokeTasksLanguagesSuccess]: () => false,
  [fetchJokeTasksLanguagesError]: () => false,
});

const languagesError = createReducer(null, {
  [fetchJokeTasksLanguagesError]: (_, { payload }) => payload,
  [fetchJokeTasksLanguagesRequest]: () => null,
});

const originalLanguage = createReducer(null, {
  [setOriginalLanguage]: (state, { payload }) => {
    return payload;
  },
});
const translationLanguage = createReducer(null, {
  [setTranslationLanguage]: (state, { payload }) => {
    return payload;
  },
});

export default combineReducers({
  filter,
  tasks,
  loading,
  error,
  languages,
  languagesLoading,
  languagesError,
  originalLanguage,
  translationLanguage,
});
