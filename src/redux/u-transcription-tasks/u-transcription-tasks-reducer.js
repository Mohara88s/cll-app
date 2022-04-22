import {
  fetchUTranscriptionTasksSuccess,
  fetchUTranscriptionTasksRequest,
  fetchUTranscriptionTasksError,
  changeFilter,
} from './u-transcription-tasks-actions';
import { addToOwnUDictionarySuccess } from '../user/user-actions';
import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

const tasks = createReducer([], {
  [fetchUTranscriptionTasksSuccess]: (_, { payload }) => payload,
  [fetchUTranscriptionTasksError]: () => [],
  [addToOwnUDictionarySuccess]: () => [],
});

const loading = createReducer(false, {
  [fetchUTranscriptionTasksRequest]: () => true,
  [fetchUTranscriptionTasksSuccess]: () => false,
  [fetchUTranscriptionTasksError]: () => false,
});

const error = createReducer(null, {
  [fetchUTranscriptionTasksError]: (_, { payload }) => payload,
  [fetchUTranscriptionTasksRequest]: () => null,
});

const filter = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
  [addToOwnUDictionarySuccess]: (_, { payload }) => '',
});

export default combineReducers({
  tasks,
  loading,
  error,
  filter,
});
