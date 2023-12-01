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

const randomTask = createReducer(null, {
  [fetchRandomTranscriptionTaskSuccess]: (_, { payload }) => payload,
  [fetchRandomTranscriptionTaskError]: () => null,
  [deleteRandomTask]: () => null,
});

const tasks = createReducer([], {
  [fetchTranscriptionTasksSuccess]: (_, { payload }) => payload,
  [fetchTranscriptionTasksError]: () => [],
});

const loading = createReducer(false, {
  [fetchTranscriptionTasksRequest]: () => true,
  [fetchTranscriptionTasksSuccess]: () => false,
  [fetchTranscriptionTasksError]: () => false,
  [fetchRandomTranscriptionTaskRequest]: () => true,
  [fetchRandomTranscriptionTaskSuccess]: () => false,
  [fetchRandomTranscriptionTaskError]: () => false,
});

const error = createReducer(null, {
  [fetchTranscriptionTasksError]: (_, { payload }) => payload,
  [fetchTranscriptionTasksRequest]: () => null,
  [fetchRandomTranscriptionTaskError]: (_, { payload }) => payload,
  [fetchRandomTranscriptionTaskRequest]: () => null,
});

const tasksSet = createReducer([], {
  [addToTasksSet]: (state, { payload }) => {
    return [...state, payload];
  },
  [updateTasksSet]: (_, { payload }) => {
    return [...payload];
  },
});

export default combineReducers({
  randomTask,
  tasks,
  loading,
  error,
  tasksSet,
});
