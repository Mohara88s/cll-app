import {
  fetchTranscriptionTasksSuccess,
  fetchTranscriptionTasksRequest,
  fetchTranscriptionTasksError,
} from './transcription-tasks-actions';
import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

const items = createReducer([], {
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

export default combineReducers({
  items,
  loading,
  error,
});
