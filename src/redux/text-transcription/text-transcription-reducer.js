import {
  changeEnglishText,
  fetchTextTranscriptionSuccess,
  fetchTextTranscriptionRequest,
  fetchTextTranscriptionError,
} from './text-transcription-actions';
import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

const englishText = createReducer('', (builder) =>{
  builder
  .addCase(changeEnglishText, (_, { payload }) => payload)
});

const transcriptedText = createReducer('', (builder) =>{
  builder
  .addCase(fetchTextTranscriptionSuccess, (_, { payload }) => payload)
  .addCase(fetchTextTranscriptionRequest, () => '')
});

const loading = createReducer(false, (builder) =>{
  builder
  .addCase(fetchTextTranscriptionRequest, () => true)
  .addCase(fetchTextTranscriptionSuccess, () => false)
  .addCase(fetchTextTranscriptionError, () => false)
});

const error = createReducer(null, (builder) =>{
  builder
  .addCase(fetchTextTranscriptionError, (_, { payload }) => payload)
  .addCase(fetchTextTranscriptionRequest, () => null)
});

export default combineReducers({
  englishText,
  transcriptedText,
  loading,
  error,
});
