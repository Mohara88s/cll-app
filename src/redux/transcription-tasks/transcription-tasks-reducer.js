import {
  deleteRandomTask,
  addToTasksSet,
  updateTasksSet,
  fetchTranscriptionTasksSuccess,
  fetchTranscriptionTasksRequest,
  fetchTranscriptionTasksError,
  fetchRandomTranscriptionTaskRequest,
  fetchRandomTranscriptionTaskSuccess,
  fetchRandomTranscriptionTaskError,
} from './transcription-tasks-actions';
import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

const randomTask = createReducer(null, (builder) => {
  builder
  .addCase(fetchRandomTranscriptionTaskSuccess, (_, { payload }) => payload)
  .addCase(fetchRandomTranscriptionTaskError, () => null)
  .addCase(deleteRandomTask, () => null)
});

const tasks = createReducer([], (builder) => {
  builder
  .addCase(fetchTranscriptionTasksSuccess, (_, { payload }) => payload)
  .addCase(fetchTranscriptionTasksError, () => [])
});

const loading = createReducer(false, (builder) => {
  builder
  .addCase(fetchTranscriptionTasksRequest, () => true)
  .addCase(fetchTranscriptionTasksSuccess, () => false)
  .addCase(fetchTranscriptionTasksError, () => false)
  .addCase(fetchRandomTranscriptionTaskRequest, () => true)
  .addCase(fetchRandomTranscriptionTaskSuccess, () => false)
  .addCase(fetchRandomTranscriptionTaskError, () => false)
});

const error = createReducer(null, (builder) => {
  builder
  .addCase(fetchTranscriptionTasksError, (_, { payload }) => payload)
  .addCase(fetchTranscriptionTasksRequest, () => null)
  .addCase(fetchRandomTranscriptionTaskError, (_, { payload }) => payload)
  .addCase(fetchRandomTranscriptionTaskRequest, () => null)
});

const tasksSet = createReducer([], (builder) => {
  builder
  .addCase(addToTasksSet, (state, { payload }) => {
    return [...state, payload];
  })
  .addCase(updateTasksSet, (_, { payload }) => {
    return [...payload];
  })
});

export default combineReducers({
  randomTask,
  tasks,
  loading,
  error,
  tasksSet,
});
