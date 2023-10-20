import {
  changeEnglishText,
  fetchTextTranscriptionSuccess,
  fetchTextTranscriptionRequest,
  fetchTextTranscriptionError,
} from './text-transcription-actions';
import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

const englishText = createReducer('', {
  [changeEnglishText]: (_, { payload }) => payload,
});

const transcriptedText = createReducer('', {
  [fetchTextTranscriptionSuccess]: (_, { payload }) => payload,
  [fetchTextTranscriptionRequest]: () => '',
});

const loading = createReducer(false, {
  [fetchTextTranscriptionRequest]: () => true,
  [fetchTextTranscriptionSuccess]: () => false,
  [fetchTextTranscriptionError]: () => false,
});

const error = createReducer(null, {
  [fetchTextTranscriptionError]: (_, { payload }) => payload,
  [fetchTextTranscriptionRequest]: () => null,
});

export default combineReducers({
  englishText,
  transcriptedText,
  loading,
  error,
});
