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

const tasks = createReducer([], (builder) => {
  builder
  .addCase(fetchSentencesTasksSuccess, (_, { payload }) => payload)
  .addCase(fetchSentencesTasksError, () => [])

  .addCase(fetchSentencesTasksByJokeTaskIdSuccess, (_, { payload }) => payload)
  .addCase(fetchSentencesTasksByJokeTaskIdError, () => [])
});

const loading = createReducer(false, (builder) => {
  builder
  .addCase(fetchSentencesTasksRequest, () => true)
  .addCase(fetchSentencesTasksSuccess, () => false)
  .addCase(fetchSentencesTasksError, () => false)

  .addCase(fetchSentencesTasksByJokeTaskIdRequest, () => true)
  .addCase(fetchSentencesTasksByJokeTaskIdSuccess, () => false)
  .addCase(fetchSentencesTasksByJokeTaskIdError, () => false)
});

const error = createReducer(null, (builder) => {
  builder
  .addCase(fetchSentencesTasksError, (_, { payload }) => payload)
  .addCase(fetchSentencesTasksRequest, () => null)

  .addCase(fetchSentencesTasksByJokeTaskIdError, (_, { payload }) => payload)
  .addCase(fetchSentencesTasksByJokeTaskIdRequest, () => null)
});

export default combineReducers({
  tasks,
  loading,
  error,
});
