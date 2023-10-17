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
  updateJokeTaskRequest,
  updateJokeTaskSuccess,
  updateJokeTaskError,
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
      { _id: 0, language: '', title: '', text: '' },
      { _id: 1, language: '', title: '', text: '' },
    ],
  },
  {
    [changeJokeTask]: (_, { payload }) => payload,
    [addJokeTaskSuccess]: () => {
      return {
        task_title: '',
        translations: [
          { _id: 0, language: '', title: '', text: '' },
          { _id: 1, language: '', title: '', text: '' },
        ],
      };
    },
    [deleteJokeTaskSuccess]: () => {
      return {
        task_title: '',
        translations: [
          { _id: 0, language: '', title: '', text: '' },
          { _id: 1, language: '', title: '', text: '' },
        ],
      };
    },
    [updateJokeTaskSuccess]: () => {
      return {
        task_title: '',
        translations: [
          { _id: 0, language: '', title: '', text: '' },
          { _id: 1, language: '', title: '', text: '' },
        ],
      };
    },
  },
);

const tasks = createReducer([], {
  [fetchJokeTasksSuccess]: (_, { payload }) => payload,
  [fetchJokeTasksError]: () => [],
  [addJokeTaskSuccess]: (state, { payload }) => {
    return [...state, payload.jokeTask];
  },
  [updateJokeTaskSuccess]: (state, { payload }) => {
    return [
      ...state.filter(({ _id }) => _id !== payload._id),
      payload.jokeTask,
    ];
  },
  [deleteJokeTaskSuccess]: (state, { payload }) => {
    console.log(payload);
    return [...state.filter(({ _id }) => _id !== payload._id)];
  },
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

  [updateJokeTaskRequest]: () => true,
  [updateJokeTaskSuccess]: () => false,
  [updateJokeTaskError]: () => false,
});

const error = createReducer(null, {
  [fetchJokeTasksError]: (_, { payload }) => payload,
  [fetchJokeTasksRequest]: () => null,

  [addJokeTaskError]: (_, { payload }) => payload,
  [addJokeTaskRequest]: () => null,

  [deleteJokeTaskError]: (_, { payload }) => payload,
  [deleteJokeTaskRequest]: () => null,

  [updateJokeTaskError]: (_, { payload }) => payload,
  [updateJokeTaskRequest]: () => null,
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
