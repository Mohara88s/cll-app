import {
  changeFilter,
  changeJokeTask,
  setOriginalLanguage,
  setTranslationLanguage,
  fetchJokeTasksSuccess,
  fetchJokeTasksRequest,
  fetchJokeTasksError,
  fetchJokeTasksLanguagesSuccess,
  fetchJokeTasksLanguagesRequest,
  fetchJokeTasksLanguagesError,
  addJokeTaskRequest,
  addJokeTaskSuccess,
  addJokeTaskError,
  deleteJokeTaskRequest,
  deleteJokeTaskSuccess,
  deleteJokeTaskError,
} from './joke-tasks-actions';
import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

const filter = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});

const jokeTask = createReducer(
  {
    task_title: '',
    translations: [
      { id: 0, language: '', title: '', text: '' },
      { id: 1, language: '', title: '', text: '' },
    ],
  },
  {
    [changeJokeTask]: (_, { payload }) => payload,
    [addJokeTaskSuccess]: () => {
      return {
        task_title: '',
        translations: [
          { id: 0, language: '', title: '', text: '' },
          { id: 1, language: '', title: '', text: '' },
        ],
      };
    },
  },
);

const tasks = createReducer([], {
  [fetchJokeTasksSuccess]: (_, { payload }) => payload,
  [fetchJokeTasksError]: () => [],

  // [addJokeTaskSuccess]: (state, { payload }) => {
  //   return [...state, payload];
  // },

  // [deleteJokeTaskSuccess]: (state, { payload }) =>
  //   state.filter(({ id }) => id !== payload),
});

const loading = createReducer(false, {
  [fetchJokeTasksRequest]: () => true,
  [fetchJokeTasksSuccess]: () => false,
  [fetchJokeTasksError]: () => false,

  [addJokeTaskRequest]: () => true,
  [addJokeTaskSuccess]: () => false,
  [addJokeTaskError]: () => false,

  [deleteJokeTaskRequest]: () => true,
  [deleteJokeTaskSuccess]: () => false,
  [deleteJokeTaskError]: () => false,
});

const error = createReducer(null, {
  [fetchJokeTasksError]: (_, { payload }) => payload,
  [fetchJokeTasksRequest]: () => null,

  [addJokeTaskError]: (_, { payload }) => payload,
  [deleteJokeTaskError]: (_, { payload }) => payload,

  [addJokeTaskRequest]: () => null,
  [deleteJokeTaskRequest]: () => null,
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
  jokeTask,
  tasks,
  loading,
  error,
  languages,
  languagesLoading,
  languagesError,
  originalLanguage,
  translationLanguage,
});
