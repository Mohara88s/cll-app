import { createAction } from '@reduxjs/toolkit';

export const changeFilter = createAction('transcription-tasks/changeFilter');

export const fetchTranscriptionTasksRequest = createAction(
  'transcription-tasks/fetchTranscriptionTasksRequest',
);
export const fetchTranscriptionTasksSuccess = createAction(
  'transcription-tasks/fetchTranscriptionTasksSuccess',
);
export const fetchTranscriptionTasksError = createAction(
  'transcription-tasks/fetchTranscriptionTasksError',
);
