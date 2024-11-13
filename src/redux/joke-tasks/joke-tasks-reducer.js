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

const filter = createReducer('', (builder) => {
  builder
  .addCase(changeFilter, (_, { payload }) => payload)
});

const jokeTask = createReducer(
  {
    task_title: '',
    translations: [
      { _id: 0, language: '', title: '', text: '' },
      { _id: 1, language: '', title: '', text: '' },
    ],
  }, (builder) => {
    builder
    .addCase(changeJokeTask, (_, { payload }) => payload)
    .addCase(addJokeTaskSuccess, () => {
      return {
        task_title: '',
        translations: [
          { _id: 0, language: '', title: '', text: '' },
          { _id: 1, language: '', title: '', text: '' },
        ],
      };
    })
    .addCase(deleteJokeTaskSuccess, () => {
      return {
        task_title: '',
        translations: [
          { _id: 0, language: '', title: '', text: '' },
          { _id: 1, language: '', title: '', text: '' },
        ],
      };
    })
    .addCase(updateJokeTaskSuccess, () => {
      return {
        task_title: '',
        translations: [
          { _id: 0, language: '', title: '', text: '' },
          { _id: 1, language: '', title: '', text: '' },
        ],
      };
    })
  },
);

const tasks = createReducer([], (builder) => {
  builder
  .addCase(fetchJokeTasksSuccess, (_, { payload }) => payload)
  .addCase(fetchJokeTasksError, () => [])
  .addCase(addJokeTaskSuccess, (state, { payload }) => {
    return [...state, payload.jokeTask];
  })
  .addCase(updateJokeTaskSuccess, (state, { payload }) => {
    return [
      ...state.filter(({ _id }) => _id !== payload._id),
      payload.jokeTask,
    ];
  })
  .addCase(deleteJokeTaskSuccess, (state, { payload }) => {
    return [...state.filter(({ _id }) => _id !== payload._id)];
  })
});

const loading = createReducer(false, (builder) => {
  builder
  .addCase(fetchJokeTasksRequest, () => true)
  .addCase(fetchJokeTasksSuccess, () => false)
  .addCase(fetchJokeTasksError, () => false)

  .addCase(addJokeTaskRequest, () => true)
  .addCase(addJokeTaskSuccess, () => false)
  .addCase(addJokeTaskError, () => false)

  .addCase(deleteJokeTaskRequest, () => true)
  .addCase(deleteJokeTaskSuccess, () => false)
  .addCase(deleteJokeTaskError, () => false)

  .addCase(updateJokeTaskRequest, () => true)
  .addCase(updateJokeTaskSuccess, () => false)
  .addCase(updateJokeTaskError, () => false)
});

const error = createReducer(null, (builder) => {
  builder
  .addCase(fetchJokeTasksError, (_, { payload }) => payload)
  .addCase(fetchJokeTasksRequest, () => null)

  .addCase(addJokeTaskError, (_, { payload }) => payload)
  .addCase(addJokeTaskRequest, () => null)

  .addCase(deleteJokeTaskError, (_, { payload }) => payload)
  .addCase(deleteJokeTaskRequest, () => null)

  .addCase(updateJokeTaskError, (_, { payload }) => payload)
  .addCase(updateJokeTaskRequest, () => null)
});

const languages = createReducer([], (builder) => {
  builder
  .addCase(fetchJokeTasksLanguagesSuccess, (_, { payload }) => payload)
  .addCase(fetchJokeTasksLanguagesError, () => [])
});

const languagesLoading = createReducer(false, (builder) => {
  builder
  .addCase(fetchJokeTasksLanguagesRequest, () => true)
  .addCase(fetchJokeTasksLanguagesSuccess, () => false)
  .addCase(fetchJokeTasksLanguagesError, () => false)
});

const languagesError = createReducer(null, (builder) => {
  builder
  .addCase(fetchJokeTasksLanguagesError, (_, { payload }) => payload)
  .addCase(fetchJokeTasksLanguagesRequest, () => null)
});

const originalLanguage = createReducer(null, (builder) => {
  builder
  .addCase(setOriginalLanguage, (state, { payload }) => {
    return payload;
  })
});
const translationLanguage = createReducer(null, (builder) => {
  builder
  .addCase(setTranslationLanguage, (state, { payload }) => {
    return payload;
  })
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
