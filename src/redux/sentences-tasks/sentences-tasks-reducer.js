import {
  fetchSentencesTasksSuccess,
  fetchSentencesTasksRequest,
  fetchSentencesTasksError,
} from './sentences-tasks-actions';
import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

const tasks = createReducer([], {
  [fetchSentencesTasksSuccess]: (_, { payload }) => payload,
  [fetchSentencesTasksError]: () => [],
});

const loading = createReducer(false, {
  [fetchSentencesTasksRequest]: () => true,
  [fetchSentencesTasksSuccess]: () => false,
  [fetchSentencesTasksError]: () => false,
});

const error = createReducer(null, {
  [fetchSentencesTasksError]: (_, { payload }) => payload,
  [fetchSentencesTasksRequest]: () => null,
});

export default combineReducers({
  tasks,
  loading,
  error,
});
