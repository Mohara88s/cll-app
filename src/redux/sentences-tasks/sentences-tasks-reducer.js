import {
  fetchSentencesTasksSuccess,
  fetchSentencesTasksRequest,
  fetchSentencesTasksError,
  fetchSentencesTasksByJokeTaskIdRequest,
  fetchSentencesTasksByJokeTaskIdSuccess,
  fetchSentencesTasksByJokeTaskIdError,
} from './sentences-tasks-actions';
import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

const tasks = createReducer([], {
  [fetchSentencesTasksSuccess]: (_, { payload }) => payload,
  [fetchSentencesTasksError]: () => [],

  [fetchSentencesTasksByJokeTaskIdSuccess]: (_, { payload }) => payload,
  [fetchSentencesTasksByJokeTaskIdError]: () => [],
});

const loading = createReducer(false, {
  [fetchSentencesTasksRequest]: () => true,
  [fetchSentencesTasksSuccess]: () => false,
  [fetchSentencesTasksError]: () => false,

  [fetchSentencesTasksByJokeTaskIdRequest]: () => true,
  [fetchSentencesTasksByJokeTaskIdSuccess]: () => false,
  [fetchSentencesTasksByJokeTaskIdError]: () => false,
});

const error = createReducer(null, {
  [fetchSentencesTasksError]: (_, { payload }) => payload,
  [fetchSentencesTasksRequest]: () => null,

  [fetchSentencesTasksByJokeTaskIdError]: (_, { payload }) => payload,
  [fetchSentencesTasksByJokeTaskIdRequest]: () => null,
});

export default combineReducers({
  tasks,
  loading,
  error,
});
