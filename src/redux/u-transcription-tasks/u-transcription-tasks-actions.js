import { createAction } from '@reduxjs/toolkit';

export const changeFilter = createAction('u-transcription-tasks/changeFilter');

export const fetchUTranscriptionTasksRequest = createAction(
  'u-transcription-tasks/fetchUTranscriptionTasksRequest',
);
export const fetchUTranscriptionTasksSuccess = createAction(
  'u-transcription-tasks/fetchUTranscriptionTasksSuccess',
);
export const fetchUTranscriptionTasksError = createAction(
  'u-transcription-tasks/fetchUTranscriptionTasksError',
);
