import {
  fetchTranscriptionTasksSuccess,
  fetchTranscriptionTasksRequest,
  fetchTranscriptionTasksError,
  changeFilter,
} from './transcription-tasks-actions';
import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

const tasks = createReducer([], {
  [fetchTranscriptionTasksSuccess]: (_, { payload }) => payload,
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

const filter = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});

export default combineReducers({
  tasks,
  loading,
  error,
  filter,
});
