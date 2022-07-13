import { createAction } from '@reduxjs/toolkit';

export const changeEnglishText = createAction(
  'text-transcription/changeEnglishText',
);

export const fetchTextTranscriptionRequest = createAction(
  'text-transcription/fetchTextTranscriptionRequest',
);
export const fetchTextTranscriptionSuccess = createAction(
  'text-transcription/fetchTextTranscriptionSuccess',
);
export const fetchTextTranscriptionError = createAction(
  'text-transcription/fetchTextTranscriptionError',
);
