import {
  fetchTranscriptionTasksSuccess,
  fetchTranscriptionTasksRequest,
  fetchTranscriptionTasksError,
  addToTasksSet,
  updateTasksSet,
} from './transcription-tasks-actions';
import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

const tasks = createReducer([], {
  [fetchTranscriptionTasksSuccess]: (_, { payload }) => payload,
  [fetchTranscriptionTasksError]: () => [],
});

const loading = createReducer(false, {
  [fetchTranscriptionTasksRequest]: () => true,
  [fetchTranscriptionTasksSuccess]: () => false,
  [fetchTranscriptionTasksError]: () => false,
});

const error = createReducer(null, {
  [fetchTranscriptionTasksError]: (_, { payload }) => payload,
  [fetchTranscriptionTasksRequest]: () => null,
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
  tasks,
  loading,
  error,
  tasksSet,
});
